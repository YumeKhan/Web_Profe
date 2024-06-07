// script.js
function redirectToPage() {
    // Se script.js estiver no diretório frontend, o caminho para login.html será pages/login.html
    window.location.href = 'frontend/pages/login.html';
}

document.addEventListener("DOMContentLoaded", function() {
    const background = document.createElement('div');
    background.classList.add('background');
    document.body.appendChild(background);

    for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        div.style.left = `${Math.random() * 100}vw`;
        div.style.top = `${Math.random() * 100}vh`;
        div.style.width = `${Math.random() * 10 + 10}px`;
        div.style.height = `${Math.random() * 10 + 10}px`;
        div.style.animationDuration = `${Math.random() * 10 + 5}s`;
        background.appendChild(div);
    }
});