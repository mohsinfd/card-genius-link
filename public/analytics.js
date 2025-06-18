window.addEventListener('load', () => {
  window.fetch('/analytics/start', { method: 'POST' }).catch(() => {});
});
