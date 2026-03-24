/**
 * ============================================================
 * COOPÉRATIVE TERROIR AMAZIGH — main.js
 * Shared utilities: cart, navigation, scroll reveal, toast
 * ============================================================
 */

/* ============================================================
   CART STORAGE KEY
   ============================================================ */
const CART_KEY = 'terroir_cart';

/* ============================================================
   CART CRUD — localStorage-backed
   ============================================================ */

/**
 * Get cart from localStorage.
 * Returns array of items: [{ id, name, desc, price, unit, image, qty }]
 */
function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Save cart array to localStorage */
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/**
 * Add a product to the cart, or increment qty if it exists.
 * @param {Object} product - { id, name, desc, price, unit, image }
 * @param {number} qty
 */
function addToCart(product, qty = 1) {
  const cart = getCart();
  const idx  = cart.findIndex(i => i.id === product.id);

  if (idx >= 0) {
    cart[idx].qty += qty;
  } else {
    cart.push({ ...product, qty });
  }

  saveCart(cart);
  refreshCartUI();
  showToast(`✓ ${product.name} ajouté au panier`);
}

/**
 * Remove an item from the cart by id.
 */
function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  refreshCartUI();
}

/**
 * Update item quantity. Removes item if qty ≤ 0.
 */
function updateCartQty(id, qty) {
  const cart = getCart();
  const idx  = cart.findIndex(i => i.id === id);
  if (idx < 0) return;

  if (qty <= 0) {
    cart.splice(idx, 1);
  } else {
    cart[idx].qty = qty;
  }

  saveCart(cart);
  refreshCartUI();
}

/** Clear entire cart */
function clearCart() {
  saveCart([]);
  refreshCartUI();
}

/**
 * Get cart totals.
 * @returns {{ subtotal, itemCount }}
 */
function getCartTotals() {
  const cart = getCart();
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return { subtotal, itemCount };
}

/* ============================================================
   DELIVERY COST CALCULATION
   ============================================================ */
const DELIVERY_LOCAL   = 25;    // Maroc
const DELIVERY_FREE_AT = 499;   // Free threshold
const DELIVERY_INTL    = 250;   // International

/**
 * Calculate delivery cost.
 * @param {'maroc'|'international'} zone
 * @param {number} subtotal
 * @returns {number}
 */
function calcDelivery(zone, subtotal) {
  if (zone === 'international') return DELIVERY_INTL;
  return subtotal >= DELIVERY_FREE_AT ? 0 : DELIVERY_LOCAL;
}

/* ============================================================
   UI — update cart badges across all pages
   ============================================================ */
function refreshCartUI() {
  const { itemCount } = getCartTotals();

  /* Desktop header badge */
  document.querySelectorAll('.cart-count-badge').forEach(el => {
    el.textContent = itemCount;
    el.style.display = itemCount > 0 ? 'flex' : 'none';
  });

  /* Mobile bottom nav badge */
  document.querySelectorAll('.bnav-badge').forEach(el => {
    el.textContent = itemCount;
    el.classList.toggle('visible', itemCount > 0);
  });
}

/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */
let toastTimer;

function showToast(msg, icon = true) {
  let toast = document.getElementById('app-toast');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = icon
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:16px;height:16px;stroke:var(--honey)"><polyline points="20 6 9 17 4 12"/></svg>${msg}`
    : msg;

  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ============================================================
   MOBILE BOTTOM NAV — active page highlight
   ============================================================ */
function initBottomNav() {
  const page  = location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.bottom-nav-item');

  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    const isActive =
      (href.includes(page)) ||
      (page === '' && href.includes('index'));
    link.classList.toggle('active', isActive);
  });
}

/* ============================================================
   DESKTOP NAV — active page highlight
   ============================================================ */
function initDesktopNav() {
  const page  = location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.desktop-nav a');

  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    const isActive =
      (href.includes(page)) ||
      (page === '' && href.includes('index'));
    link.classList.toggle('active', isActive);
  });
}

/* ============================================================
   STICKY HEADER — add class on scroll
   ============================================================ */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => observer.observe(el));
}

/* ============================================================
   FORMAT CURRENCY
   ============================================================ */
function fmt(n) {
  return n.toFixed(2).replace('.00', '') + ' DH';
}

/* ============================================================
   WHATSAPP REDIRECT
   ============================================================ */
const WA_NUMBER = '212633548605'; // Replace with real number

/**
 * Open WhatsApp with a pre-filled message.
 * @param {string} message
 */
function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  const url     = `https://wa.me/${WA_NUMBER}?text=${encoded}`;
  window.open(url, '_blank');
}

/* ============================================================
   INIT — run on every page
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  refreshCartUI();
  initBottomNav();
  initDesktopNav();
  initStickyHeader();
  initScrollReveal();
});
