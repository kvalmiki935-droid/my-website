// ================= CART =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  document.querySelectorAll("#cart-count").forEach(el => {
    el.innerText = cart.length;
  });
}

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  updateCartCount();
  alert(name + " added to cart ✅");
}

// ================= CART PAGE =================
function loadCart() {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  if (!list) return;

  list.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ₹${item.price}
      <button onclick="removeItem(${index})">❌</button>
    `;
    list.appendChild(li);
  });

  totalEl.innerText = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  loadCart();
  updateCartCount();
}

// ================= CHECKOUT =================
function placeOrder() {
  if (cart.length === 0) {
    alert("Cart empty ❌");
    return;
  }

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.push({
    id: Date.now(),
    date: new Date().toLocaleString(),
    items: cart
  });

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("cart");

  cart = [];
  updateCartCount();

  alert("Order placed successfully 🎉");
  window.location.href = "order-history.html";
}

// ================= ORDER HISTORY =================
function loadOrders() {
  const container = document.getElementById("orders");
  if (!container) return;

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    container.innerHTML = "<p>No orders yet 😕</p>";
    return;
  }

  orders.reverse().forEach(order => {
    let html = `<div class="order">
      <h3>Order ID: ${order.id}</h3>
      <small>${order.date}</small>
      <ul>`;

    order.items.forEach(item => {
      html += `<li>${item.name} - ₹${item.price}</li>`;
    });

    html += `</ul></div>`;
    container.innerHTML += html;
  });
}

updateCartCount();

