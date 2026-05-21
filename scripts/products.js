// products.js
const products = [
    { id: 1, name: "Wireless Headphones", price: 59.99, image: "assets/headphones.png", description: "High quality wireless headphones." },
    { id: 2, name: "Smart Watch", price: 99.99, image: "assets/smartwatch.png", description: "Track your fitness and notifications." },
    { id: 3, name: "Bluetooth Speaker", price: 39.99, image: "assets/speaker.png", description: "Portable speaker with deep bass." },
    { id: 4, name: "Laptop Stand", price: 29.99, image: "assets/laptopstand.png", description: "Ergonomic aluminum laptop stand." }
];

function renderProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
            <p style="font-size:0.9em;color:#666;">${product.description}</p>
        `;
        list.appendChild(card);
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
