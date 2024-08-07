// Initialize cart and favorites arrays from localStorage or as empty arrays
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

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

// Function to save the current cart as favorites
function saveToFavorites() {
    if (cart.length === 0) {
        alert("Sorry, Your cart is empty!");
    } else {
        favorites = [...cart]; // Overwrite existing favorites
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert("Items saved to favorites!");
    }
}

// Function to apply favorites to the cart and table
function applyFavorites() {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));

    if (storedFavorites && storedFavorites.length > 0) {
        cart = storedFavorites;
        updateCartTable();
        localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
        alert("Your favourites have been added to the cart!");
    } else {
        alert("Sorry, your favourites list is empty!");
    }
}

// Function to proceed to payment page
function proceedToPayment() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Store the cart in localStorage
    sessionStorage.setItem('navigation', 'proceedToPayment');
    window.location.href = './payment.html'; // Redirect to the payment page
}

// Function to validate and proceed to payment
function validateAndProceedToPayment(event) {
    event.preventDefault(); // Prevent the form from submitting

    const formFields = document.querySelectorAll("#checkoutForm input[type='text'], #checkoutForm input[type='email'], #checkoutForm input[type='number']");
    let allFieldsFilled = true;

    // Check if all fields are filled
    formFields.forEach(field => {
        if (field.value.trim() === '') {
            allFieldsFilled = false;
            field.style.border = "2px solid black"; // Highlight the empty fields
        } else {
            field.style.border = ""; // Reset the border if filled
        }
    });

    // Show alert if fields are missing or cart is empty
    if (!allFieldsFilled) {
        alert("Please fill in all the fields before proceeding to checkout.");
    } else {
        // Calculate delivery date (2 days after current date)
        const currentDate = new Date();
        const deliveryDate = new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000);
        const formattedDeliveryDate = deliveryDate.toLocaleDateString();
        alert(`Thank you for the purchase! Your order will be delivered on ${formattedDeliveryDate}`); // Optional: For testing
        proceedToPayment(); // Proceed to payment after validation
    }
}

// Adding event listener to the form's submit button
document.querySelector("#checkoutForm").addEventListener("submit", validateAndProceedToPayment);

// Load cart data from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem('cartExists') !== 'true') {
        localStorage.removeItem('cart'); // Clear localStorage if not coming from payment page
        cart = [];
    } else {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
    }
    updateCartTable();
    sessionStorage.removeItem('navigation'); // Clear the session flag
    sessionStorage.removeItem('cartExists'); // Clear the cart exists flag
});
