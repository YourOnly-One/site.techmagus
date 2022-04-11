var localTheme = localStorage.getItem('theme');
if (localTheme) {
    document.getElementById('root').className = 'theme__' + localTheme;
}
