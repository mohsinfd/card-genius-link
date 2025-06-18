export function trackEvent(name: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    try {
      if ((window as any).plausible) {
        (window as any).plausible(name, { props: data });
      }
    } catch (_) {
      // ignore analytics errors
    }
  }
}
