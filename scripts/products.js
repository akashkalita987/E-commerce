// products.js
const products = [
    { id: 1, name: "Wireless Headphones", price: 59.99, image: "assets/headphones.png", description: "High quality wireless headphones.", category: "Electronics" },
    { id: 2, name: "Smart Watch", price: 99.99, image: "assets/smartwatch.png", description: "Track your fitness and notifications.", category: "Electronics" },
    { id: 3, name: "Bluetooth Speaker", price: 39.99, image: "assets/speaker.png", description: "Portable speaker with deep bass.", category: "Electronics" },
    { id: 4, name: "Laptop Stand", price: 29.99, image: "assets/laptopstand.png", description: "Ergonomic aluminum laptop stand.", category: "Accessories" }
];

function groupByCategory(products) {
    return products.reduce((groups, product) => {
        if (!groups[product.category]) {
            groups[product.category] = [];
        }
        groups[product.category].push(product);
        return groups;
    }, {});
}

function renderProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    const grouped = groupByCategory(products);
    Object.keys(grouped).forEach(category => {
        const section = document.createElement('section');
        section.className = 'category-section';
        const heading = document.createElement('h3');
        heading.textContent = category;
        section.appendChild(heading);
        const container = document.createElement('div');
        container.className = 'category-products';
        grouped[category].forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>$${product.price.toFixed(2)}</p>
                <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
                <p style="font-size:0.9em;color:#666;">${product.description}</p>
            `;
            container.appendChild(card);
        });
        section.appendChild(container);
        list.appendChild(section);
    });
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
}

window.onload = renderProducts;
