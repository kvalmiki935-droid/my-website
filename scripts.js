document.addEventListener("DOMContentLoaded", () => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total");

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.parentElement;
      const name = product.dataset.name;
      const price = parseInt(product.dataset.price);

      const item = cart.find(p => p.name === name);
      if (item) {
        item.qty++;
      } else {
        cart.push({ name, price, qty: 1 });
      }

      saveCart();
      updateCount();
      alert(name + " added to cart");
    });
  });

  function renderCart() {
    if (!cartItems) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;

      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - ₹${item.price} × ${item.qty}
        <button onclick="changeQty(${index},1)">+</button>
        <button onclick="changeQty(${index},-1)">−</button>
        <button onclick="removeItem(${index})">❌</button>
      `;
      cartItems.appendChild(li);
    });

    totalSpan.innerText = total;
    updateCount();
  }

  window.changeQty = function (i, v) {
    cart[i].qty += v;
    if (cart[i].qty <= 0) cart.splice(i, 1);
    saveCart();
    renderCart();
  };

  window.removeItem = function (i) {
    cart.splice(i, 1);
    saveCart();
    renderCart();
  };

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCount() {
    if (cartCount)
      cartCount.innerText = cart.reduce((s, i) => s + i.qty, 0);
  }

  renderCart();
});


