export function initThemeToggle(toggleBtn) {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        root.dataset.theme = savedTheme;
        themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    toggleBtn.addEventListener('click', () => {
        const isDark = root.dataset.theme === 'dark';
        const newTheme = isDark ? 'light' : 'dark';

        root.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);
        toggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
}