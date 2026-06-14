import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchJSON } from '@hermes/sdk';
import { MemoriaTab } from './MemoriaTab';
import { memoriaStatsResponse, memoriaListResponse } from '@/test/fixtures';

describe('MemoriaTab', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (fetchJSON as any).mockImplementation((url: string) => {
      if (url.includes('/stats')) {
        return Promise.resolve(memoriaStatsResponse());
      }
      if (url.includes('/facts')) {
        return Promise.resolve(memoriaListResponse('facts'));
      }
      return Promise.resolve({ items: [] });
    });
  });

  it('renders Memoria tab with overview metrics and top sessions', async () => {
    render(<MemoriaTab onInspectSession={vi.fn()} />);

    expect(await screen.findByText('Memoria')).toBeInTheDocument();
    expect(screen.getByText('Structured fact extraction and retrieval (Memoria 3.x schema)')).toBeInTheDocument();

    expect(screen.getAllByText('Facts')[0]).toBeInTheDocument();
    expect(screen.getAllByText('17')[0]).toBeInTheDocument();

    expect(screen.getByText('sess_999')).toBeInTheDocument();
  });

  it('switches sub-tabs and loads detailed facts list with translated labels', async () => {
    render(<MemoriaTab onInspectSession={vi.fn()} />);

    const factsTab = await screen.findByRole('button', { name: 'Facts' });
    await userEvent.click(factsTab);

    await waitFor(() => {
      expect(fetchJSON).toHaveBeenCalledWith(expect.stringContaining('/memoria/facts?q=&limit=200'));
    });

    expect(screen.getByText('User Name')).toBeInTheDocument();
    expect(screen.getByText(': Seth')).toBeInTheDocument();
    expect(screen.getByText(/identity/i)).toBeInTheDocument();
    expect(screen.getByText(/imp:.*0\.95/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /session:sess_999/i })).toBeInTheDocument();
  });
});
