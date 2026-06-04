alert("product.js loaded");
const productDetail = document.getElementById("product-detail");

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Fetch selected product
fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {

        productDetail.innerHTML = `
<div class="product-page">

    <div class="product-image">
        <img src="${product.image}" alt="${product.title}">
    </div>

    <div class="product-info">

    <h2>${product.title}</h2>

    <h3>$${product.price}</h3>

    <label>Size:</label>
    <select id="size">
        <option>Small</option>
        <option>Medium</option>
        <option>Large</option>
    </select>

    <br><br>

    <label>Color:</label>
    <select id="color">
        <option>Black</option>
        <option>Blue</option>
        <option>Red</option>
    </select>

    <br><br>

    <p>${product.description}</p>

    <button onclick="addToCart(${product.id})">
        Add to Cart
    </button>

</div>
</div>
`;
})
    .catch(error => {
        productDetail.innerHTML = "<p>❌ Failed to load product.</p>";
        console.error(error);
    });

// Add to cart
function addToCart(productId) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(productId);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Product Added To Cart!");
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}