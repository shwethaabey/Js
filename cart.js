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
            <td><button class="remove-btn" onclick="removeFromCart('${item.name}')">Delete</button></td>
        `;
        cartTableBody.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById("total-price").innerText = `Rs. ${totalPrice.toFixed(2)}`;
}

//function to remove an item from the cart
function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCartTable();
}