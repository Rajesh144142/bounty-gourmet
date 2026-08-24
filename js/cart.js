const CART_STORAGE_KEY = 'logomart-cart';
let cartItems = [];

function initialiseCart() {
  const cartIcon = document.querySelector('#cart-icon');
  const cartPanel = document.querySelector('.cartp');
  const closeCartButton = document.querySelector('#close-cartp');
  const cartContent = document.querySelector('.cart-contentp');
  const cartTotal = document.querySelector('.total-pricep');
  const cartCount = document.querySelector('.cart-count');

  try {
    cartItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch {
    cartItems = [];
  }

  // Bind add-to-cart clicks
  document.querySelectorAll('.add-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const product = button.closest('.product-box');
      if (!product) return;
      
      addProductToCart({
        title: product.querySelector('.product-title')?.textContent.trim() || '',
        price: product.querySelector('.price')?.textContent.trim() || '0',
        image: product.querySelector('.product-img')?.src || ''
      });
    });
  });

  // Bind cart panel open/close
  cartIcon?.addEventListener('click', () => cartPanel?.classList.add('active'));
  closeCartButton?.addEventListener('click', () => cartPanel?.classList.remove('active'));
  document.querySelector('.btn-buyp')?.addEventListener('click', checkout);

  renderCart();

  function addProductToCart(product) {
    const existingProduct = cartItems.find((item) => item.title === product.title);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    saveCart();
    renderCart();
    cartPanel?.classList.add('active');
  }

  function removeCartItem(title) {
    cartItems = cartItems.filter((item) => item.title !== title);
    saveCart();
    renderCart();
  }

  function updateQuantity(title, quantity) {
    const product = cartItems.find((item) => item.title === title);
    if (!product) return;

    product.quantity = Math.max(1, Number(quantity) || 1);
    saveCart();
    renderCart();
  }

  function renderCart() {
    if (!cartContent || !cartTotal || !cartCount) return;

    cartContent.innerHTML = '';

    cartItems.forEach((item) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-boxp';
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-imgp">
        <div class="detail-boxp">
          <div class="cart-product-titlep">${item.title}</div>
          <div class="cart-pricep">${item.price}</div>
          <div class="qty-control">
            <button type="button" class="qty-btn qty-minus" aria-label="Decrease quantity"><i class="bx bx-minus"></i></button>
            <span class="qty-val">${item.quantity}</span>
            <button type="button" class="qty-btn qty-plus" aria-label="Increase quantity"><i class="bx bx-plus"></i></button>
          </div>
        </div>
        <button type="button" class="cart-remove" aria-label="Remove ${item.title}">
          <i class="bx bx-trash-alt"></i>
        </button>
      `;

      itemElement.querySelector('.qty-minus')?.addEventListener('click', () => updateQuantity(item.title, item.quantity - 1));
      itemElement.querySelector('.qty-plus')?.addEventListener('click', () => updateQuantity(item.title, item.quantity + 1));
      itemElement.querySelector('.cart-remove')?.addEventListener('click', () => removeCartItem(item.title));
      
      cartContent.append(itemElement);
    });

    const total = cartItems.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    cartTotal.textContent = `₹${total.toFixed(2)}`;
    cartCount.textContent = itemCount;
  }

  function parsePrice(price) {
    return Number.parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
  }

  function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }

  function checkout() {
    if (!cartItems.length) {
      alert('Your cart is empty.');
      return;
    }

    alert('Checkout is ready to be connected to your payment system.');
  }
}
