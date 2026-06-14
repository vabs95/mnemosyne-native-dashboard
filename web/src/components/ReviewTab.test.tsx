import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchJSON } from '@hermes/sdk';
import { ReviewTab } from './ReviewTab';
import { reviewResponse } from '@/test/fixtures';

describe('ReviewTab', () => {
  beforeEach(() => {
    (fetchJSON as any).mockImplementation((url: string) => {
      if (url.includes('/review?')) return Promise.resolve(reviewResponse());
      return Promise.resolve({});
    });
  });

  it('renders review queues and keeps bulk controls hidden when read-only', async () => {
    render(<ReviewTab adminMode={false} onInspectMemory={vi.fn()} onInspectSession={vi.fn()} onApplyFilters={vi.fn()} />);

    expect((await screen.findAllByText('Contaminated')).length).toBeGreaterThan(0);
    expect(screen.getAllByText('Needs review').length).toBeGreaterThan(0);
    expect(screen.queryByText('Confirm Selected')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Select Listed')).not.toBeInTheDocument();
  });

  it('applies filter query values to the review request', async () => {
    render(<ReviewTab adminMode={false} onInspectMemory={vi.fn()} onInspectSession={vi.fn()} onApplyFilters={vi.fn()} />);

    await screen.findAllByText('Contaminated');
    await userEvent.type(screen.getByPlaceholderText('Search this queue...'), 'trust');
    await userEvent.click(screen.getByText('Apply Filters'));

    await waitFor(() => {
      expect(fetchJSON).toHaveBeenCalledWith(expect.stringContaining('q=trust'));
    });
  });

  it('enables admin bulk actions and posts selected ids', async () => {
    render(<ReviewTab adminMode onInspectMemory={vi.fn()} onInspectSession={vi.fn()} onApplyFilters={vi.fn()} />);

    await screen.findByText('Confirm Selected');
    await userEvent.click(screen.getByLabelText('Select Listed'));
    await userEvent.click(screen.getByText('Confirm Selected'));

    await waitFor(() => {
      expect(fetchJSON).toHaveBeenCalledWith(
        '/api/plugins/mnemosyne-native-dashboard/admin/memory/veracity',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ memory_id: 'mem-review', veracity: 'stated', backup: true }),
        })
      );
    });
  });

  it('opens the memory browser with the active queue filter', async () => {
    const onApplyFilters = vi.fn();
    render(<ReviewTab adminMode={false} onInspectMemory={vi.fn()} onInspectSession={vi.fn()} onApplyFilters={onApplyFilters} />);

    await userEvent.click(await screen.findByText(/Open Filtered Browser/i));
    expect(onApplyFilters).toHaveBeenCalledWith({ veracity: '', contaminated_only: '1' });
  });

  it('maps lifecycle review queues to domain filters, not display labels', async () => {
    const onApplyFilters = vi.fn();
    render(<ReviewTab adminMode={false} onInspectMemory={vi.fn()} onInspectSession={vi.fn()} onApplyFilters={onApplyFilters} />);

    await userEvent.selectOptions(await screen.findByDisplayValue('Contaminated (1)'), 'due_for_degradation');
    await userEvent.click(screen.getByText(/Open Filtered Browser/i));

    expect(onApplyFilters).toHaveBeenCalledWith({
      kind: 'episodic',
      due_for_degradation: '1',
      sort: 'oldest',
    });
  });

  it('maps high-importance contaminated review queue to the backend filter contract', async () => {
    const onApplyFilters = vi.fn();
    render(<ReviewTab adminMode={false} onInspectMemory={vi.fn()} onInspectSession={vi.fn()} onApplyFilters={onApplyFilters} />);

    await userEvent.selectOptions(await screen.findByDisplayValue('Contaminated (1)'), 'high_importance_contaminated');
    await userEvent.click(screen.getByText(/Open Filtered Browser/i));

    expect(onApplyFilters).toHaveBeenCalledWith({
      contaminated_only: '1',
      sort: 'importance',
    });
  });
});
