document.addEventListener("DOMContentLoaded", () => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItems = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total");
  const cartCount = document.getElementById("cart-count");

  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
      if (!item.qty) item.qty = 1;

      total += item.price * item.qty;
      count += item.qty;

      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${item.name}</strong> – ₹${item.price}
        <br>
        <button onclick="changeQty(${index}, -1)">−</button>
        <span style="margin:0 10px">${item.qty}</span>
        <button onclick="changeQty(${index}, 1)">+</button>
        <button onclick="removeItem(${index})" style="margin-left:15px">❌</button>
      `;
      cartItems.appendChild(li);
    });

    totalSpan.innerText = total;
    cartCount.innerText = count;

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  window.changeQty = function (index, change) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    renderCart();
  };

  window.removeItem = function (index) {
    cart.splice(index, 1);
    renderCart();
  };

  renderCart();
});
