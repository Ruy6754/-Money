document.addEventListener('DOMContentLoaded', function() {
    const coinMenu = document.querySelector('.coin_menu');
    let isDown = false;
    let startX;
    let scrollLeft;

    // Жёстко фиксируем вертикальное положение
    coinMenu.style.overflowY = 'hidden';
    coinMenu.style.touchAction = 'pan-x'; // Разрешаем только горизонтальные касания

    // Мышь
    coinMenu.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - coinMenu.offsetLeft;
        scrollLeft = coinMenu.scrollLeft;
        coinMenu.style.cursor = 'grabbing';
        document.body.style.overflowY = 'hidden'; // Блокируем скролл страницы
    });

    document.addEventListener('mouseup', () => {
        isDown = false;
        coinMenu.style.cursor = 'grab';
        document.body.style.overflowY = '';
    });

    document.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - coinMenu.offsetLeft;
        const walk = (x - startX) * 2;
        coinMenu.scrollLeft = scrollLeft - walk;
    });

    // Сенсорные устройства
    coinMenu.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - coinMenu.offsetLeft;
        scrollLeft = coinMenu.scrollLeft;
    }, { passive: false });

    coinMenu.addEventListener('touchend', () => {
        isDown = false;
    });

    coinMenu.addEventListener('touchmove', (e) => {
        if(!isDown) return;
        e.preventDefault(); // Блокируем стандартное поведение
        const x = e.touches[0].pageX - coinMenu.offsetLeft;
        const walk = (x - startX) * 2;
        coinMenu.scrollLeft = scrollLeft - walk;
    }, { passive: false });

    // Инициализация
    coinMenu.style.cursor = 'grab';
});