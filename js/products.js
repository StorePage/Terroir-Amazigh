/**
 * ============================================================
 * COOPÉRATIVE TERROIR AMAZIGH — products.js
 * Product catalog: data, rendering, filtering, cart
 * ============================================================
 */

/* ============================================================
   PRODUCT CATALOG DATA
   ============================================================ */
const PRODUCTS = [
  {
    id: 1,
    name: "Huile d'Argan Cosmétique",
    desc: "100% pure, extra-vierge. Idéale pour nourrir et revitaliser la peau et les cheveux.",
    price: 75,
    unit: "150 ml",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjC4TmQJhagMKpmem5Fqobcn2Ii2-BWrK40kZSZMy6xofGlfIehpplRyalSnz4uJi2rBdU8dLvTrJWhPHfpN31MuWsh0D3Q2N40CGv3tg3ny-ZnmaF0oAFR3wACyaXzZG71KDOQk43qdOqfiDpauAtioLAEsMb4eZVqMyDz-_8cV7HgWfiVeybQUdpHfwJU/s1600/Huile%20dArgan%20Cosm.webp",
    badge: "Bestseller",
    badgeType: "",
    category: "huiles"
  },
  {
    id: 2,
    name: "Huile d'Argan Alimentaire",
    desc: "Première pression à froid, idéale pour assaisonner salades et tajines.",
    price: 95,
    unit: "250 ml",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8OvFn5E6eR-AvriVvafzKZTnG_Ot1qzwB4DAlRyvdPRFZGu5JnYeZDQWYodBTyI0FyK5bf0tMeepbuD8tu0bS0Y9-c7hjbli2aKK1m4H9VETEiuYWRj5ph4hNeXVcsTswO5gePWE1ptnCR2vooD8KHYUVbDBKdJ081sK3BCnnH58Mx_uUijELQnznwDfK/s1600/Huile%20dArgan%20Alime.webp",
    badge: "Bio",
    badgeType: "bio",
    category: "huiles"
  },
  {
    id: 3,
    name: "Miel de Thym du Haut Atlas",
    desc: "Récolté à haute altitude, riche en antioxydants et au goût boisé unique.",
    price: 85,
    unit: "500 g",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgAUBrRD368yo53ztjFdeu_Jr3bO5-rKyc4kEKN5GiVaN3uYt7yyI77yxxLwJ1S-WGPy1cSRx0D2cN3Ho0jn2mTdzwu69jDu9IfUBOZ4OVe4mtqMyUWy27paJ_3sTnEochOCEqufGeoRdJfPDWwOePsgNA1ai8GwOjgCS7uD5NkWq8eIAYwfUlf6rJEdxSi/s1600/Miel%20de%20Thym.webp",
    badge: null,
    badgeType: "",
    category: "miels"
  },
  {
    id: 4,
    name: "Miel de Sidr Premium",
    desc: "Issu du jujubier sauvage, considéré comme l'un des miels les plus précieux.",
    price: 135,
    unit: "250 g",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjMYrOyQ3CJZIsQEi6LeBoPCcoBeiKT52AGIZn6sExLnwNqmvsv7oFcB4ia5yT1gr1Tnhlfi712ZRlSPIrhKfF5Xfkb3-KEfEsRjVCO6QoydsLF9qpIzSdGBxHfsRLOe4xde2yxBe8fYd4UdUWHyhOFCq06Pp1Tvnq9JnoVPNmunlyOav7ZigO5rKRWFngV/s1600/Miel%20de%20Sidr.webp",
    badge: "Premium",
    badgeType: "",
    category: "miels"
  },
  {
    id: 5,
    name: "Amlou Artisanal",
    desc: "Mélange traditionnel d'amandes grillées, d'huile d'argan et de miel pur.",
    price: 65,
    unit: "400 g",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhTB2otZ2sFqVFLMRHy-Ij3tppkiacpOys3xkKw19PC7dW5R3vQvY2s0ilLBCX-nLP3JXy9ikXSpFnW09gjDXAHXdmpN6Qqc05qvzA5Z0kldsgP23hA0dvHKv6qv8aZyHYtnbw8uNM1EUodsAJBd4fRDG2VAFMF1mFXyYW1xnHMhhQ6zyESIyAcJFaltPX1/s1600/Amlou.webp",
    badge: "Nouveau",
    badgeType: "new",
    category: "specialites"
  },
  {
    id: 6,
    name: "Huile d'Olive Extra Vierge",
    desc: "Cueillie à la main dans les oliveraies de l'Anti-Atlas. Pressée à froid.",
    price: 110,
    unit: "1 L",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDH-1RS-KzxOLUHivtZGn9kHYVzGCNaKX0Ah4YHjBqO1QM90tjLpLURviKHbawBLxeyNUow8nYI395KWnn3ShQoyUIdZhLjBmlT7MlLF2majQwVbhztJNP5URROUf-thrM3s-xeJjNr0CqrM5u-RbmC9Q3p-shXNAzeoh9leoZhNTDpLjbYTINDYGUSmkE/s1600/Huile%20dOlive.webp",
    badge: "Bio",
    badgeType: "bio",
    category: "huiles"
  },
  {
    id: 7,
    name: "Savon Beldi Authentique",
    desc: "Savon noir naturel à base d'huile d'olive et d'eucalyptus. Rituel hammam.",
    price: 35,
    unit: "200 g",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjLAZhf3Nn1QKu-ueTcKgYwU38U19yx8jLL2yA_tg4CCp7nzbAm0jnBn_U79R1SpTVxB9TSlcHciGnWSzGsBWdhun5aDEaO_HAAfPg1SWzii7fs-ZyPR-7VTtbvH3j4PR9F4DPr6Or-5M5_Zoz0cgCmLqZu5EvMRWx8tGDI_UdaUa9wCa4Pz-IJzsMljsk2/s1600/Savon%20Beldi.webp",
    badge: null,
    badgeType: "",
    category: "soins"
  },
  {
    id: 8,
    name: "Ghassoul Naturel",
    desc: "Argile minérale volcanique du Moyen-Atlas. Idéale pour le soin du cuir chevelu.",
    price: 45,
    unit: "500 g",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg1fdYKfWCrJSoBiJuB-kcwGtdd5rJGRk2yMOU6egvEjVnDmZLuyamzy_nEd3nyheOFSDJU5LNQD7NeFYNCKm91EZEMQ3cdDaAt6LGsGDNPdM99bMuy1wDVYPlR4nvJ88B5iG9Pf0L5rEQ9GUrLVIna_MQgZ4F5m1tFxqfTgMqcArWYNNvSDYx9fdrOHym2/s1600/Ghassoul.webp",
    badge: null,
    badgeType: "",
    category: "soins"
  },
  {
    id: 9,
    name: "Eau de Rose de Kelâat M'gouna",
    desc: "Distillée artisanalement des roses de la Vallée du Dadès. Tonique naturelle.",
    price: 55,
    unit: "200 ml",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEje5jFSscrEg5rs59OEsSbEYF5XMdneb7h-zKnC6w9B8AW1Cy9x_6TEOxCw2KFCKOXs2wC2-KMm5GXo7tWDU0Rcgj0fGTfCi15RjkWPVO4yCszs6gqWXLhEtbhhmBcDG_80ooyoqLpNkgs4Ct5N6qJfeO0-yDO11yYFs5dl5MPwUk0HdiZ9lCbyxWnssERq/s1600/Eau%20de%20Rose.webp",
    badge: "Nouveau",
    badgeType: "new",
    category: "soins"
  },
  {
    id: 10,
    name: "Couscous Artisanal de Blé Dur",
    desc: "Roulé à la main selon la tradition berbère. Sans additifs ni conservateurs.",
    price: 48,
    unit: "1 kg",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiHspiMnNccO0DOyavZy_fvbf00N9IajAABoS9FiXkBD_UkgJMHiES5xqyPju5ZRWZrk5sZdw5lMob7qZNrnyfEb_gvWB8M1KrC3wNZsjR_2gZ2sZrDWaw1Mrh2uygsOfRKaaLZpDAesg7Yyc7X7aGmSSZyCB18G4RQqG0IrbGSXHonKcoDg05Dr08WWllo/s1600/Couscous.webp",
    badge: null,
    badgeType: "",
    category: "specialites"
  },
  {
    id: 11,
    name: "Safran Pure du Taliouine",
    desc: "Le safran rouge marocain AOP, l'un des plus fins au monde. Arôme intense.",
    price: 120,
    unit: "2 g",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhnUwh4u5uEwalnvgvFxgyPhnDAbBIbOi270mRlXfOgSwO0aP8TlkNVAtwGgn3YueBpft5kgvjCQWsjV59BX6q6WrXAIwg412GtYF5EQrCnvSHljeJGd-Tjan2p43l0rB2iYDOQ1JU3-0YgcsOPrg4OMeSGdxv1j149uHhAeyoq7BhONtSA4RrfxVeMNoxD/s1600/Safran.webp",
    badge: "Premium",
    badgeType: "",
    category: "specialites"
  },
  {
    id: 12,
    name: "Huile de Nigelle (Habba Sawda)",
    desc: "Pressée à froid, connue pour ses propriétés immunostimulantes millénaires.",
    price: 68,
    unit: "200 ml",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgYfDWWFFL37b2s29N0ITcWg1mGIjons37iDuVTAt7IPvtEtVy1RaZVLwgQRcW5rHgKcNBE61llT6NdXsjyv2JnSlDZbV_YDvOEdetBK2mxE5vn8KWH0V69vMyY3YoQEq2jNzVYo14dmdiG7cO0s_Su1rUOtOGFoxy5PdRSQdRahN_bJ6vbfb40xsl1uXOm/s1600/Huile%20Habba%20Sawda.webp",
    badge: "Bio",
    badgeType: "bio",
    category: "huiles"
  }
];

/* ============================================================
   FILTER STATE
   ============================================================ */
let activeFilter = 'all';

/* ============================================================
   RENDER PRODUCTS
   ============================================================ */
function renderProducts(filter = 'all') {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const list = filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filter);

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="cart-empty" style="grid-column:1/-1">
        <div class="cart-empty-icon">🔍</div>
        <h3>Aucun produit trouvé</h3>
        <p>Essayez une autre catégorie</p>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(p => `
    <article class="product-card reveal" data-id="${p.id}">
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.badge
          ? `<span class="product-badge ${p.badgeType}">${p.badge}</span>`
          : ''}
      </div>
      <div class="product-body">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-price-row">
          <span class="product-price">${p.price} DH</span>
          <span class="product-unit">/ ${p.unit}</span>
        </div>
        <div class="product-controls">
          <div class="qty-row">
            <div class="qty-wrap">
              <button class="qty-btn" onclick="changeQty(${p.id}, -1)" aria-label="Diminuer">−</button>
              <input
                class="qty-input"
                id="qty-${p.id}"
                type="number"
                value="1"
                min="1"
                max="99"
                readonly
              >
              <button class="qty-btn" onclick="changeQty(${p.id}, +1)" aria-label="Augmenter">+</button>
            </div>
          </div>
          <button
            class="add-cart-btn"
            id="btn-${p.id}"
            onclick="handleAddToCart(${p.id})"
            aria-label="Ajouter ${p.name} au panier"
          >
            <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            Ajouter au panier
          </button>
        </div>
      </div>
    </article>
  `).join('');

  /* Re-trigger scroll reveal for newly inserted cards */
  initScrollReveal();
}

/* ============================================================
   QTY CONTROLS
   ============================================================ */
function changeQty(id, delta) {
  const input = document.getElementById(`qty-${id}`);
  if (!input) return;
  const newVal = Math.max(1, Math.min(99, parseInt(input.value) + delta));
  input.value  = newVal;
}

/* ============================================================
   ADD TO CART HANDLER
   ============================================================ */
function handleAddToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const qtyInput = document.getElementById(`qty-${id}`);
  const qty      = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

  addToCart(product, qty);

  /* Visual feedback on button */
  const btn = document.getElementById(`btn-${id}`);
  if (btn) {
    btn.classList.add('added');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      Ajouté !`;

    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = `
        <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        Ajouter au panier`;
    }, 2000);
  }
}

/* ============================================================
   FILTER PILLS
   ============================================================ */
function initFilters() {
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.dataset.filter || 'all';
      renderProducts(activeFilter);
    });
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initFilters();
});
