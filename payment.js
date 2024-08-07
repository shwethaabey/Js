// Function to generate the order summary on the payment page
function generateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const orderSummaryTableBody = document.querySelector("#order-summary-table tbody");
    let totalAmount = 0;

    if (cart && cart.length > 0) {
        cart.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>Rs. ${item.price.toFixed(2)}</td>
                <td>Rs. ${(item.price * item.quantity).toFixed(2)}</td>
            `;
            orderSummaryTableBody.appendChild(row);
            totalAmount += item.price * item.quantity;
        });

        document.getElementById("order-total").innerText = `Total: Rs. ${totalAmount.toFixed(2)}`;
    } else {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="4">No items in the cart</td>`;
        orderSummaryTableBody.appendChild(row);
    }
}

// Call the function when the page loads
window.onload = generateOrderSummary;
