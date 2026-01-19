let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  let count = document.getElementById("cart-count");
  if (count) count.innerText = cart.length;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.onclick = () => {
      let p = btn.parentElement;
      cart.push({
        name: p.dataset.name,
        price: p.dataset.price
      });
      saveCart();
      updateCartCount();
      alert("Added to cart");
    };
  });

  let list = document.getElementById("cart-items");
  let total = document.getElementById("total");

  if (list) {
    let sum = 0;
    cart.forEach((item, i) => {
      sum += Number(item.price);
      let li = document.createElement("li");
      li.innerHTML = `${item.name} - ₹${item.price}
        <button onclick="removeItem(${i})">❌</button>`;
      list.appendChild(li);
    });
    total.innerText = sum;
  }

  let form = document.getElementById("checkout-form");
  if (form) {
    form.onsubmit = () => {
      let orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.push("Order of ₹" + cart.reduce((a,b)=>a+Number(b.price),0));
      localStorage.setItem("orders", JSON.stringify(orders));
      localStorage.removeItem("cart");
      alert("Order placed!");
      location.href = "orders.html";
      return false;
    };
  }
});

function removeItem(i) {
  cart.splice(i,1);
  saveCart();
  location.reload();
}


