//order page.js


// Cart and Favorites Arrays
let cart = [];
let favorites = [];

// Function to add items to the cart
function addToCart(itemName, itemId, itemPrice) {
    const quantityInput = document.getElementById(itemId);
    const quantity = parseFloat(quantityInput.value);

    if (quantity > 0) {
        const cartItem = cart.find(item => item.name === itemName);
        
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({ name: itemName, quantity, price: itemPrice, total: itemPrice * quantity });
        }

        updateCartTable();
        quantityInput.value = ''; 
    } else {
        alert("Please enter a valid quantity.");
    }
}

// Function to update cart table and total price
function updateCartTable() {
    const cartTableBody = document.querySelector("#cart-table tbody");
    cartTableBody.innerHTML = ''; 

    let totalPrice = 0;

    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartTableBody.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById("total-price").innerText = `${totalPrice.toFixed(2)}`;
}

// Function to save the current cart as favorites
function saveToFavorites() {
    favorites = [...cart]; // Overwrite existing favorites
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert("Items saved to favorites!");
}

// Function to apply favorites to the cart and table
function applyFavorites() {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    
    if (storedFavorites) {
        cart = storedFavorites;
        updateCartTable();
        alert("Your favourites at fresh-cart added to the cart!");
    } else {
        alert("Sorry, no favourites found!");
    }
}

// Function to proceed to payment
function proceedToPayment() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add items to the cart before proceeding to the payment.");
        return;
    }
    window.location.href = './payment.html';
}

// Adding event listener to the payment button
document.querySelector(".btn").addEventListener("click", proceedToPayment);

k