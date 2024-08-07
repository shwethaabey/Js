// Function to update cart table and total price
function updateCartTable() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
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

// Load cart data and update table when the page loads
document.addEventListener("DOMContentLoaded", updateCartTable);
