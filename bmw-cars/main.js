document.addEventListener('DOMContentLoaded', () => { 
    const tabs = document.querySelectorAll('.tab-item');
    const modelsGrid = document.querySelector('.models-grid-section');

    const mockModelData = {
        'New Model': [
            { label: 'BMW X1', price: '₹ 6,850,000', img: 'images/imag2.jpg.jpeg' },
            { label: 'BMW X1', price: '₹ 6,850,000', img: 'images/imag3.jpg.jpeg' },
            { label: 'BMW X5', price: '₹ 7,500,000', img: 'images/BMWX5.jpg.jpeg' },
        ],
        'Roadster': [
            { label: 'BMW Z4 M40i', price: '₹ 8,990,000', img: 'images/BMWZ4.jpg.jpeg' },
            { label: 'BMW 8-Series', price: '₹ 15,000,000', img: 'images/BMW8.jpg.jpeg' },
        ],
        'Sedan': [
            { label: 'BMW I8 Spyder', price: '₹ 26,000,000', img: 'images/BMWI8.jpg.jpeg' },
            { label: 'BMW 5 Series', price: '₹ 7,190,000', img: 'images/BMW5SERIES.jpg.jpeg' },
        ],
        'Coupe': [
            { label: 'BMW 2 SERIES', price: '₹ 5,500,000', img: 'images/BMW2SERIES.jpg.jpeg' },
            { label: 'BMW M4 Coupe', price: '₹ 14,000,000', img: 'images/BMWM4.jpg.jpeg' },
        ]
    };

    const renderModelCards = (modelType) => {
        const data = mockModelData[modelType] || mockModelData['New Model'];

        const cardsHTML = data.map(car => `
            <div class="car-card">
                <img src="${car.img}" alt="${car.label}" class="model-image">
                <div class="card-footer">
                    <p class="model-label">${car.label}</p>
                    <p class="price-label">${car.price}</p>
                </div>
            </div>
        `).join('');

        modelsGrid.innerHTML = cardsHTML;
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');

            const modelType = e.currentTarget.textContent.replace(/SUV|Z4 M40i|I8 Spyder|2 SERIES/g, '').trim();

            renderModelCards(modelType);
        });
    });

   
    renderModelCards('New Model'); 
});
