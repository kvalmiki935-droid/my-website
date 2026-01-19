document.addEventListener("DOMContentLoaded", () => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total");

  const products = document.querySelectorAll(".product");
  const priceFilter = document.getElementById("price-filter");
  const sortSelect = document.getElementById("sort");

  // ADD TO CART
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.parentElement;
      const name = product.dataset.name;
      const price = parseInt(product.dataset.price);

      const item = cart.find(p => p.name === name);
      if (item) item.qty++;
      else cart.push({ name, price, qty: 1 });

      saveCart();
      updateCount();
      alert(name + " added to cart");
    });
  });

  // FILTER
  priceFilter?.addEventListener("change", applyFilterSort);
  sortSelect?.addEventListener("change", applyFilterSort);

  function applyFilterSort() {
    let priceVal = priceFilter.value;
    let sortVal = sortSelect.value;

    let items = Array.from(products);

    // FILTER
    items.forEach(p => {
      const price = parseInt(p.dataset.price);
      let show = true;

      if (priceVal === "0-500") show = price <= 500;
      if (priceVal === "500-1000") show = price > 500 && price <= 1000;
      if (priceVal === "1000+") show = price > 1000;

      p.style.display = show ? "block" : "none";
    });

    // SORT
    let visible = items.filter(p => p.style.display !== "none");

    visible.sort((a, b) => {
      let pa = parseInt(a.dataset.price);
      let pb = parseInt(b.dataset.price);
      if (sortVal === "low-high") return pa - pb;
      if (sortVal === "high-low") return pb - pa;
      return 0;
    });

    visible.forEach(p => p.parentElement.appendChild(p));
  }

  // CART PAGE
  function renderCart() {
    if (!cartItems) return;
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, i) => {
      total += item.price * item.qty;
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - ₹${item.price} × ${item.qty}
        <button onclick="changeQty(${i},1)">+</button>
        <button onclick="changeQty(${i},-1)">−</button>
        <button onclick="removeItem(${i})">❌</button>
      `;
      cartItems.appendChild(li);
    });

    totalSpan.innerText = total;
    updateCount();
  }

  window.changeQty = (i, v) => {
    cart[i].qty += v;
    if (cart[i].qty <= 0) cart.splice(i, 1);
    saveCart();
    renderCart();
  };

  window.removeItem = (i) => {
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


