
// Retrieve cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];



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
    event.preventDefault(); // Doesnt sunmit the form

    const formFields = document.querySelectorAll("#checkoutForm input[type='text'], #checkoutForm input[type='email'], #checkoutForm input[type='number']");
    let allFieldsFilled = true;

    // Checking if all fields are filled
    formFields.forEach(field => {
        if (field.value.trim() === '') {
            allFieldsFilled = false;
            field.style.border = "2px solid black"; 
        } else {
            field.style.border = ""; 
        }
    });

    // Show error message if fields are missing
    if (!allFieldsFilled) {
        alert("Please fill in all the fields before proceeding to checkout.");
    } else if (window.cartIsEmpty) { // Check if cart is empty
        alert("Your cart is empty. Please add items to your cart.");
    } else {
        // Display thank you message and delivery date in 2 days
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + 2);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = deliveryDate.toLocaleDateString(undefined, options);

        alert(`Thank you for your purchase! Your order will be delivered by ${formattedDate}.`);
    }
}

// Adding event listener to the form's submit button
document.querySelector("#checkoutForm").addEventListener("submit", validateAndProceedToPayment);

