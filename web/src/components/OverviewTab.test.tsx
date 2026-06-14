import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchJSON } from '@hermes/sdk';
import { OverviewTab } from './OverviewTab';
import { memoriesResponse, stats } from '@/test/fixtures';

describe('OverviewTab', () => {
  it('renders stats, breakdowns, and latest memories from API responses', async () => {
    (fetchJSON as any).mockImplementation((url: string) => {
      if (url.endsWith('/stats')) return Promise.resolve(stats());
      if (url.endsWith('/memories?limit=25')) return Promise.resolve(memoriesResponse());
      return Promise.resolve({});
    });

    render(
      <OverviewTab
        onInspectMemory={vi.fn()}
        onInspectSession={vi.fn()}
        onNavigateToTab={vi.fn()}
        onApplyFilters={vi.fn()}
      />
    );

    expect(await screen.findByText('Working Memory')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Remember that frontend values must be correct.')).toBeInTheDocument();
    expect(screen.getAllByText('inferred').length).toBeGreaterThan(0);
    expect(screen.getByText('imp:0.82')).toBeInTheDocument();
  });

  it('routes card and breakdown clicks to the expected filters or tabs', async () => {
    const onApplyFilters = vi.fn();
    const onNavigateToTab = vi.fn();
    (fetchJSON as any).mockImplementation((url: string) => {
      if (url.endsWith('/stats')) return Promise.resolve(stats());
      if (url.endsWith('/memories?limit=25')) return Promise.resolve(memoriesResponse());
      return Promise.resolve({});
    });

    render(
      <OverviewTab
        onInspectMemory={vi.fn()}
        onInspectSession={vi.fn()}
        onNavigateToTab={onNavigateToTab}
        onApplyFilters={onApplyFilters}
      />
    );

    await screen.findByText('Working Memory');
    await userEvent.click(screen.getByText('Working Memory'));
    expect(onApplyFilters).toHaveBeenCalledWith({ kind: 'working' });

    await userEvent.click(screen.getByText('Needs Review'));
    expect(onNavigateToTab).toHaveBeenCalledWith('review');

    await userEvent.click(screen.getByText('chat'));
    expect(onApplyFilters).toHaveBeenCalledWith({ source: 'chat' });
  });

  it('opens memory and session inspectors from live rows', async () => {
    const onInspectMemory = vi.fn();
    const onInspectSession = vi.fn();
    (fetchJSON as any).mockImplementation((url: string) => {
      if (url.endsWith('/stats')) return Promise.resolve(stats());
      if (url.endsWith('/memories?limit=25')) return Promise.resolve(memoriesResponse());
      return Promise.resolve({});
    });

    render(
      <OverviewTab
        onInspectMemory={onInspectMemory}
        onInspectSession={onInspectSession}
        onNavigateToTab={vi.fn()}
        onApplyFilters={vi.fn()}
      />
    );

    await userEvent.click(await screen.findByText('Remember that frontend values must be correct.'));
    expect(onInspectMemory).toHaveBeenCalledWith(expect.objectContaining({ id: 'mem-001' }));

    await userEvent.click(screen.getByText(/session:session-/));
    expect(onInspectSession).toHaveBeenCalledWith('session-1234567890');

    await waitFor(() => expect(fetchJSON).toHaveBeenCalledTimes(2));
  });
});
