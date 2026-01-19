document.addEventListener("DOMContentLoaded", () => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const cartCount = document.getElementById("cart-count");

  renderCart();

  function renderCart() {
    list.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      list.innerHTML = "<li>Your cart is empty</li>";
      totalEl.innerText = "0";
      updateCount();
      return;
    }

    cart.forEach((item, index) => {
      total += item.price * item.qty;

      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} × ${item.qty} – ₹${item.price * item.qty}
        <button onclick="removeItem(${index})">❌</button>
      `;
      list.appendChild(li);
    });

    totalEl.innerText = total;
    updateCount();
  }

  window.removeItem = (i) => {
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  function updateCount() {
    if (cartCount) {
      cartCount.innerText = cart.reduce((s, i) => s + i.qty, 0);
    }
  }
});
