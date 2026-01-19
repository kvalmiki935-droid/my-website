document.addEventListener("DOMContentLoaded", () => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItems = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total");
  const cartCount = document.getElementById("cart-count");

  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.name} × ${item.qty} - ₹${item.price * item.qty}
      <button onclick="removeItem(${index})">❌</button>
    `;

    cartItems.appendChild(li);
    total += item.price * item.qty;
  });

  totalSpan.innerText = total;
  cartCount.innerText = cart.reduce((s, i) => s + i.qty, 0);

});

/* REMOVE ITEM */
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
