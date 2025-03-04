let cart = [];

function fetchProducts() {
    fetch('/api/products')
        .then(res => res.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            products.forEach(product => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                    <button onclick="addToCart('${product.id}', '${product.name}')">Add to Cart</button>
                `;
                productList.appendChild(div);
            });
        });
}

function addToCart(id, name) {
    cart.push({ id, name });
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = cart.map(item => `<li>${item.name}</li>`).join('');
}

function checkout() {
    fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart })
    }).then(() => {
        alert('Order placed!');
        cart = [];
        updateCartDisplay();
    });
}

fetchProducts();