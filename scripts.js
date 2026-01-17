document.addEventListener("DOMContentLoaded", function () {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total");

  const productsSection = document.getElementById("products");
  const cartSection = document.getElementById("cart");

  // ---------------- ADD TO CART ----------------
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {

      const product = this.parentElement;
      const name = product.getAttribute("data-name");
      const price = parseInt(product.getAttribute("data-price"));

      const existing = cart.find(item => item.name === name);

      if (existing) {
        existing.qty++;
      } else {
        cart.push({ name, price, qty: 1 });
      }

      saveCart();
      updateCart();
      alert(name + " added to cart ✅");
    });
  });

  // ---------------- UPDATE CART ----------------
  function updateCart() {
    if (!cartItems) return;

    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;
      count += item.qty;

      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - ₹${item.price} × ${item.qty}
        <button onclick="increase(${index})">+</button>
        <button onclick="decrease(${index})">-</button>
        <button onclick="removeItem(${index})">❌</button>
      `;
      cartItems.appendChild(li);
    });

    cartCount.innerText = count;
    totalSpan.innerText = total;
  }

  // ---------------- CART ACTIONS ----------------
  window.increase = function (i) {
    cart[i].qty++;
    saveCart();
    updateCart();
  };

  window.decrease = function (i) {
    if (cart[i].qty > 1) cart[i].qty--;
    else cart.splice(i, 1);
    saveCart();
    updateCart();
  };

  window.removeItem = function (i) {
    cart.splice(i, 1);
    saveCart();
    updateCart();
  };

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // ---------------- NAVIGATION ----------------
  const productsLink = document.querySelector('a[href="#products"]');
  const cartLink = document.querySelector('a[href="#cart"]');

  if (productsLink && cartLink) {
    productsLink.addEventListener("click", e => {
      e.preventDefault();
      productsSection.style.display = "block";
      cartSection.style.display = "none";
    });

    cartLink.addEventListener("click", e => {
      e.preventDefault();
      productsSection.style.display = "none";
      cartSection.style.display = "block";
    });
  }

  updateCart();
});



