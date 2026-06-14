import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { fetchJSON } from './hermesSdkMock';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  (fetchJSON as any).mockReset();
});

Object.defineProperty(window, 'confirm', {
  value: vi.fn(() => true),
  writable: true,
});

Object.defineProperty(window, 'alert', {
  value: vi.fn(),
  writable: true,
});
