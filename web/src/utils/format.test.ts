import { describe, expect, it, vi } from 'vitest';
import { formatDateLabel, formatDateTimeLabel, formatRelativeTime, safeNumber, shortId } from './format';

describe('format utilities', () => {
  it('formats finite numbers and falls back for invalid values', () => {
    expect(safeNumber(1.234, 2)).toBe('1.23');
    expect(safeNumber('2.5', 1)).toBe('2.5');
    expect(safeNumber(null, 2, 'none')).toBe('none');
    expect(safeNumber(undefined, 2, 'none')).toBe('none');
    expect(safeNumber('', 2, 'empty')).toBe('empty');
    expect(safeNumber('not numeric', 2, 'bad')).toBe('bad');
  });

  it('uses fallbacks for missing or invalid dates', () => {
    expect(formatDateTimeLabel(undefined, 'missing')).toBe('missing');
    expect(formatDateTimeLabel('not a date', 'invalid')).toBe('invalid');
    expect(formatDateLabel(null, 'none')).toBe('none');
  });

  it('formats relative time without throwing on bad input', () => {
    vi.setSystemTime(new Date('2026-06-01T11:00:00Z'));
    expect(formatRelativeTime('2026-06-01T10:30:00Z')).toBe('30m ago');
    expect(formatRelativeTime('bad', 'unknown')).toBe('unknown');
    vi.useRealTimers();
  });

  it('shortens long ids only when needed', () => {
    expect(shortId('short')).toBe('short');
    expect(shortId('session-1234567890', 7, 4)).toBe('session…7890');
  });
});
