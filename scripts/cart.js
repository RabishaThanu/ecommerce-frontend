const cartItems = document.getElementById("cart-items");

let cart =
JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

if(cart.length === 0){

    cartItems.innerHTML =
    "<h2>Your Cart is Empty</h2>";

}else{

    cart.forEach(item => {

        fetch(`https://fakestoreapi.com/products/${item.id}`)
        .then(response => response.json())
        .then(product => {

          total += product.price * item.quantity;

            document.getElementById("total-price")
            .textContent = total.toFixed(2);

            const card = document.createElement("div");

            card.classList.add("cart-item");

            card.innerHTML = `

                <img src="${product.image}"
                     width="120">

                <h3>${product.title}</h3>

                <p>Price: $${product.price}</p>

                <p>Quantity: ${item.quantity}</p>

                <p>Size: ${item.size}</p>

                <p>Color: ${item.color}</p>

                <button onclick="removeItem(${item.id})">
                    Remove
                </button>

            `;

            cartItems.appendChild(card);

        });

    });

}

function removeItem(id){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    location.reload();
}

const checkoutBtn =
document.getElementById("checkout-btn");

if(cart.length === 0){

    checkoutBtn.disabled = true;

}