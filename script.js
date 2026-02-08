// -----------------------------
// Basic product data
// -----------------------------
const products = [
  {
    id: 1,
    name: "Cloud Beige Hoodie",
    description: "Oversized · Unisex · Ultra soft fleece",
    price: 149,
    oldPrice: 199,
    tag: "New",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    colors: [ { name: 'Beige', value: '#E8D4C4' }, { name: 'Clay', value: '#DDB7A1' } ],
    designs: [ 'Plain', 'Logo' ],
    image: "https://via.placeholder.com/400x400/E8D4C4/333333?text=Cloud+Beige+Hoodie"
  },
  {
    id: 2,
    name: "Midnight Joggers",
    description: "Tapered fit · Drawstring · Everyday comfort",
    price: 129,
    oldPrice: 169,
    tag: "Best seller",
    category: "Bottoms",
    sizes: ["S", "M", "L", "XL"],
    image: "https://via.placeholder.com/400x400/1A1A2E/FFFFFF?text=Midnight+Joggers"
  },
  {
    id: 3,
    name: "Sunrise Oversized Tee",
    description: "Relaxed fit · Breathable cotton",
    price: 89,
    oldPrice: 119,
    tag: "Trending",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: [ { name: 'Sunrise', value: '#FFB347' }, { name: 'White', value: '#FFFFFF' }, { name: 'Black', value: '#111827' } ],
    designs: [ 'Graphic', 'Plain', 'Pocket' ],
    image: "https://via.placeholder.com/400x400/FFB347/333333?text=Sunrise+Tee"
  },
  {
    id: 4,
    name: "Weekend Co-ord Set",
    description: "Matching top & bottom · Limited edition",
    price: 249,
    oldPrice: 299,
    tag: "Limited",
    category: "Sets",
    sizes: ["S", "M", "L"],
    image: "https://via.placeholder.com/400x400/DCC0B1/333333?text=Co-ord+Set"
  },
  {
    id: 5,
    name: "Soft Lounge Pants",
    description: "Home, travel, and everything in between",
    price: 119,
    oldPrice: 149,
    tag: "Cozy",
    category: "Bottoms",
    sizes: ["S", "M", "L", "XL"],
    image: "https://via.placeholder.com/400x400/C8B8A8/333333?text=Lounge+Pants"
  },
  {
    id: 6,
    name: "Everyday White Tee",
    description: "Wardrobe essential · Heavyweight cotton",
    price: 79,
    oldPrice: 99,
    tag: "Essential",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: [ { name: 'White', value: '#FFFFFF' }, { name: 'Heather', value: '#E5E7EB' }, { name: 'Black', value: '#111827' } ],
    designs: [ 'Plain', 'Logo' ],
    image: "https://via.placeholder.com/400x400/FFFFFF/333333?text=White+Tee"
  },
  {
    id: 7,
    name: "Classic Blue Denim Jeans",
    description: "Slim fit · Premium denim · Perfect wash",
    price: 189,
    oldPrice: 249,
    tag: "Trending",
    category: "Denim",
    sizes: ["30", "32", "34", "36"],
    colors: [ { name: 'Blue', value: '#4A6FA5' }, { name: 'Light Wash', value: '#8BA8C0' } ],
    designs: [ 'Classic', 'Distressed' ],
    image: "https://via.placeholder.com/400x400/4A6FA5/FFFFFF?text=Blue+Denim"
  },
  {
    id: 8,
    name: "Vintage Black Denim Jacket",
    description: "Oversized · Classic style · Timeless piece",
    price: 229,
    oldPrice: 299,
    tag: "New",
    category: "Denim",
    sizes: ["S", "M", "L", "XL"],
    image: "https://via.placeholder.com/400x400/2C2C2C/FFFFFF?text=Denim+Jacket"
  },
  {
    id: 9,
    name: "Light Wash Straight Jeans",
    description: "Straight fit · Comfortable · All-day wear",
    price: 179,
    oldPrice: 229,
    tag: "Best seller",
    category: "Denim",
    sizes: ["30", "32", "34", "36"],
    image: "https://via.placeholder.com/400x400/8BA8C0/333333?text=Light+Wash+Jeans"
  },
  {
    id: 10,
    name: "Distressed Denim Shorts",
    description: "Mid-length · Trendy · Perfect for summer",
    price: 139,
    oldPrice: 179,
    tag: "Summer",
    category: "Denim",
    sizes: ["S", "M", "L"],
    image: "https://via.placeholder.com/400x400/6B8FA3/FFFFFF?text=Denim+Shorts"
  }
];

// -----------------------------
// State
// -----------------------------
let cart = [];

// Load from localStorage if available
const savedCart = localStorage.getItem("zhan_cart");
if (savedCart) {
  try {
    cart = JSON.parse(savedCart);
  } catch (e) {
    cart = [];
  }
}

// -----------------------------
// Helpers
// -----------------------------
function saveCart() {
  localStorage.setItem("zhan_cart", JSON.stringify(cart));
}

function formatSAR(amount) {
  return `SAR ${amount.toFixed(2)}`;
}

function getCartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = cart.length > 0 ? 15 : 0;
  const total = subtotal + shipping;
  return { subtotal, shipping, total };
}

// -----------------------------
// Render products
// -----------------------------
const productGrid = document.getElementById("productGrid");
let filteredProducts = [...products];

function renderProducts(productsToRender = filteredProducts) {
  productGrid.innerHTML = "";
  productsToRender.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";

    // On homepage we hide size selection (sizes are selected on product view page)
    let sizeMarkup = "";

    card.innerHTML = `
      <div class="product-tag">${p.tag}</div>
      <div class="product-image">
        <img class="product-thumb" data-id="${p.id}" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/400x400/CCCCCC/333333?text=No+image'" />
      </div>
          <div class="product-info">
        <a class="product-name" href="product.html?id=${p.id}" style="text-decoration:none;color:inherit;cursor:pointer;">${p.name}</a>
        <div class="product-meta">${p.description}</div>
        ${sizeMarkup}
        <div class="product-bottom">
          <div class="product-price">
            ${formatSAR(p.price)}
            <span>${formatSAR(p.oldPrice)}</span>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <a class="btn-view" href="product.html?id=${p.id}">View</a>
            <button class="btn-add" data-id="${p.id}">Add to cart</button>
          </div>
        </div>
        ${p.colors ? `
          <div class="color-swatches" data-id="${p.id}">
            ${p.colors.map(c => `<button class="color-swatch" data-id="${p.id}" data-color="${c.value}" title="${c.name}" style="background:${c.value}"></button>`).join("")}
          </div>
        ` : ''}
        ${p.designs ? `
          <div class="design-pills" data-id="${p.id}">
            ${p.designs.map(d => `<button type="button" class="design-pill" data-id="${p.id}" data-design="${d}">${d}</button>`).join("")}
          </div>
        ` : ''}
      </div>
    `;

    productGrid.appendChild(card);
  });

    // expose the currently rendered gallery ordering so lightbox can iterate
    try { window.currentGallery = productsToRender.map(p => p.id); } catch (e) { window.currentGallery = products.map(p => p.id); }

    // attach thumbnail click -> open lightbox
    productGrid.querySelectorAll('.product-thumb').forEach(img => {
      img.addEventListener('click', (ev) => {
        const id = Number(img.getAttribute('data-id'));
        if (typeof openLightboxById === 'function') openLightboxById(id);
      });
    });

    // attach color/design handlers and wire add-to-cart to respect selections
    productGrid.querySelectorAll('.color-swatch').forEach(s => {
      s.addEventListener('click', (e) => {
        const id = s.getAttribute('data-id');
        const container = s.closest('.product-card');
        if (!container) return;
        container.querySelectorAll('.color-swatch').forEach(b => b.classList.remove('selected'));
        s.classList.add('selected');
      });
    });

    productGrid.querySelectorAll('.design-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const container = pill.closest('.product-card');
        if (!container) return;
        container.querySelectorAll('.design-pill').forEach(b => b.classList.remove('selected'));
        pill.classList.add('selected');
      });
    });

    // override add button behavior to read selections from card
    productGrid.querySelectorAll('.btn-add').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-id'));
        const card = btn.closest('.product-card');
        const product = products.find(p => p.id === id);
        if (product && Array.isArray(product.sizes) && product.sizes.length > 0) {
          // sizes must be chosen on product view — redirect there
          window.location.href = `product.html?id=${id}`;
          return;
        }

        const colorEl = card ? card.querySelector('.color-swatch.selected') : null;
        const designEl = card ? card.querySelector('.design-pill.selected') : null;
        const color = colorEl ? colorEl.getAttribute('data-color') : null;
        const design = designEl ? designEl.getAttribute('data-design') : null;

        // pass options object as 4th parameter
        addToCart(id, null, 1, { color, design });
      });
    });

  // Attach add-to-cart events: if product has sizes, send user to product view to choose size
  productGrid.querySelectorAll(".btn-add").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      const product = products.find(p => p.id === id);
      if (product && Array.isArray(product.sizes) && product.sizes.length > 0) {
        // sizes must be chosen on product view — redirect there
        window.location.href = `product.html?id=${id}`;
      } else {
        addToCart(id, null);
      }
    });
  });
}

// -----------------------------
// Cart logic
// -----------------------------
const cartCountEl = document.getElementById("cartCount");
const cartItemsEl = document.getElementById("cartItems");
const cartSubtotalEl = document.getElementById("cartSubtotal");
const cartTotalEl = document.getElementById("cartTotal");

function findCartItem(productId, size) {
  return cart.find((it) => it.id === productId && (it.size || null) === (size || null));
}

function addToCart(productId, size = null, qty = 1, opts = {}) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  // Require size when product defines sizes
  if (Array.isArray(product.sizes) && product.sizes.length > 0 && !size) {
    alert('Please select a size before adding to cart.');
    return;
  }

  const existing = cart.find(item => item.id === productId && (item.size || null) === (size || null) && (item.color || null) === (opts.color || null) && (item.design || null) === (opts.design || null));
  if (existing) {
    existing.qty += qty;
  } else {
    const base = { id: product.id, name: product.name, price: product.price, oldPrice: product.oldPrice, category: product.category, tag: product.tag };
    cart.push({ ...base, size: size || null, qty: qty, color: opts.color || null, design: opts.design || null });
  }

  saveCart();
  renderCart();
  openCart();
}

function updateCartQty(productId, size, delta) {
  const item = findCartItem(productId, size);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((i) => !(i.id === productId && (i.size || null) === (size || null)));
  }
  saveCart();
  renderCart();
}

// -----------------------------
// Lightbox / gallery
// -----------------------------
function ensureLightbox() {
  if (document.getElementById('lightbox')) return;
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.className = 'lightbox';
  lb.innerHTML = `
    <div class="lightbox-overlay" id="lightboxOverlay"></div>
    <div class="lightbox-inner">
      <button class="lb-close" id="lbClose">×</button>
      <button class="lb-prev" id="lbPrev">‹</button>
      <div class="lb-stage">
        <img src="" alt="" id="lbImage" class="lb-image" />
        <div class="lb-caption" id="lbCaption"></div>
      </div>
      <button class="lb-next" id="lbNext">›</button>
    </div>
  `;
  document.body.appendChild(lb);

  // events
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxOverlay').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', () => showSlide((window.lbIndex || 0) - 1));
  document.getElementById('lbNext').addEventListener('click', () => showSlide((window.lbIndex || 0) + 1));
  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('lightbox')) return;
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showSlide((window.lbIndex || 0) - 1);
    if (e.key === 'ArrowRight') showSlide((window.lbIndex || 0) + 1);
  });
}

function openLightboxById(productId) {
  ensureLightbox();
  const gallery = Array.isArray(window.currentGallery) && window.currentGallery.length ? window.currentGallery : products.map(p => p.id);
  const idx = gallery.indexOf(productId) >= 0 ? gallery.indexOf(productId) : products.findIndex(p => p.id === productId);
  window.lbGallery = gallery;
  showSlide(idx);
  document.getElementById('lightbox').classList.add('open');
  document.body.classList.add('no-scroll');
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

function showSlide(index) {
  const gallery = Array.isArray(window.lbGallery) && window.lbGallery.length ? window.lbGallery : products.map(p => p.id);
  if (typeof index !== 'number') index = 0;
  if (index < 0) index = gallery.length - 1;
  if (index >= gallery.length) index = 0;
  window.lbIndex = index;
  const id = gallery[index];
  const p = products.find(x => x.id === id) || {};
  const img = document.getElementById('lbImage');
  const cap = document.getElementById('lbCaption');
  if (img) img.src = p.image || '';
  if (cap) cap.textContent = p.name || '';
}

function removeFromCart(productId, size) {
  cart = cart.filter((i) => !(i.id === productId && (i.size || null) === (size || null)));
  saveCart();
  renderCart();
}

function renderCart() {
  cartItemsEl.innerHTML = "";

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<div style="font-size:12px;color:#6b7280;">Your cart is empty. Start adding your favorite outfits.</div>`;
  } else {
    cart.forEach((item) => {
      const row = document.createElement("div");
      row.className = "cart-item";
      const sizeLabel = item.size ? `<div class="cart-size">Size: <strong>${item.size}</strong></div>` : "";
      row.innerHTML = `
        <div class="cart-thumb">${item.category}</div>
        <div class="cart-info">
          ${item.name}
          ${sizeLabel}
          <span>${formatSAR(item.price)} · ${item.category}</span>
          <div class="cart-qty">
            <button data-id="${item.id}" data-size="${item.size || ""}" data-delta="-1">-</button>
            <span>${item.qty}</span>
            <button data-id="${item.id}" data-size="${item.size || ""}" data-delta="1">+</button>
          </div>
          <button class="cart-remove" data-id="${item.id}" data-size="${item.size || ""}">Remove</button>
        </div>
        <div style="font-size:12px;font-weight:600;">
          ${formatSAR(item.price * item.qty)}
        </div>
      `;
      cartItemsEl.appendChild(row);
    });

    // Qty buttons
    cartItemsEl.querySelectorAll(".cart-qty button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-id"));
        const delta = Number(btn.getAttribute("data-delta"));
        const size = btn.getAttribute("data-size") || null;
        updateCartQty(id, size, delta);
      });
    });

    // Remove buttons
    cartItemsEl.querySelectorAll(".cart-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-id"));
        const size = btn.getAttribute("data-size") || null;
        removeFromCart(id, size);
      });
    });
  }

  const { subtotal, shipping, total } = getCartTotals();
  cartSubtotalEl.textContent = formatSAR(subtotal);
  cartTotalEl.textContent = formatSAR(total);
  cartCountEl.textContent = cart.reduce((sum, item) => sum + item.qty, 0);

  // Also update checkout summary
  renderOrderSummary();
}

// -----------------------------
// Cart drawer open/close
// -----------------------------
const cartDrawer = document.getElementById("cartDrawer");
const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const goToCheckoutBtn = document.getElementById("goToCheckoutBtn");

function openCart() {
  cartDrawer.classList.add("open");
}

function closeCart() {
  cartDrawer.classList.remove("open");
}

openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);

goToCheckoutBtn.addEventListener("click", () => {
  closeCart();
  showPage("checkout");
});

// -----------------------------
// Page navigation
// -----------------------------
const pages = {
  home: document.getElementById("page-home"),
  checkout: document.getElementById("page-checkout")
};

function showPage(name) {
  Object.keys(pages).forEach((key) => {
    if (key === name) {
      pages[key].classList.add("active");
      pages[key].style.display = "block";
    } else {
      pages[key].classList.remove("active");
      pages[key].style.display = "none";
    }
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const page = link.getAttribute("data-page");
    if (page) showPage(page);
  });
});

document.querySelectorAll("[data-page='checkout']").forEach((btn) => {
  btn.addEventListener("click", () => showPage("checkout"));
});

document.querySelectorAll("[data-scroll='products']").forEach((btn) => {
  btn.addEventListener("click", () => {
    const section = document.getElementById("productsSection");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// -----------------------------
// Checkout summary & order
// -----------------------------
const orderSummaryList = document.getElementById("orderSummaryList");
const orderTotalEl = document.getElementById("orderTotal");
const placeOrderBtn = document.getElementById("placeOrderBtn");
const successMessage = document.getElementById("successMessage");

function renderOrderSummary() {
  orderSummaryList.innerHTML = "";
  if (cart.length === 0) {
    orderSummaryList.innerHTML = `<div style="font-size:12px;color:#6b7280;">No items in cart. Go back to shop.</div>`;
  } else {
    cart.forEach((item) => {
      const row = document.createElement("div");
      row.className = "order-item";
      const sizeLabel = item.size ? ` (${item.size})` : "";
      row.innerHTML = `
        <span>${item.name}${sizeLabel} × ${item.qty}</span>
        <span>${formatSAR(item.price * item.qty)}</span>
      `;
      orderSummaryList.appendChild(row);
    });
  }

  const { total } = getCartTotals();
  orderTotalEl.textContent = formatSAR(total);
}

placeOrderBtn.addEventListener("click", () => {
  const fullName = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const city = document.getElementById("city").value.trim();
  const area = document.getElementById("area").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!fullName || !phone || !city || !area || !address) {
    alert("Please fill all required delivery details.");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before placing an order.");
    return;
  }
  // Payment handling
  const paymentMethod = document.querySelector('input[name="payment"]:checked') ? document.querySelector('input[name="payment"]:checked').value : 'cod';

  if (paymentMethod === 'card') {
    // validate card fields (basic checks only)
    const cardName = document.getElementById('cardName').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
    const cardExpiry = document.getElementById('cardExpiry').value.trim();
    const cardCvv = document.getElementById('cardCvv').value.trim();

    if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
      alert('Please fill all card details.');
      return;
    }

    // Very basic card number check
    if (!/^[0-9]{12,19}$/.test(cardNumber)) {
      alert('Please enter a valid card number.');
      return;
    }

    // expiry simple check MM/YY
    if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(cardExpiry)) {
      alert('Please enter expiry in MM/YY format.');
      return;
    }
    if (!/^[0-9]{3,4}$/.test(cardCvv)) {
      alert('Please enter a valid CVV.');
      return;
    }
  }

  // Build order object and persist
  const order = {
    id: 'ORD' + Date.now(),
    ts: Date.now(),
    customer: { fullName, phone, city, area, address, notes: document.getElementById('notes').value || '' },
    items: cart.slice(),
    totals: getCartTotals(),
    payment: paymentMethod,
    paymentInfo: {}
  };

  // store orders in localStorage (simple history)
  const ordersRaw = localStorage.getItem('zhan_orders');
  let orders = ordersRaw ? JSON.parse(ordersRaw) : [];
  orders.unshift(order);
  localStorage.setItem('zhan_orders', JSON.stringify(orders));

  // Show confirmation message with order id and payment instructions
  successMessage.innerHTML = paymentMethod === 'cod' ? `Thank you! Your order <strong>${order.id}</strong> has been placed. Please keep cash ready for Cash on Delivery.` : `Thank you! Your order <strong>${order.id}</strong> has been placed. Card payment was recorded (test mode).`;
  successMessage.style.display = 'block';

  // Clear cart after order
  cart = [];
  saveCart();
  renderCart();
  // If bank transfer, show extra instructions and save payment info
  if (paymentMethod === 'bank') {
    // attach bank details to stored order
    order.paymentInfo = {
      bank: 'Al Rajhi Bank',
      accountName: 'ZHAN Trading',
      iban: 'SA12 3456 7890 1234 5678 9012',
      reference: phone
    };
    // update stored orders
    const updatedOrders = localStorage.getItem('zhan_orders') ? JSON.parse(localStorage.getItem('zhan_orders')) : [];
    if (updatedOrders.length) {
      updatedOrders[0].paymentInfo = order.paymentInfo;
      localStorage.setItem('zhan_orders', JSON.stringify(updatedOrders));
    }
    successMessage.innerHTML += `<div style="margin-top:8px;font-size:13px;color:var(--text-main);">Bank transfer details have been saved with your order. Please transfer and then reply with the transfer reference to confirm.</div>`;
  }
});

// -----------------------------
// Init
// -----------------------------
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();

// Category dropdown functionality
const dropdownItems = document.querySelectorAll(".dropdown-item");
dropdownItems.forEach((item) => {
  item.addEventListener("click", function () {
    const page = this.dataset.page;
    if (page) {
      window.location.href = page;
    }
  });
});
renderCart();

// -----------------------------
// Interactive Map for Location Selection
// -----------------------------
let selectedLocation = null;
let mapInstance = null;
let markerInstance = null;

// Function to reverse geocode coordinates to address
async function getAddressFromCoordinates(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    return data.address;
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
}

function initializeMap() {
  const mapContainer = document.getElementById("mapContainer");
  if (!mapContainer) return;

  // Center on Saudi Arabia (Riyadh)
  const defaultLat = 24.7136;
  const defaultLng = 46.6753;

  mapInstance = L.map("mapContainer").setView([defaultLat, defaultLng], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(mapInstance);

  // Add click event to map
  mapInstance.on("click", async function (e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    selectedLocation = { lat, lng };

    // Remove old marker if exists
    if (markerInstance) {
      mapInstance.removeLayer(markerInstance);
    }

    // Add new marker
    markerInstance = L.marker([lat, lng])
      .addTo(mapInstance)
      .bindPopup(`<strong>Selected Location</strong><br>Lat: ${lat.toFixed(4)}<br>Lng: ${lng.toFixed(4)}`)
      .openPopup();

    // Update displayed coordinates
    document.getElementById("selectedLat").textContent = lat.toFixed(6);
    document.getElementById("selectedLng").textContent = lng.toFixed(6);

    // Store in hidden field for form submission if needed
    const locationInput = document.createElement("input");
    locationInput.type = "hidden";
    locationInput.id = "selectedLocation";
    locationInput.value = JSON.stringify(selectedLocation);

    const form = document.getElementById("checkoutForm");
    const existingInput = form.querySelector("#selectedLocation");
    if (existingInput) {
      existingInput.value = JSON.stringify(selectedLocation);
    } else {
      form.appendChild(locationInput);
    }

    // Reverse geocode to get address details
    const addressData = await getAddressFromCoordinates(lat, lng);
    
    if (addressData) {
      // Extract and fill address information
      const city = addressData.city || addressData.town || addressData.county || "";
      const area = addressData.suburb || addressData.neighbourhood || addressData.district || "";
      const road = addressData.road || addressData.street || "";
      const postcode = addressData.postcode || "";
      
      // Build address string
      const addressStr = [road, postcode].filter(Boolean).join(", ");

      // Fill form fields
      if (document.getElementById("city")) {
        document.getElementById("city").value = city;
      }
      if (document.getElementById("area")) {
        document.getElementById("area").value = area;
      }
      if (document.getElementById("address")) {
        document.getElementById("address").value = addressStr;
      }
    }
  });
}

// Initialize map when page loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeMap);
} else {
  initializeMap();
}

// toggle payment detail sections visibility
const paymentCodEl = document.getElementById('payment_cod');
const paymentCardEl = document.getElementById('payment_card');
const paymentBankEl = document.getElementById('payment_bank');
const cardDetailsEl = document.getElementById('cardDetails');
const bankDetailsEl = document.getElementById('bankDetails');
if (paymentCodEl && paymentCardEl && paymentBankEl && cardDetailsEl && bankDetailsEl) {
  const toggle = () => {
    if (paymentCodEl.checked) { cardDetailsEl.style.display = 'none'; bankDetailsEl.style.display = 'none'; }
    if (paymentCardEl.checked) { cardDetailsEl.style.display = 'block'; bankDetailsEl.style.display = 'none'; }
    if (paymentBankEl.checked) { cardDetailsEl.style.display = 'none'; bankDetailsEl.style.display = 'block'; }
  };
  paymentCodEl.addEventListener('change', toggle);
  paymentCardEl.addEventListener('change', toggle);
  paymentBankEl.addEventListener('change', toggle);
  // initialize
  toggle();
}