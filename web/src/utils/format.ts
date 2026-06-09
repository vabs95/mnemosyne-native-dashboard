export function safeNumber(value: unknown, digits = 2, fallback = 'n/a'): string {
  const num = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(num) ? num.toFixed(digits) : fallback;
}

export function formatDateTimeLabel(value: unknown, fallback = 'unknown'): string {
  if (value === null || value === undefined) return fallback;
  let dt: Date;
  if (value instanceof Date) {
    dt = value;
  } else if (typeof value === 'string' || typeof value === 'number') {
    dt = new Date(value);
  } else {
    dt = new Date(Number.NaN);
  }
  return Number.isNaN(dt.getTime()) ? fallback : dt.toLocaleString();
}

export function formatDateLabel(value: unknown, fallback = 'unknown'): string {
  if (value === null || value === undefined) return fallback;
  let dt: Date;
  if (value instanceof Date) {
    dt = value;
  } else if (typeof value === 'string' || typeof value === 'number') {
    dt = new Date(value);
  } else {
    dt = new Date(Number.NaN);
  }
  return Number.isNaN(dt.getTime()) ? fallback : dt.toLocaleDateString();
}

export function formatRelativeTime(value: unknown, fallback = 'unknown'): string {
  if (value === null || value === undefined) return fallback;
  let dt: Date;
  if (value instanceof Date) {
    dt = value;
  } else if (typeof value === 'string' || typeof value === 'number') {
    dt = new Date(value);
  } else {
    dt = new Date(Number.NaN);
  }
  if (Number.isNaN(dt.getTime())) return fallback;
  const diffMs = Date.now() - dt.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export function shortId(value: unknown, head = 8, tail = 6): string {
  const s = (typeof value === 'string' || typeof value === 'number') ? String(value).trim() : '';
  return s.length > head + tail + 1 ? `${s.slice(0, head)}…${s.slice(-tail)}` : s;
}
