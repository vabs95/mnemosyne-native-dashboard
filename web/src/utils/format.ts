export function safeNumber(value: unknown, digits = 2, fallback = 'n/a'): string {
  const num = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(num) ? num.toFixed(digits) : fallback;
}

export function formatDateTimeLabel(value: unknown, fallback = 'unknown'): string {
  if (!value) return fallback;
  const dt = new Date(String(value));
  return Number.isNaN(dt.getTime()) ? fallback : dt.toLocaleString();
}

export function formatDateLabel(value: unknown, fallback = 'unknown'): string {
  if (!value) return fallback;
  const dt = new Date(String(value));
  return Number.isNaN(dt.getTime()) ? fallback : dt.toLocaleDateString();
}

export function formatRelativeTime(value: unknown, fallback = 'unknown'): string {
  if (!value) return fallback;
  const dt = new Date(String(value));
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
  const s = String(value || '').trim();
  return s.length > head + tail + 1 ? `${s.slice(0, head)}…${s.slice(-tail)}` : s;
}

