// checkout.js
document.getElementById('checkout-form').onsubmit = function(e) {
    e.preventDefault();
    localStorage.removeItem('cart');
    document.getElementById('checkout-form').classList.add('hidden');
    document.getElementById('order-success').classList.remove('hidden');
};
