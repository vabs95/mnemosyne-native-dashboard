import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchJSON } from '@hermes/sdk';
import { MemoriesTab } from './MemoriesTab';
import { memoriesResponse, stats } from '@/test/fixtures';

const renderMemories = (adminMode = false, initialFilters: any = {}) => {
  const Wrapper = () => {
    const [filters, setFilters] = useState({
      q: '',
      kind: 'all',
      status: 'active',
      sort: 'recent',
      source: '',
      scope: '',
      session_id: '',
      veracity: '',
      degradation_tier: '',
      trust_preset: '',
      ...initialFilters,
    });
    return (
      <MemoriesTab
        adminMode={adminMode}
        filters={filters}
        setFilters={setFilters}
        onInspectMemory={vi.fn()}
        onInspectSession={vi.fn()}
      />
    );
  };
  return render(<Wrapper />);
};

describe('MemoriesTab', () => {
  beforeEach(() => {
    (fetchJSON as any).mockImplementation((url: string) => {
      if (url.endsWith('/stats')) return Promise.resolve(stats());
      if (url.includes('/memories?')) return Promise.resolve(memoriesResponse());
      return Promise.resolve({});
    });
  });

  it('builds memory query parameters from filters and renders inspector values', async () => {
    renderMemories(false, {
      q: 'frontend',
      kind: 'working',
      trust_preset: 'due',
      source: 'chat',
      degradation_tier: '2',
    });

    expect(await screen.findByText('Memory Inspector')).toBeInTheDocument();
    expect(screen.getAllByText('Remember that frontend values must be correct.').length).toBeGreaterThan(0);
    expect(screen.getByText('Importance:')).toBeInTheDocument();
    expect(screen.getByText('0.82')).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchJSON).toHaveBeenCalledWith(expect.stringContaining('kind=working'));
      expect(fetchJSON).toHaveBeenCalledWith(expect.stringContaining('q=frontend'));
      expect(fetchJSON).toHaveBeenCalledWith(expect.stringContaining('due_for_degradation=1'));
      expect(fetchJSON).toHaveBeenCalledWith(expect.stringContaining('degradation_tier=2'));
    });
  });

  it('hides admin controls in read-only mode', async () => {
    renderMemories(false);
    await screen.findByText('Memory Inspector');
    expect(screen.queryByText('Admin Actions')).not.toBeInTheDocument();
    expect(screen.queryByText('Supersede (Replace)')).not.toBeInTheDocument();
  });

  it('shows admin controls and posts supersede actions when admin mode is enabled', async () => {
    renderMemories(true);

    await screen.findByText('Admin Actions');
    await userEvent.type(screen.getByPlaceholderText('Replacement text content...'), 'Corrected memory');
    await userEvent.click(screen.getByText('Supersede (Replace)'));

    await waitFor(() => {
      expect(fetchJSON).toHaveBeenCalledWith(
        '/api/plugins/mnemosyne-native-dashboard/admin/memory/supersede',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ memory_id: 'mem-001', content: 'Corrected memory', backup: true }),
        })
      );
    });
  });
});
