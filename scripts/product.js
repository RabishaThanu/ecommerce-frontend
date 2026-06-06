alert("product.js loaded");
const productDetail = document.getElementById("product-detail");

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Fetch selected product
fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {

        basePrice = product.price;
        productDetail.innerHTML = `
<div class="product-page">

    <div class="product-image">
        <img src="${product.image}" alt="${product.title}">
    </div>

    <div class="product-info">

    <h2>${product.title}</h2>

    <h3>
    Price: $<span id="price">${product.price}</span>
    </h3>

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

    <label>Quantity:</label>
    <button onclick="decreaseQty()">-</button>
    <span id="quantity">1</span>
    <button onclick="increaseQty()">+</button>

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

    const size = document.getElementById("size").value;
    const color = document.getElementById("color").value;

    const existingItem = cart.find(item =>
        item.id === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({
            id: productId,
            quantity: quantity,
            size: size,
            color: color
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Product Added To Cart!");
}

function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

let quantity = 1;

let basePrice = 0;

function increaseQty() {

    quantity++;

    document.getElementById("quantity").textContent = quantity;

    updatePrice();
}

function decreaseQty() {

    if (quantity > 1) {

        quantity--;

        document.getElementById("quantity").textContent = quantity;

        updatePrice();
    }
}

function updatePrice() {

    const totalPrice = (basePrice * quantity).toFixed(2);

    document.getElementById("price").textContent = totalPrice;
}