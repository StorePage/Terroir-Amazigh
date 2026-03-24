/**
 * ============================================================
 * COOPÉRATIVE TERROIR AMAZIGH — panier.js
 * Cart rendering, delivery selection, checkout via WhatsApp
 * ============================================================
 */

let selectedZone = 'maroc'; // default delivery zone

/* ============================================================
   RENDER CART PAGE
   ============================================================ */
function renderCartPage() {
  const cart       = getCart();
  const listEl     = document.getElementById('cart-items-list');
  const emptyEl    = document.getElementById('cart-empty-state');
  const contentEl  = document.getElementById('cart-content');

  if (!listEl) return;

  if (cart.length === 0) {
    if (contentEl)  contentEl.style.display  = 'none';
    if (emptyEl)    emptyEl.style.display     = 'block';
    return;
  }

  if (contentEl)  contentEl.style.display  = 'grid';
  if (emptyEl)    emptyEl.style.display     = 'none';

  /* Render items */
  listEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img
        class="cart-item-img"
        src="${item.image}"
        alt="${item.name}"
        loading="lazy"
        onerror="this.src='https://picsum.photos/seed/product/80/80'"
      >
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-sub">${item.unit} — ${item.price} DH / unité</div>
      </div>
      <div class="cart-item-right">
        <div class="cart-item-qty-wrap">
          <button class="cart-qty-btn" onclick="changeItemQty(${item.id}, ${item.qty - 1})" aria-label="Diminuer">−</button>
          <span class="cart-qty-num">${item.qty}</span>
          <button class="cart-qty-btn" onclick="changeItemQty(${item.id}, ${item.qty + 1})" aria-label="Augmenter">+</button>
        </div>
        <span class="cart-item-price">${(item.price * item.qty).toFixed(2)} DH</span>
        <span class="cart-item-del" onclick="deleteItem(${item.id})" role="button" aria-label="Supprimer">
          <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
        </span>
      </div>
    </div>
  `).join('');

  updateSummary();
}

/* ============================================================
   CART ITEM ACTIONS
   ============================================================ */
function changeItemQty(id, newQty) {
  updateCartQty(id, newQty);
  renderCartPage();
}

function deleteItem(id) {
  removeFromCart(id);
  renderCartPage();
}

function handleClearCart() {
  if (confirm('Vider tout le panier ?')) {
    clearCart();
    renderCartPage();
  }
}

/* ============================================================
   SUMMARY & DELIVERY
   ============================================================ */
function updateSummary() {
  const { subtotal } = getCartTotals();
  const delivery     = calcDelivery(selectedZone, subtotal);
  const total        = subtotal + delivery;

  /* Subtotal */
  const subEl = document.getElementById('summary-subtotal');
  if (subEl) subEl.textContent = subtotal.toFixed(2) + ' DH';

  /* Delivery */
  const delEl   = document.getElementById('summary-delivery');
  const delLbl  = document.getElementById('summary-delivery-label');
  if (delEl) delEl.textContent = delivery === 0 ? 'Gratuit 🎉' : delivery + ' DH';
  if (delLbl) {
    delLbl.textContent = selectedZone === 'international'
      ? 'Livraison Internationale'
      : 'Livraison au Maroc';
  }

  /* Total */
  const totEl = document.getElementById('summary-total');
  if (totEl) totEl.textContent = total.toFixed(2) + ' DH';

  /* Free shipping progress bar */
  updateFreeShipBar(subtotal);
}

function updateFreeShipBar(subtotal) {
  const barEl  = document.getElementById('free-ship-bar');
  const fillEl = document.getElementById('free-ship-fill');
  const msgEl  = document.getElementById('free-ship-msg');

  if (!barEl || selectedZone === 'international') {
    if (barEl) barEl.style.display = 'none';
    return;
  }

  barEl.style.display = '';
  const pct     = Math.min(100, (subtotal / DELIVERY_FREE_AT) * 100);
  const remaining = Math.max(0, DELIVERY_FREE_AT - subtotal);

  if (fillEl) fillEl.style.width = pct + '%';

  if (msgEl) {
    msgEl.textContent = subtotal >= DELIVERY_FREE_AT
      ? '🎉 Livraison gratuite débloquée !'
      : `Plus que ${remaining.toFixed(2)} DH pour la livraison gratuite`;
  }
}

/* ============================================================
   DELIVERY ZONE SELECTION
   ============================================================ */
function selectZone(zone) {
  selectedZone = zone;

  document.querySelectorAll('.delivery-radio').forEach(el => {
    el.classList.toggle('selected', el.dataset.zone === zone);
  });

  updateSummary();
}

/* ============================================================
   CHECKOUT MODAL
   ============================================================ */
function openCheckoutModal() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Votre panier est vide', false);
    return;
  }

  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.remove('show');
  document.body.style.overflow = '';
}

/* ============================================================
   GENERATE WHATSAPP ORDER MESSAGE
   ============================================================ */
function submitOrder() {
  const name    = document.getElementById('order-name')?.value.trim();
  const address = document.getElementById('order-address')?.value.trim();
  const notes   = document.getElementById('order-notes')?.value.trim();

  /* Validation */
  if (!name) {
    document.getElementById('order-name')?.focus();
    showToast('Veuillez entrer votre nom', false);
    return;
  }
  if (!address) {
    document.getElementById('order-address')?.focus();
    showToast('Veuillez entrer votre adresse', false);
    return;
  }

  const cart           = getCart();
  const { subtotal }   = getCartTotals();
  const delivery       = calcDelivery(selectedZone, subtotal);
  const total          = subtotal + delivery;
  const deliveryLabel  = selectedZone === 'international' ? 'Internationale' : 'Maroc';
  const deliveryCost   = delivery === 0 ? 'Gratuite' : delivery + ' DH';

  /* Build message */
  const lines = [
    '🌿 *Nouvelle Commande — Coopérative Terroir Amazigh*',
    '',
    '👤 *Client :*',
    `Nom : ${name}`,
    `Adresse : ${address}`,
    notes ? `Notes : ${notes}` : '',
    '',
    '🛒 *Produits commandés :*'
  ];

  cart.forEach(item => {
    lines.push(`• ${item.name} × ${item.qty} (${item.unit}) = ${(item.price * item.qty).toFixed(2)} DH`);
  });

  lines.push(
    '',
    '──────────────────',
    `Sous-total : ${subtotal.toFixed(2)} DH`,
    `Livraison (${deliveryLabel}) : ${deliveryCost}`,
    `*Total : ${total.toFixed(2)} DH*`,
    '──────────────────',
    '',
    'Merci de confirmer ma commande. 🙏'
  );

  const message = lines.filter(l => l !== '').join('\n');

  /* Close modal */
  closeCheckoutModal();

  /* Open WhatsApp */
  openWhatsApp(message);

  /* Optionally clear cart after order */
  setTimeout(() => {
    if (confirm('Votre commande a été envoyée ! Vider le panier ?')) {
      clearCart();
      renderCartPage();
    }
  }, 500);
}

/* ============================================================
   CLOSE MODAL ON OVERLAY CLICK
   ============================================================ */
function initModalListeners() {
  const overlay = document.getElementById('checkout-modal');
  if (!overlay) return;

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeCheckoutModal();
  });

  /* Escape key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCheckoutModal();
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderCartPage();
  initModalListeners();

  /* Delivery zone buttons */
  document.querySelectorAll('.delivery-radio').forEach(el => {
    el.addEventListener('click', () => selectZone(el.dataset.zone));
  });

  /* Clear cart button */
  document.getElementById('clear-cart-btn')?.addEventListener('click', handleClearCart);

  /* Checkout button */
  document.getElementById('checkout-btn')?.addEventListener('click', openCheckoutModal);

  /* Submit order */
  document.getElementById('submit-order-btn')?.addEventListener('click', submitOrder);

  /* Close modal */
  document.getElementById('modal-close-btn')?.addEventListener('click', closeCheckoutModal);
});
