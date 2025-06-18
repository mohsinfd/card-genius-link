export function trackEvent(name: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    try {
      fetch('/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, data })
      });
    } catch (_) {
      // ignore errors
    }
  }
}
