const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

const productGrid = document.getElementById("product-grid");
const loading = document.getElementById("loading");

// Show loading message
loading.style.display = "block";

fetch("https://fakestoreapi.com/products")
    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        return response.json();
    })

    .then(products => {

        // Hide loading message
        loading.style.display = "none";

        products.forEach(product => {

            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
<a href="product.html?id=${product.id}">
    <img src="${product.image}" alt="${product.title}">
</a>

<h3>${product.title}</h3>
<p>$${product.price}</p>
<p>${product.description.substring(0,80)}...</p>

<button onclick="addToCart(${product.id})">
        Add to Cart
    </button>

`;

            productGrid.appendChild(card);
        });

    })

    .catch(error => {

        loading.innerHTML = "❌ Failed to load products.";

        console.error(error);
    });

function addToCart(productId) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(productId);

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

updateCartCount();