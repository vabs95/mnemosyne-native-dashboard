import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchJSON } from '@hermes/sdk';
import { ContextBankTab } from './ContextBankTab';
import { profileResponse } from '@/test/fixtures';

describe('ContextBankTab', () => {
  beforeEach(() => {
    (fetchJSON as any).mockResolvedValue(profileResponse());
  });

  it('renders sections, titles, items, count, weights and badges', async () => {
    render(<ContextBankTab onApplyFilters={vi.fn()} />);

    expect(await screen.findByText('Context Bank')).toBeInTheDocument();
    expect(screen.getByText(/user preferences/i)).toBeInTheDocument();
    expect(screen.getByText('Prefers dark mode')).toBeInTheDocument();
    expect(screen.getByText('Code style: Tabs')).toBeInTheDocument();

    // Check count and w labels
    expect(screen.getByText('count:1')).toBeInTheDocument();
    expect(screen.getByText('w:0.95')).toBeInTheDocument();
  });

  it('navigates to memories tab when source is clicked', async () => {
    const onApplyFilters = vi.fn();
    render(<ContextBankTab onApplyFilters={onApplyFilters} />);

    // Wait for data load
    expect(await screen.findByText('Context Bank')).toBeInTheDocument();

    // Click source sess_1234567890
    const sessionSource = screen.getByRole('button', { name: 'sess_1234567890' });
    await userEvent.click(sessionSource);
    expect(onApplyFilters).toHaveBeenCalledWith({ session_id: 'sess_1234567890' });

    // Click source chat
    const chatSource = screen.getByRole('button', { name: 'chat' });
    await userEvent.click(chatSource);
    expect(onApplyFilters).toHaveBeenCalledWith({ source: 'chat' });
  });
});
