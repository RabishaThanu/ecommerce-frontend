const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


const productGrid = document.getElementById("product-grid");

fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(products => {

        products.forEach(product => {

            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <h3>${product.title}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart('${product.title}')">Add to Cart</button>
            `;

            productGrid.appendChild(card);
        });

    })
    .catch(error => console.log(error));

    function addToCart(productName) {
    alert(productName + " added to cart!");
}