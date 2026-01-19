document.addEventListener("DOMContentLoaded", () => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItems = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {

    // 🔥 FIX for old data
    if (!item.qty) item.qty = 1;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} × ${item.qty} - ₹${item.price * item.qty}
      <button onclick="removeItem(${index})">❌</button>
    `;

    cartItems.appendChild(li);
    total += item.price * item.qty;
    count += item.qty;
  });

  totalSpan.innerText = total;
  cartCount.innerText = count;
});

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
