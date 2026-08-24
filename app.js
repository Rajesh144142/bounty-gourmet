/* -------------------------------------------------------------------------- */
/*                                LOGOMART APP                                */
/* -------------------------------------------------------------------------- */

const CART_STORAGE_KEY = 'logomart-cart';
const THEME_STORAGE_KEY = 'logomart-theme';

let slideIndex = 0;
let cartItems = [];

const cartIcon = document.querySelector('#cart-icon');
const cartPanel = document.querySelector('.cartp');
const closeCartButton = document.querySelector('#close-cartp');
const cartContent = document.querySelector('.cart-contentp');
const cartTotal = document.querySelector('.total-pricep');
const cartCount = document.querySelector('.cart-count');
const themeToggle = document.querySelector('.theme-toggle');
const themeToggleIcon = themeToggle?.querySelector('i');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#myTopnav');
const searchInput = document.querySelector('.searchInput');

/* ---------------------------------- INIT ---------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initialiseTheme();
  initialiseCart();
  initialiseNavigation();
  initialiseSearch();
  initialiseModals();
  showSlides();
});

/* --------------------------------- THEME --------------------------------- */
function initialiseTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');

  applyTheme(theme);

  themeToggle?.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  if (themeToggle && themeToggleIcon) {
    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggleIcon.className = isDark ? 'bx bx-sun' : 'bx bx-moon';
  }
}

/* ------------------------------- NAVIGATION ------------------------------- */
function initialiseNavigation() {
  menuToggle?.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.querySelector('i').className = isOpen ? 'bx bx-x' : 'bx bx-menu';
  });

  navigation?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      if (menuToggle) menuToggle.querySelector('i').className = 'bx bx-menu';
    });
  });
}

/* ---------------------------------- CART --------------------------------- */
function initialiseCart() {
  try {
    cartItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch {
    cartItems = [];
  }

  document.querySelectorAll('.add-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const product = button.closest('.product-box');
      addProductToCart({
        title: product.querySelector('.product-title').textContent.trim(),
        price: product.querySelector('.price').textContent.trim(),
        image: product.querySelector('.product-img').src
      });
    });
  });

  cartIcon?.addEventListener('click', () => cartPanel?.classList.add('active'));
  closeCartButton?.addEventListener('click', () => cartPanel?.classList.remove('active'));
  document.querySelector('.btn-buyp')?.addEventListener('click', checkout);

  renderCart();
}

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
        <input type="number" min="1" value="${item.quantity}" class="cart-quantityp" aria-label="Quantity for ${item.title}">
      </div>
      <button type="button" class="cart-remove" aria-label="Remove ${item.title}">
        <i class="bx bx-trash"></i>
      </button>
    `;

    itemElement.querySelector('.cart-remove').addEventListener('click', () => removeCartItem(item.title));
    itemElement.querySelector('.cart-quantityp').addEventListener('change', (event) => updateQuantity(item.title, event.target.value));
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

/* -------------------------------- SEARCH --------------------------------- */
function initialiseSearch() {
  searchInput?.addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();

    document.querySelectorAll('.product-box').forEach((product) => {
      const title = product.querySelector('.product-title').textContent.toLowerCase();
      product.hidden = query.length > 0 && !title.includes(query);
    });
  });
}

/* ------------------------------- SLIDESHOW ------------------------------- */
function showSlides() {
  const slides = document.querySelectorAll('.mySlides');
  if (!slides.length) return;

  slides.forEach((slide) => {
    slide.style.display = 'none';
  });

  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].style.display = 'block';

  window.setTimeout(showSlides, 3500);
}

/* ---------------------------- PRODUCT ROTATION ---------------------------- */
function rotateProducts(containerId, direction) {
  const container = document.getElementById(containerId);
  if (!container || !container.children.length) return;

  if (direction === 'next') {
    container.append(container.firstElementChild);
  } else {
    container.prepend(container.lastElementChild);
  }
}

function next1() { rotateProducts('shop-content1', 'next'); }
function prev1() { rotateProducts('shop-content1', 'prev'); }
function next2() { rotateProducts('shop-content2', 'next'); }
function prev2() { rotateProducts('shop-content2', 'prev'); }
function next3() { rotateProducts('shop-content3', 'next'); }
function prev3() { rotateProducts('shop-content3', 'prev'); }
function next4() { rotateProducts('shop-content4', 'next'); }
function prev4() { rotateProducts('shop-content4', 'prev'); }

/* -------------------------------- MODALS --------------------------------- */
function initialiseModals() {
  const loginModal = document.getElementById('id01');
  const loginForm = loginModal?.querySelector('form');

  loginForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    loginModal.style.display = 'none';
    alert('Login submitted successfully.');
  });

  window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
      loginModal.style.display = 'none';
    }
  });
}
