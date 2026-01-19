document.addEventListener("DOMContentLoaded", () => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const products = document.querySelectorAll(".product");
  const searchInput = document.getElementById("search");
  const sizeFilter = document.getElementById("size-filter");
  const cartCount = document.getElementById("cart-count");

  updateCartCount();

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const p = btn.parentElement;
      const name = p.dataset.name;
      const price = parseInt(p.dataset.price);

      cart.push({ name, price });
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert(name + " added to cart");
    });
  });

  function updateCartCount() {
    cartCount.innerText = cart.length;
  }

  function filterProducts() {
    const text = searchInput.value.toLowerCase();
    const size = sizeFilter.value;

    products.forEach(p => {
      const name = p.dataset.name.toLowerCase();
      const sizes = p.dataset.size.split(",");

      let matchText = name.includes(text);
      let matchSize = size === "all" || sizes.includes(size);

      p.style.display = matchText && matchSize ? "block" : "none";
    });
  }

  searchInput.addEventListener("keyup", filterProducts);
  sizeFilter.addEventListener("change", filterProducts);

});


