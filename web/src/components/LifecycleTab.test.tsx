import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchJSON } from '@hermes/sdk';
import { LifecycleTab } from './LifecycleTab';
import { lifecycleResponse } from '@/test/fixtures';

describe('LifecycleTab', () => {
  beforeEach(() => {
    (fetchJSON as any).mockResolvedValue(lifecycleResponse());
  });

  it('renders lifecycle thresholds, weights, queues, and read-only notice', async () => {
    render(<LifecycleTab onInspectMemory={vi.fn()} onInspectSession={vi.fn()} onApplyFilters={vi.fn()} />);

    expect(await screen.findByText('Lifecycle')).toBeInTheDocument();
    expect(screen.getByText(/Tier 2 after/)).toBeInTheDocument();
    expect(screen.getByText(/hot/)).toBeInTheDocument();
    expect(screen.getByText('Read-only: no degradation is triggered from this page')).toBeInTheDocument();
    expect(screen.queryByText('Admin Actions')).not.toBeInTheDocument();

    await waitFor(() => expect(fetchJSON).not.toHaveBeenCalledWith(expect.stringContaining('/admin/'), expect.anything()));
  });

  it('applies lifecycle filters from cards and queue buttons', async () => {
    const onApplyFilters = vi.fn();
    render(<LifecycleTab onInspectMemory={vi.fn()} onInspectSession={vi.fn()} onApplyFilters={onApplyFilters} />);

    const warmLabels = await screen.findAllByText('Warm');
    await userEvent.click(warmLabels[0]);
    expect(onApplyFilters).toHaveBeenCalledWith({ degradation_tier: '2' });

    await userEvent.click(screen.getByText('Open lifecycle filter'));
    expect(onApplyFilters).toHaveBeenCalledWith({ degradation_tier: '2' });
  });
});
