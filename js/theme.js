const THEME_STORAGE_KEY = 'logomart-theme';

function initialiseTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  const themeToggleIcon = themeToggle?.querySelector('i');

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;

    if (themeToggle && themeToggleIcon) {
      const isDark = theme === 'dark';
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      themeToggleIcon.className = isDark ? 'bx bx-sun' : 'bx bx-moon';
    }
  }

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');

  applyTheme(theme);

  themeToggle?.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  });
}
