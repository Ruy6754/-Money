document.addEventListener('DOMContentLoaded', () => {
    let coins = [];
    let isSorted = false;

    fetch('../XML/coins4.xml')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(xml => {
            const items = xml.querySelectorAll('coin');
            coins = Array.from(items).map(coin => ({
                id: coin.querySelector('id').textContent,
                title: coin.querySelector('title').textContent,
                image: coin.querySelector('image').textContent,
                price: coin.querySelector('price').textContent
            }));
            renderCoins(coins);
        });

    document.getElementById('sortButton').addEventListener('click', () => {
        isSorted = !isSorted;
        const sortedCoins = [...coins].sort((a, b) => 
            isSorted ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        );
        renderCoins(sortedCoins);
        document.getElementById('sortButton').textContent = 
            isSorted ? 'Сортировать по названию (Z-A)' : 'Сортировать по названию (A-Z)';
    });

    function renderCoins(data) {
        const container = document.getElementById('coinContainer4');
        container.innerHTML = data.map(coin => `
            <div class="coin-item" data-id="${coin.id}">
                <img src="${coin.image}" alt="${coin.title}">
                <figcaption>${coin.title}</figcaption>
                <p>Цена ${parseInt(coin.price).toLocaleString()} BYN</p>
            </div>
        `).join('');

        // Обработчик клика
        container.querySelectorAll('.coin-item').forEach(item => {
            item.addEventListener('click', () => {
                window.location.href = `money_info4.html?id=${item.dataset.id}`;
            });
        });
    }
});