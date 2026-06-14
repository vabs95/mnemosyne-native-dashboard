import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchJSON } from '@hermes/sdk';
import { GraphTab } from './GraphTab';
import { graphResponse, triplesResponse } from '@/test/fixtures';

describe('GraphTab', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (fetchJSON as any).mockImplementation((url: string) => {
      if (url.includes('/graph')) {
        return Promise.resolve(graphResponse());
      }
      if (url.includes('/triples')) {
        return Promise.resolve(triplesResponse());
      }
      return Promise.resolve({});
    });
  });

  it('renders Graph tab and loads initial graph nodes/edges', async () => {
    render(<GraphTab onInspectMemory={vi.fn()} onNavigateToTab={vi.fn()} />);

    expect(await screen.findByText('Relationship Graph')).toBeInTheDocument();
    expect(screen.getByText('Graph Inspector')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Filter graph/i)).toBeInTheDocument();

    expect(fetchJSON).toHaveBeenCalledWith(expect.stringContaining('/graph?q=&limit=300'));
  });

  it('switches to Facts Table panel and renders triples', async () => {
    render(<GraphTab onInspectMemory={vi.fn()} onNavigateToTab={vi.fn()} />);

    const factsTab = await screen.findByText('Facts Table');
    await userEvent.click(factsTab);

    await waitFor(() => {
      expect(fetchJSON).toHaveBeenCalledWith(expect.stringContaining('/triples?q=&limit=200'));
    });

    expect(screen.getByText('Operator')).toBeInTheDocument();
    expect(screen.getByText('interacts_with')).toBeInTheDocument();
    expect(screen.getByText('Hermes')).toBeInTheDocument();
  });
});
