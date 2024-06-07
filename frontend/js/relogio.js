function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('horas').textContent = hours;
    document.getElementById('minutos').textContent = minutes;
    document.getElementById('segundos').textContent = seconds;
}

setInterval(updateClock, 1000);
updateClock(); // Chamar a função imediatamente para não esperar o primeiro intervalo