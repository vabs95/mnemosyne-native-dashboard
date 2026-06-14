import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchJSON } from '@hermes/sdk';
import { HistoryTab } from './HistoryTab';

const mockTimelineData = {
  groups: [
    {
      key: '2026-06-14',
      count: 1,
      events: [
        {
          id: 'event-001',
          type: 'created',
          timestamp: '2026-06-14T12:00:00Z',
          session_id: 'session-abc',
          title: 'Memory Created',
          preview: 'User prefers dark mode.',
          item: {
            id: 'mem-101',
            content: 'User prefers dark mode.',
            veracity: 'stated',
            created_at: '2026-06-14T12:00:00Z',
            importance: 0.9,
            source: 'chat'
          }
        }
      ]
    }
  ]
};

const mockConsolidationsData = {
  items: [
    {
      id: 'cons-001',
      session_id: 'session-abc',
      items_consolidated: 5,
      summary: 'Consolidated user settings and theme preference.',
      created_at: '2026-06-14T13:00:00Z'
    }
  ]
};

const mockSessionData = {
  session_id: 'session-abc',
  memories_count: 1,
  memories: [
    {
      id: 'mem-101',
      content: 'User prefers dark mode.',
      veracity: 'stated',
      importance: 0.9,
      created_at: '2026-06-14T12:00:00Z'
    }
  ]
};

describe('HistoryTab', () => {
  const onInspectMemory = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (fetchJSON as any).mockImplementation((url: string) => {
      if (url.includes('/timeline')) {
        return Promise.resolve(mockTimelineData);
      }
      if (url.includes('/consolidations')) {
        return Promise.resolve(mockConsolidationsData);
      }
      if (url.includes('/session')) {
        return Promise.resolve(mockSessionData);
      }
      return Promise.reject(new Error('Unknown url: ' + url));
    });
  });

  it('renders timeline and consolidation history', async () => {
    render(<HistoryTab onInspectMemory={onInspectMemory} />);

    expect(screen.getByText('Chronological Memory Timeline')).toBeInTheDocument();
    
    expect(await screen.findByText('User prefers dark mode.')).toBeInTheDocument();
    expect(screen.getByText('Consolidated user settings and theme preference.')).toBeInTheDocument();
    expect(screen.getByText('Stated')).toBeInTheDocument();
    expect(screen.getAllByText(/session-abc/i).length).toBe(2);
  });

  it('inspects memory on timeline click', async () => {
    render(<HistoryTab onInspectMemory={onInspectMemory} />);
    const eventRow = await screen.findByText('User prefers dark mode.');
    await userEvent.click(eventRow);
    expect(onInspectMemory).toHaveBeenCalledWith(mockTimelineData.groups[0].events[0].item);
  });

  it('opens consolidation JSON inspector, then views session details', async () => {
    render(<HistoryTab onInspectMemory={onInspectMemory} />);
    const consolidationRow = await screen.findByText('Consolidated user settings and theme preference.');
    await userEvent.click(consolidationRow);

    expect(screen.getByText('Consolidation Record')).toBeInTheDocument();
    expect(screen.getByText(/"cons-001"/)).toBeInTheDocument();

    const viewSessionBtn = screen.getByRole('button', { name: 'View Session' });
    await userEvent.click(viewSessionBtn);

    expect(screen.queryByText('Consolidation Record')).not.toBeInTheDocument();
    expect(await screen.findByText('Session Details')).toBeInTheDocument();
    expect(screen.getByText(/Session: session-abc/i)).toBeInTheDocument();
    expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();
  });
});
