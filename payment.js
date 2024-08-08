// Initialize cart array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to the cart
function addToCart(itemName, itemId, itemPrice) {
    const quantityInput = document.getElementById(itemId);
    const quantity = parseFloat(quantityInput.value);

    if (quantity > 0) {
        const cartItem = cart.find(item => item.name === itemName);
        
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({ name: itemName, quantity, price: itemPrice });
        }

        updateCartTable();
        quantityInput.value = ''; 
        localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
        sessionStorage.setItem('cartExists', 'true'); // Indicate that cart exists
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
            <td>Rs. ${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartTableBody.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById("total-price").innerText = `Rs. ${totalPrice.toFixed(2)}`;
}

// Function to proceed to payment page
function proceedToPayment() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Store the cart in localStorage
    sessionStorage.setItem('proceedToPayment', 'true'); // Set session flag
    window.location.href = './payment.html'; // Redirect to the payment page
}

// Load cart data from localStorage when the page loads if the session flag is not set
document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem('cartExists') !== 'true') {
        localStorage.removeItem('cart'); // Clear localStorage if not coming from payment page
        cart = [];
    } else {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
    }
    updateCartTable();
    sessionStorage.removeItem('proceedToPayment'); // Clear the session flag
    sessionStorage.removeItem('cartExists'); // Clear the cart exists flag
});

// Example button to trigger proceed to payment
document.getElementById('proceedButton').addEventListener('click', proceedToPayment);
