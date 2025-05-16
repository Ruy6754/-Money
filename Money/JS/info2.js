document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const coinId = urlParams.get('id');

    if (!coinId) {
        window.location.href = '../main.html';
        return;
    }

    fetch('../XML/coins2.xml')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(xml => {
            const coins = Array.from(xml.querySelectorAll('coin'));
            const coin = coins.find(item => 
                item.querySelector('id').textContent === coinId
            );

            if (!coin) throw new Error('Монета не найдена');

            // Установка изображений через CSS-переменные
            const coinImage = document.querySelector('.img_info');
            const frontImage = coin.querySelector('image').textContent;
            const backImage = coin.querySelector('back_image').textContent;

            coinImage.style.setProperty('--front-image', `url(${frontImage})`);
            coinImage.style.setProperty('--back-image', `url(${backImage})`);

            // Заполнение данных
            document.getElementById('coinTitle').textContent = coin.querySelector('title').textContent;
            document.getElementById('coinPrice').textContent = `${coin.querySelector('price').textContent} BYN`;
            document.getElementById('coinDescription').textContent = coin.querySelector('description').textContent;
        })
        .catch(() => {
            window.location.href = '../main.html';
        });
});