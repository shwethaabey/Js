//order summary table .js
// Retrieve cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart table and total price
function updateCartTable() {
    const cartTableBody = document.querySelector("#cart-table tbody");
    cartTableBody.innerHTML = ''; // Clear existing rows

    let totalPrice = 0;

    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>Rs ${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartTableBody.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById("total-price").innerText = `Rs ${totalPrice.toFixed(2)}`;
}

// Load cart data and update table when the page loads
document.addEventListener("DOMContentLoaded", updateCartTable);

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
        window.location.href = './payment.html';
    }
}

// Adding event listener to the form's submit button
document.querySelector("#checkoutForm").addEventListener("submit", validateAndProceedToPayment);

// Load cart data from localStorage when the page loads
document.addEventListener("DOMContentLoaded", updateCartTable);