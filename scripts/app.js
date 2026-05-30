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
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                <h3>${product.title}</h3>
                <p>₹${product.price}</p>
                <p>${product.description.substring(0, 80)}...</p>
                <button onclick="addToCart('${product.title}')">
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

function addToCart(productName) {
    alert(productName + " added to cart!");
}