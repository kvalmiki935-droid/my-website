document.addEventListener("DOMContentLoaded", () => {

  let cart = [];
  let total = 0;

  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total");

  const productsSection = document.getElementById("products");
  const cartSection = document.getElementById("cart");

  const cartLink = document.querySelector('a[href="#cart"]');
  const backBtn = document.getElementById("back-to-products");

  /* ================= ADD TO CART ================= */
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {

      const product = btn.closest(".product");
      const name = product.dataset.name;
      const price = parseInt(product.dataset.price);

      cart.push({ name, price });
      total += price;

      updateCart();
      alert(name + " added to cart ✅");
    });
  });

  /* ================= UPDATE CART ================= */
  function updateCart() {
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - ₹${item.price}
        <button onclick="removeItem(${index})">❌</button>
      `;
      cartItems.appendChild(li);
    });

    cartCount.innerText = cart.length;
    totalSpan.innerText = total;
  }

  /* ================= REMOVE ITEM ================= */
  window.removeItem = function(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
  };

  /* ================= OPEN CART ================= */
  cartLink.addEventListener("click", (e) => {
    e.preventDefault();
    productsSection.style.display = "none";
    cartSection.style.display = "block";
    window.scrollTo(0, 0);
  });

  /* ================= BACK TO PRODUCTS ================= */
  backBtn.addEventListener("click", () => {
    cartSection.style.display = "none";
    productsSection.style.display = "block";
    window.scrollTo(0, 0);
  });

});


