// cart.js
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name} (x${item.qty})</span>
            <span>$${(item.price * item.qty).toFixed(2)}</span>
            <button class="btn" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        container.appendChild(div);
    });
    const totalDiv = document.createElement('div');
    totalDiv.className = 'cart-item';
    totalDiv.innerHTML = `<strong>Total</strong><strong>$${total.toFixed(2)}</strong>`;
    container.appendChild(totalDiv);
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

window.onload = renderCart;
