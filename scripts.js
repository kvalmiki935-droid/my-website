document.addEventListener("DOMContentLoaded", () => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cart-count");

  updateCartCount();

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const p = btn.closest(".product, .card");
      const name = p.dataset.name;
      const price = Number(p.dataset.price);

      let item = cart.find(i => i.name === name);

      if (item) {
        item.qty += 1;
      } else {
        cart.push({ name, price, qty: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert(name + " added to cart");
    });
  });

  function updateCartCount() {
    if (cartCount) {
      cartCount.innerText = cart.reduce((s, i) => s + i.qty, 0);
    }
  }
});


