// Elimina o comportamento padrão de arrastar
document.querySelectorAll("img").forEach(img => {
    img.addEventListener("dragstart", e => e.preventDefault());
});

// Fixa a cor do link ativo
const links = document.querySelectorAll('.link');

links.forEach(link => {
    link.addEventListener('click', () => {
        // remove active de todos
        links.forEach(i => i.classList.remove('active'));

        // adiciona active ao clicado
        link.classList.add('active');
    });
});

// Menu hamburguer simples
const toggle = document.querySelector('.nav-toggle');
const headerLinks = document.querySelector('.header-links');

function toggleMenu() {
    headerLinks.classList.toggle('open');
    toggle.classList.toggle('active');
}

toggle.addEventListener('click', toggleMenu);

document.querySelectorAll('.header-links a').forEach(link => {
  link.addEventListener('click', toggleMenu);
});

// Adiciona o listener para o evento de resize
function remove() {
    if (window.innerWidth > 768 && headerLinks.classList.contains('open')) {
        headerLinks.classList.remove('open');
        toggle.classList.remove('active');
    }
}
// Executa uma vez ao carregar a página
remove();

window.addEventListener("resize", remove);


// Alternar entre modo claro, escuro e constraste
const moonIcon = '<span title="Ir para tema escuro" class="link">&#9789;</span>';
const sunIcon = '<span title="Ir para tema claro" class="link">&#9728;</span>';
const contrastIcon = '<span title="Ir para tema de alto contraste" class="link">&#9680;</span>';
const themeToggle = document.getElementById('theme-toggle');
const imageAbout = document.getElementById('image-about');

// Verificar tema salvo no localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.innerHTML = contrastIcon;
    imageAbout.setAttribute('src', 'images/c-dark.jpg')
} else if (savedTheme === 'contrast') {
    document.body.classList.add('contrast');
    themeToggle.innerHTML = sunIcon;
    imageAbout.setAttribute('src', 'images/c-contrast.jpg')
} else {
    document.body.classList.add('light');
    themeToggle.innerHTML = moonIcon;
    imageAbout.setAttribute('src', 'images/c-light.jpg')
}

themeToggle.addEventListener('click', () => {
    const isLightMode = document.body.classList.contains('light');
    const isDarkMode = document.body.classList.contains('dark');
    if (isLightMode) {
        document.body.classList.toggle('light')
        document.body.classList.add('dark')
        themeToggle.innerHTML = contrastIcon;
        imageAbout.setAttribute('src', 'images/c-dark.jpg')
        localStorage.setItem('theme', 'dark');
    } else if (isDarkMode) {
        document.body.classList.remove('dark')
        document.body.classList.add('contrast')
        themeToggle.innerHTML = sunIcon;
        imageAbout.setAttribute('src', 'images/c-contrast.jpg')
        localStorage.setItem('theme', 'contrast')
    } else {
        document.body.classList.remove('contrast')
        document.body.classList.add('light')
        themeToggle.innerHTML = moonIcon;
        imageAbout.setAttribute('src', 'images/c-light.jpg')
        localStorage.setItem('theme', 'light')
    }
});
