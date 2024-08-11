document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
  
    // Fetch product details
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((product) => {
        const productImg = document.querySelector(".product-img");
        productImg.innerHTML = `
            <div class="product-img">
              <div class="img-box-big">
                <img src="${product.image}" alt="${product.title}" />
              </div>
  
              <div class="img-container">
                <div class="img-box">
                  <img src="${product.image}" alt="${product.title}" />
                </div>
  
                <div class="img-box">
                  <img src="${product.image}" alt="${product.title}" />
                </div>
              </div>
            </div>
          `;
  
        const detailsElement = document.querySelector(".product-details");
        detailsElement.innerHTML = `
            <h1 class="product-name">${product.title}</h1>
            <p class="product-price">$${product.price}</p>
            <p class="product-description">${product.description}</p>
            <div class="product-btn">
              <button class="btn" id="add-to-cart">Add to cart</button>
            </div>
          `;
  
        // Handle Add to Cart button click
        document
          .getElementById("add-to-cart")
          .addEventListener("click", function () {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
            // Check if product is already in the cart
            const isProductInCart = cart.some(item => item.id === product.id);
  
            if (isProductInCart) {
              alert("Product already in cart!");
              // Redirect after alert is dismissed
              setTimeout(() => {
                window.location.href = "../index.html"; // Redirect to the home page
              }, 100); // Delay for 100 milliseconds
            } else {
              cart.push(product);
              localStorage.setItem("cart", JSON.stringify(cart));
              alert("Product added to cart!");
              // Redirect after alert is dismissed
              setTimeout(() => {
                window.location.href = "../index.html"; // Redirect to the home page
              }, 100); // Delay for 100 milliseconds
            }
          });
      })
      .catch((error) => console.error("Error fetching product:", error));
  });
  