document.addEventListener('DOMContentLoaded', function () {
    const orderDetailsSection = document.querySelector('.product-order');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    // Display cart items in checkout
    cart.forEach(item => {
      const orderItem = document.createElement('div');
      orderItem.className = 'product-order-item';
      orderItem.innerHTML = `
        <span>
          <p>${item.title} x 1</p>
          <p>$${item.price}</p>
        </span>
      `;
      orderDetailsSection.appendChild(orderItem);
      total += item.price;
    });

    // Display totals
    document.querySelector('.product-total').innerHTML = `
      <span>
        <p>Subtotal</p>
        <p>$${total}</p>
      </span>
      <span>
        <p>Shipping</p>
        <p>Free</p>
      </span>
      <span>
        <p>Total</p>
        <p>$${total}</p>
      </span>
    `;

    // Handle order form submission
    document.querySelector('.order-btn').addEventListener('click', function () {
      const form = document.querySelector('form');
      if (form.checkValidity()) {
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        window.location.href = '../index.html';
      } else {
        alert('Please fill out all fields correctly.');
      }
    });
});
