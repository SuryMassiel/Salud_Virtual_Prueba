(function(){
    // Menú lateral (para páginas internas como home.html)
    const menuToggle = document.querySelector('#menuToggle');
    const menuLateral = document.querySelector('#menuLateral');
    const menuLinks = document.querySelectorAll('.menuLateral__side-menu li a');

    if (menuToggle && menuLateral) {
        menuToggle.addEventListener('click', () => {
            console.log('Menu toggled');
            menuLateral.classList.toggle('active');
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Link clicked:', link.href);
                menuLateral.classList.remove('active');
            });
        });
    }

    // Dropdown del perfil (para home.html)
    const profile = document.querySelector('.nav__profile');
    const dropdown = document.querySelector('.menuLateral__side-dropdown');
    if (profile && dropdown) {
        profile.addEventListener('click', (e) => {
            console.log('Profile dropdown toggled');
            dropdown.classList.toggle('active');
            e.stopPropagation();
        });

        document.addEventListener('click', (e) => {
            if (!profile.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    // Menú principal (para index.html)
    const openButton = document.querySelector('#nav-toggle');
    const menu = document.querySelector('.nav__link--menu');
    const closeMenu = document.querySelector('#nav-close');
    const navLinks = document.querySelectorAll('.nav__links');

    if (openButton && menu && closeMenu) {
        openButton.addEventListener('click', () => {
            console.log('Menu opened');
            menu.classList.add('active');
        });

        closeMenu.addEventListener('click', () => {
            console.log('Menu closed');
            menu.classList.remove('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Link clicked:', link.href);
                menu.classList.remove('active');
            });
        });
    }
})();


(function(){
    const openButton = document.querySelector('.nav__menu');
    const menu = document.querySelector('.nav__link');
    const closeMenu = document.querySelector('.nav__close');
    const menuLinks = document.querySelectorAll('.nav__links');

    openButton.addEventListener('click', ()=>{
        menu.classList.add('nav__link--show');
    });

    closeMenu.addEventListener('click', ()=>{
        menu.classList.remove('nav__link--show');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('nav__link--show');
        });
    });
})();