import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchJSON } from '@hermes/sdk';
import { configResponse, lifecycleResponse, memoriesResponse, memory, reviewResponse, sessionResponse, stats } from '@/test/fixtures';

const mockApi = (admin = false) => {
  (fetchJSON as any).mockImplementation((url: string) => {
    if (url.endsWith('/config')) return Promise.resolve(configResponse(admin));
    if (url.endsWith('/stats')) return Promise.resolve(stats());
    if (url.includes('/memories?')) return Promise.resolve(memoriesResponse());
    if (url.includes('/review?')) return Promise.resolve(reviewResponse());
    if (url.includes('/lifecycle?')) return Promise.resolve(lifecycleResponse());
    if (url.includes('/memory?id=')) return Promise.resolve({ item: memory({ metadata: '{"origin":"test"}' }) });
    if (url.includes('/session?id=')) return Promise.resolve(sessionResponse());
    return Promise.resolve({});
  });
};

describe('MnemosyneDashboard shell', () => {
  it('registers the Hermes plugin when the host registry is present', async () => {
    const register = vi.fn();
    (window as any).__HERMES_PLUGINS__ = { register, registerSlot: vi.fn() };
    mockApi(false);

    await import('./index');

    expect(register).toHaveBeenCalledWith('mnemosyne-native-dashboard', expect.any(Function));
    delete (window as any).__HERMES_PLUGINS__;
  });

  it('renders config state and switches tabs', async () => {
    mockApi(true);
    const { default: MnemosyneDashboard } = await import('./index');
    render(<MnemosyneDashboard />);

    expect(await screen.findByText('Admin Active')).toBeInTheDocument();
    expect(screen.getByText('v0.2.0')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Review'));
    expect((await screen.findAllByText('Trust Review')).length).toBeGreaterThan(0);
  });

  it('opens memory and session detail modals with fetched values', async () => {
    mockApi(false);
    const { default: MnemosyneDashboard } = await import('./index');
    render(<MnemosyneDashboard />);

    await userEvent.click(await screen.findByText('Remember that frontend values must be correct.'));
    expect(await screen.findByText('Memory Record')).toBeInTheDocument();
    expect(await screen.findByText(/Effective Weight:/)).toBeInTheDocument();
    expect(screen.getByText(/0.31/)).toBeInTheDocument();

    await userEvent.click(screen.getByText('Close'));
    await userEvent.click(screen.getByText(/session:session-/));
    expect(await screen.findByText('Session Details')).toBeInTheDocument();
    expect(await screen.findByText('Memory created')).toBeInTheDocument();
  });

  it('keeps mutation controls unavailable when config is read-only', async () => {
    mockApi(false);
    const { default: MnemosyneDashboard } = await import('./index');
    render(<MnemosyneDashboard />);

    expect(await screen.findByText('Read-Only')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Memories'));
    await screen.findByText('Memory Inspector');
    expect(screen.queryByText('Admin Actions')).not.toBeInTheDocument();
  });

  it('does not render missing effective memory weight as a real zero', async () => {
    (fetchJSON as any).mockImplementation((url: string) => {
      if (url.endsWith('/config')) return Promise.resolve(configResponse(false));
      if (url.endsWith('/stats')) return Promise.resolve(stats());
      if (url.includes('/memories?')) return Promise.resolve(memoriesResponse());
      if (url.includes('/memory?id=')) {
        return Promise.resolve({
          item: memory({
            effective_memory_weight: undefined,
            degradation_weight: undefined,
            degradation_label: undefined,
            degradation_tier: undefined,
          }),
        });
      }
      return Promise.resolve({});
    });

    const { default: MnemosyneDashboard } = await import('./index');
    render(<MnemosyneDashboard />);

    await userEvent.click(await screen.findByText('Remember that frontend values must be correct.'));

    expect(await screen.findByText(/Effective Weight:/)).toHaveTextContent('n/a');
    expect(screen.queryByText(/Effective Weight: ×0.00/)).not.toBeInTheDocument();
  });

  it('carries overview breakdown filters into the Memories request', async () => {
    mockApi(false);
    const { default: MnemosyneDashboard } = await import('./index');
    render(<MnemosyneDashboard />);

    await userEvent.click(await screen.findByText('chat'));

    await waitFor(() => {
      expect(fetchJSON).toHaveBeenCalledWith(expect.stringContaining('/memories?'));
      expect(fetchJSON).toHaveBeenCalledWith(expect.stringContaining('source=chat'));
    });
    expect(await screen.findByText('Memory Inspector')).toBeInTheDocument();
  });
});
