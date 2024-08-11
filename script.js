document.addEventListener('DOMContentLoaded', function () {
  const featureSection = document.querySelector('.feature-product');
  const categorySection = document.querySelector('.category-container');
  const cartIcon = document.getElementById('cart-icon');
  const cartCount = document.querySelector('.cart-count');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Update cart icon with item count
  cartCount.textContent = cart.length;

  // Fetch products
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
      // Display the first two products in the feature section
      const topProducts = products.slice(0, 2);
      topProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
          <div class="product-image-container">
            <img src="${product.image}" alt="${product.title}" />
          </div>
          <h1>${product.title}</h1>
          <p>Price: $${product.price}</p>
          <a href="./pages/product.html?id=${product.id}" class="btn">View Details</a>
        `;
        featureSection.appendChild(productElement);
      });

      // Display the next 10 products in the category section
      const categoryProducts = products.slice(2, ); // Skip first two products and get the next 10
      categoryProducts.forEach(product => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category-box';
        categoryElement.innerHTML = `
          <div class="category-1">
            <img src="${product.image}" alt="${product.title}" />
          </div>
          <div class="categories-details">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <a href="./pages/product.html?id=${product.id}" class="btn">View Details</a>
          </div>
        `;
        categorySection.appendChild(categoryElement);
      });
    })
    .catch(error => console.error('Error fetching products:', error));

  // Handle click on cart icon
  cartIcon.addEventListener('click', function () {
    window.location.href = './pages/cart.html'; // Redirect to the cart page
  });
});
