export function initThemeToggle(toggleBtn, icons) {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const iconData = {
        "icon-1": {
            name: "Theme Icon",
            srcLightMode: "assets/icons/light-mode-theme-icon.svg",
            srcDarkMode: "assets/icons/dark-mode-theme-icon.svg"
        },
        "icon-2": {
            name: "LinkedIn Icon",
            srcLightMode: "assets/icons/light-mode-linkedin-icon.svg",
            srcDarkMode: "assets/icons/dark-mode-linkedin-icon.svg"
        },
        "icon-3": {
            name: "Github Icon",
            srcLightMode: "assets/icons/light-mode-github-icon.svg",
            srcDarkMode: "assets/icons/dark-mode-github-icon.svg"
        }
    };

    if (savedTheme) {
        root.dataset.theme = savedTheme;
        icons.forEach(icon => {
            icon.src = savedTheme === 'dark' ? iconData[icon.dataset.key].srcDarkMode : iconData[icon.dataset.key].srcLightMode;
        });
    }

    toggleBtn.addEventListener('click', () => {
        const isDark = root.dataset.theme === 'dark';
        const newTheme = isDark ? 'light' : 'dark';

        root.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);
        icons.forEach(icon => {
            icon.src = newTheme === 'dark' ? iconData[icon.dataset.key].srcDarkMode : iconData[icon.dataset.key].srcLightMode;
        });
    });
}