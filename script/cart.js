document.addEventListener('DOMContentLoaded', function () {
    const cartSection = document.querySelector('.cart-details');
    const checkoutButton = document.querySelector('.checkout-btn');
    const totalItems = document.querySelector('.total-items');



    // Load cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

     // Update total cart items
  totalItems.textContent = cart.length;

    // Function to render cart items
    function renderCart() {
        cartSection.innerHTML = ''; // Clear the existing items
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'added-to-cart';
            cartItem.innerHTML = `
                <div class="cart-info">
                    <img src="${item.image}" alt="${item.title}" />
                    <div class="cart-infos">
                        <h2>${item.title}</h2>
                        <p>${item.description}</p>
                        <div class="remove-btn-div">
                            <button class="remove-btn" data-index="${index}">Remove</button>
                        </div>
                    </div>
                </div>
                <p class="price">$${item.price}</p>
                <div class="qty-btn">
                    <h1 class="sub" data-index="${index}">-</h1>
                    <h1 class="qty" data-index="${index}">${item.quantity || 1}</h1>
                    <h1 class="add" data-index="${index}">+</h1>
                </div>
                <p class="price-total">$${item.price * (item.quantity || 1)}</p>
            `;
            cartSection.appendChild(cartItem);
        });

        // Update totals
        const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
        document.querySelector('.charges-box').innerHTML = `
            <div>
                <h1>Subtotal</h1>
                <p>$${subtotal}</p>
            </div>
            <div>
                <h1>VAT</h1>
                <p>$0</p>
            </div>
            <div>
                <h1>Grand Total</h1>
                <p>$${subtotal}</p>
            </div>
        `;
    }

    // Render the cart initially
    renderCart();

    // Event delegation for remove and quantity buttons
    cartSection.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-btn')) {
            const index = event.target.dataset.index;
            cart.splice(index, 1); // Remove item from cart
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        } else if (event.target.classList.contains('add') || event.target.classList.contains('sub')) {
            const index = event.target.dataset.index;
            if (event.target.classList.contains('add')) {
                if (!cart[index].quantity) cart[index].quantity = 1;
                cart[index].quantity++;
            } else if (event.target.classList.contains('sub')) {
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                }
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });

    // Proceed to checkout
    checkoutButton.addEventListener('click', function() {
        window.location.href = './checkout.html';
    });
});
