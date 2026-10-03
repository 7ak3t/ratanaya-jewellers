// RATNAYA JEWELLERS — Interactive Controller & Luxury E-Commerce Engine
document.addEventListener('DOMContentLoaded', () => {

  // =========================================================
  // 1. TOAST NOTIFICATION HELPER
  // =========================================================
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // =========================================================
  // 2. MOBILE MENU & HEADER ELEVATION
  // =========================================================
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // =========================================================
  // 3. CART (SHOPPING BAG) STATE & DRAWER
  // =========================================================
  const CART_STORAGE_KEY = 'ratnaya_cart_items_v2';
  const WHATSAPP_PHONE = '919876543210';

  function getCart() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to parse cart storage', e);
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart storage', e);
    }
    updateCartUI();
  }

  // Inject Cart Drawer DOM if not already present
  let cartOverlay = document.getElementById('cart-drawer-overlay');
  if (!cartOverlay) {
    cartOverlay = document.createElement('div');
    cartOverlay.id = 'cart-drawer-overlay';
    cartOverlay.className = 'cart-drawer-overlay';
    cartOverlay.innerHTML = `
      <aside class="cart-drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping Bag">
        <div class="cart-header">
          <div class="cart-header-title">
            <span>SHOPPING BAG</span>
            <span class="cart-items-total" id="cart-items-total">(0)</span>
          </div>
          <button class="cart-close-btn" id="cart-close-btn" aria-label="Close Shopping Bag">✕</button>
        </div>
        <div class="cart-trust-banner">
          <span>❖ COMPLIMENTARY INSURED DELIVERY &amp; LUXURY GIFT PACKAGING ❖</span>
        </div>
        <div class="cart-body" id="cart-items-container">
          <!-- Dynamic Cart Items -->
        </div>
        <div class="cart-footer" id="cart-footer">
          <div class="cart-summary-row">
            <span>Subtotal</span>
            <span class="cart-subtotal-price" id="cart-subtotal">₹ 0</span>
          </div>
          <p class="cart-tax-notice">Includes GST, Insured Express Shipping &amp; Certificate of Authenticity.</p>
          <div class="cart-actions">
            <button class="cart-checkout-btn" id="cart-checkout-btn">
              <span>PROCEED TO SECURE CHECKOUT</span>
              <span class="cart-checkout-arrow">→</span>
            </button>
            <a class="cart-whatsapp-btn" id="cart-whatsapp-btn" href="#" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.076-2.029-.474-1.637-.674-2.678-2.339-2.759-2.447-.081-.108-.659-.878-.659-1.673 0-.795.414-1.185.56-1.347.145-.162.316-.202.421-.202.106 0 .211.002.302.007.098.005.228-.037.357.273.131.316.446 1.09.485 1.17.039.081.066.176.013.281-.053.106-.079.172-.158.263-.079.091-.167.202-.238.272-.08.077-.162.161-.07.319.092.158.409.674.877 1.091.603.537 1.111.703 1.269.782.159.079.251.069.345-.039.093-.108.397-.463.503-.621.106-.158.211-.132.356-.079.145.053.924.436 1.082.515.158.079.263.118.302.184.039.066.039.382-.105.787z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.054 22l4.98-1.306A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.687 0-3.26-.523-4.57-1.42l-.328-.225-2.956.775.789-2.884-.216-.343A8.134 8.134 0 0 1 3.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z"/>
              </svg>
              <span>ORDER VIA WHATSAPP CONCIERGE</span>
            </a>
          </div>
          <div class="cart-security-badge">
            <span>🔒 100% Certified 18K/Platinum • BIS Hallmarked Guarantee</span>
          </div>
        </div>
      </aside>
    `;
    document.body.appendChild(cartOverlay);
  }

  const cartDrawer = document.getElementById('cart-drawer');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalElem = document.getElementById('cart-subtotal');
  const cartTotalCountElem = document.getElementById('cart-items-total');
  const cartCounterHeader = document.getElementById('cart-count');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartTriggerBtn = document.getElementById('cart-trigger');
  const cartCheckoutBtn = document.getElementById('cart-checkout-btn');
  const cartWhatsappBtn = document.getElementById('cart-whatsapp-btn');

  function openCart() {
    cartOverlay.classList.add('active');
    document.body.classList.add('cart-open');
    renderCart();
  }

  function closeCart() {
    cartOverlay.classList.remove('active');
    document.body.classList.remove('cart-open');
  }

  if (cartTriggerBtn) {
    cartTriggerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  }

  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) closeCart();
  });

  function updateCartUI() {
    const cart = getCart();
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

    if (cartCounterHeader) cartCounterHeader.textContent = String(totalItems);
    if (cartTotalCountElem) cartTotalCountElem.textContent = `(${totalItems})`;

    renderCart();
  }

  function renderCart() {
    const cart = getCart();
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <svg class="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <h3 class="cart-empty-title">Your Bag is Empty</h3>
          <p class="cart-empty-text">Explore our fine jewellery creations, heirloom cocktail rings, and signature diamond collections.</p>
          <button class="cart-empty-cta" id="cart-continue-shopping">EXPLORE JEWELLERY</button>
        </div>
      `;

      const emptyCta = document.getElementById('cart-continue-shopping');
      if (emptyCta) {
        emptyCta.addEventListener('click', () => {
          closeCart();
          window.location.href = 'category-rings.html';
        });
      }

      if (cartSubtotalElem) cartSubtotalElem.textContent = '₹ 0';
      if (cartCheckoutBtn) cartCheckoutBtn.disabled = true;
      if (cartWhatsappBtn) cartWhatsappBtn.style.display = 'none';
      return;
    }

    if (cartCheckoutBtn) cartCheckoutBtn.disabled = false;
    if (cartWhatsappBtn) cartWhatsappBtn.style.display = 'flex';

    let subtotal = 0;
    let html = '';

    cart.forEach(item => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;
      html += `
        <div class="cart-item" data-sku="${item.sku}">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <span class="cart-item-specs">${item.specs || 'Solid 18K Gold • Handcrafted'}</span>
            <span class="cart-item-price">₹ ${Number(item.price).toLocaleString('en-IN')}</span>
          </div>
          <div class="cart-item-actions">
            <div class="cart-qty-control">
              <button class="cart-qty-btn cart-qty-minus" data-sku="${item.sku}" aria-label="Decrease quantity">−</button>
              <span class="cart-qty-val">${item.qty}</span>
              <button class="cart-qty-btn cart-qty-plus" data-sku="${item.sku}" aria-label="Increase quantity">+</button>
            </div>
            <button class="cart-remove-btn" data-sku="${item.sku}">Remove</button>
          </div>
        </div>
      `;
    });

    cartItemsContainer.innerHTML = html;
    if (cartSubtotalElem) {
      cartSubtotalElem.textContent = `₹ ${Number(subtotal).toLocaleString('en-IN')}`;
    }

    // Attach event listeners to quantity and remove buttons
    cartItemsContainer.querySelectorAll('.cart-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const sku = btn.dataset.sku;
        changeItemQty(sku, -1);
      });
    });

    cartItemsContainer.querySelectorAll('.cart-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const sku = btn.dataset.sku;
        changeItemQty(sku, 1);
      });
    });

    cartItemsContainer.querySelectorAll('.cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sku = btn.dataset.sku;
        removeItem(sku);
      });
    });

    // Update WhatsApp link with order contents
    if (cartWhatsappBtn) {
      const orderLines = cart.map(i => `• ${i.qty}x ${i.name} (₹${Number(i.price * i.qty).toLocaleString('en-IN')})`).join('\n');
      const waMsg = `Hello RATNAYA JEWELLERS Concierge,\n\nI would like to place an order for the following items:\n${orderLines}\n\n*Total Amount: ₹${Number(subtotal).toLocaleString('en-IN')}*\n\nPlease confirm availability and delivery timelines.`;
      cartWhatsappBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMsg)}`;
    }
  }

  function addToCart(item, openDrawer = true) {
    const cart = getCart();
    const existingIndex = cart.findIndex(i => i.sku === item.sku || i.name === item.name);

    if (existingIndex > -1) {
      cart[existingIndex].qty += (item.qty || 1);
    } else {
      cart.push({
        sku: item.sku || `RAT-SKU-${Date.now()}`,
        name: item.name || 'Ratnaya Jewellery Piece',
        price: Number(item.price) || 0,
        image: item.image || 'assets/images/prod-cocktail-ring.jpg',
        specs: item.specs || 'Solid 18K Gold',
        qty: item.qty || 1
      });
    }

    saveCart(cart);
    showToast(`Added “${item.name}” to your Shopping Bag`);

    if (openDrawer) {
      setTimeout(() => {
        openCart();
      }, 200);
    }
  }

  function changeItemQty(sku, delta) {
    let cart = getCart();
    const itemIndex = cart.findIndex(i => i.sku === sku);
    if (itemIndex > -1) {
      cart[itemIndex].qty += delta;
      if (cart[itemIndex].qty <= 0) {
        cart.splice(itemIndex, 1);
      }
      saveCart(cart);
    }
  }

  function removeItem(sku) {
    let cart = getCart();
    cart = cart.filter(i => i.sku !== sku);
    saveCart(cart);
    showToast('Item removed from Shopping Bag');
  }

  // Checkout Button
  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', () => {
      const cart = getCart();
      if (cart.length === 0) return;
      // Trigger WhatsApp concierge checkout seamlessly
      if (cartWhatsappBtn) {
        cartWhatsappBtn.click();
      }
    });
  }

  // Initialize Cart counter on page load
  updateCartUI();

  // =========================================================
  // 4. PRODUCT ZOOM & HIGH-JEWELLERY LIGHTBOX MODAL
  // =========================================================
  let zoomModalOverlay = document.getElementById('zoom-modal-overlay');
  if (!zoomModalOverlay) {
    zoomModalOverlay = document.createElement('div');
    zoomModalOverlay.id = 'zoom-modal-overlay';
    zoomModalOverlay.className = 'zoom-modal-overlay';
    zoomModalOverlay.innerHTML = `
      <div class="zoom-modal" id="zoom-modal" role="dialog" aria-modal="true" aria-label="Product Zoom & Details">
        <button class="zoom-close-btn" id="zoom-close-btn" aria-label="Close Product View">✕</button>
        <div class="zoom-grid">
          <!-- Left: High-Res Image with Interactive Zoom Lens -->
          <div class="zoom-visual-pane">
            <div class="zoom-image-container" id="zoom-image-container">
              <img class="zoom-active-image" id="zoom-active-image" src="" alt="Ratnaya Jewellers Magnified View">
              <div class="zoom-hint" id="zoom-hint">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
                <span>Hover to magnify gemstone details</span>
              </div>
            </div>
            <div class="zoom-thumbnails" id="zoom-thumbnails">
              <!-- Alternate Angle Thumbnails -->
            </div>
          </div>

          <!-- Right: Narrative, Specifications & Purchasing -->
          <div class="zoom-detail-pane">
            <span class="zoom-tag" id="zoom-tag">HAUTE JOAILLERIE</span>
            <p class="zoom-category" id="zoom-category">FINE JEWELLERY</p>
            <h2 class="zoom-title" id="zoom-title">The Sovereign Cocktail Ring</h2>
            <div class="zoom-price" id="zoom-price">₹ 64,500</div>
            <p class="zoom-specs" id="zoom-specs">Handcrafted in solid 18K gold with certified precious stones.</p>

            <div class="zoom-features-list">
              <div class="zoom-feat-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>100% Certified Natural Gemstones • BIS Hallmarked 18K Gold</span>
              </div>
              <div class="zoom-feat-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <span>Complimentary Insured Express Delivery across India</span>
              </div>
              <div class="zoom-feat-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Includes Ratnaya Emerald Velvet Presentation Casket</span>
              </div>
            </div>

            <div class="zoom-qty-row">
              <label for="zoom-qty-val">Quantity</label>
              <div class="zoom-qty-picker">
                <button class="zoom-qty-btn" id="zoom-qty-minus" aria-label="Decrease quantity">−</button>
                <span class="zoom-qty-value" id="zoom-qty-val">1</span>
                <button class="zoom-qty-btn" id="zoom-qty-plus" aria-label="Increase quantity">+</button>
              </div>
            </div>

            <div class="zoom-cta-group">
              <button class="zoom-add-btn" id="zoom-add-to-bag">
                <span>ADD TO SHOPPING BAG</span>
              </button>
              <a class="zoom-enquire-whatsapp" id="zoom-whatsapp-link" href="#" target="_blank" rel="noopener">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.076-2.029-.474-1.637-.674-2.678-2.339-2.759-2.447-.081-.108-.659-.878-.659-1.673 0-.795.414-1.185.56-1.347.145-.162.316-.202.421-.202.106 0 .211.002.302.007.098.005.228-.037.357.273.131.316.446 1.09.485 1.17.039.081.066.176.013.281-.053.106-.079.172-.158.263-.079.091-.167.202-.238.272-.08.077-.162.161-.07.319.092.158.409.674.877 1.091.603.537 1.111.703 1.269.782.159.079.251.069.345-.039.093-.108.397-.463.503-.621.106-.158.211-.132.356-.079.145.053.924.436 1.082.515.158.079.263.118.302.184.039.066.039.382-.105.787z"/>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.054 22l4.98-1.306A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.687 0-3.26-.523-4.57-1.42l-.328-.225-2.956.775.789-2.884-.216-.343A8.134 8.134 0 0 1 3.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z"/>
                </svg>
                <span>ENQUIRE WITH CONCIERGE (WHATSAPP)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(zoomModalOverlay);
  }

  const zoomModal = document.getElementById('zoom-modal');
  const zoomCloseBtn = document.getElementById('zoom-close-btn');
  const zoomImgContainer = document.getElementById('zoom-image-container');
  const zoomActiveImg = document.getElementById('zoom-active-image');
  const zoomThumbnails = document.getElementById('zoom-thumbnails');
  const zoomTagElem = document.getElementById('zoom-tag');
  const zoomCategoryElem = document.getElementById('zoom-category');
  const zoomTitleElem = document.getElementById('zoom-title');
  const zoomPriceElem = document.getElementById('zoom-price');
  const zoomSpecsElem = document.getElementById('zoom-specs');
  const zoomQtyVal = document.getElementById('zoom-qty-val');
  const zoomQtyMinus = document.getElementById('zoom-qty-minus');
  const zoomQtyPlus = document.getElementById('zoom-qty-plus');
  const zoomAddToBagBtn = document.getElementById('zoom-add-to-bag');
  const zoomWhatsappLink = document.getElementById('zoom-whatsapp-link');

  let currentZoomProduct = null;
  let currentZoomQty = 1;

  function closeZoomModal() {
    zoomModalOverlay.classList.remove('active');
    document.body.classList.remove('zoom-open');
    if (zoomImgContainer) zoomImgContainer.classList.remove('is-zoomed');
  }

  if (zoomCloseBtn) zoomCloseBtn.addEventListener('click', closeZoomModal);
  zoomModalOverlay.addEventListener('click', (e) => {
    if (e.target === zoomModalOverlay) closeZoomModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeZoomModal();
      closeCart();
    }
  });

  // Quantity controls in Zoom Modal
  if (zoomQtyMinus) {
    zoomQtyMinus.addEventListener('click', () => {
      currentZoomQty = Math.max(1, currentZoomQty - 1);
      if (zoomQtyVal) zoomQtyVal.textContent = String(currentZoomQty);
    });
  }
  if (zoomQtyPlus) {
    zoomQtyPlus.addEventListener('click', () => {
      currentZoomQty++;
      if (zoomQtyVal) zoomQtyVal.textContent = String(currentZoomQty);
    });
  }

  // Add To Bag from Zoom Modal
  if (zoomAddToBagBtn) {
    zoomAddToBagBtn.addEventListener('click', () => {
      if (!currentZoomProduct) return;
      addToCart({
        ...currentZoomProduct,
        qty: currentZoomQty
      }, true);
      closeZoomModal();
    });
  }

  // Interactive Cursor Magnifier
  if (zoomImgContainer && zoomActiveImg) {
    zoomImgContainer.addEventListener('mouseenter', () => {
      zoomImgContainer.classList.add('is-zoomed');
    });

    zoomImgContainer.addEventListener('mousemove', (e) => {
      const rect = zoomImgContainer.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      zoomActiveImg.style.transformOrigin = `${x}% ${y}%`;
    });

    zoomImgContainer.addEventListener('mouseleave', () => {
      zoomImgContainer.classList.remove('is-zoomed');
      zoomActiveImg.style.transformOrigin = 'center center';
    });

    // Touch support for mobile pinch/tap
    zoomImgContainer.addEventListener('click', () => {
      zoomImgContainer.classList.toggle('is-zoomed');
    });
  }

  function openZoomModal(productData) {
    currentZoomProduct = productData;
    currentZoomQty = 1;
    if (zoomQtyVal) zoomQtyVal.textContent = '1';

    // Populate Details
    if (zoomTitleElem) zoomTitleElem.textContent = productData.name;
    if (zoomPriceElem) zoomPriceElem.textContent = `₹ ${Number(productData.price).toLocaleString('en-IN')}`;
    if (zoomCategoryElem) zoomCategoryElem.textContent = productData.category || 'FINE JEWELLERY';
    if (zoomSpecsElem) zoomSpecsElem.textContent = productData.specs || 'Handcrafted in solid 18K gold with certified gemstones.';
    
    if (zoomTagElem) {
      if (productData.tag) {
        zoomTagElem.style.display = 'inline-block';
        zoomTagElem.textContent = productData.tag;
      } else {
        zoomTagElem.style.display = 'none';
      }
    }

    // Set Main Image
    const images = productData.images && productData.images.length > 0 ? productData.images : [productData.image];
    if (zoomActiveImg) {
      zoomActiveImg.src = images[0];
      zoomActiveImg.alt = productData.name;
    }

    // Thumbnails
    if (zoomThumbnails) {
      if (images.length > 1) {
        zoomThumbnails.innerHTML = images.map((imgSrc, idx) => `
          <button class="zoom-thumb ${idx === 0 ? 'active' : ''}" data-src="${imgSrc}" aria-label="View Angle ${idx + 1}">
            <img src="${imgSrc}" alt="${productData.name} angle ${idx + 1}" loading="lazy">
          </button>
        `).join('');

        zoomThumbnails.querySelectorAll('.zoom-thumb').forEach(thumb => {
          thumb.addEventListener('click', () => {
            zoomThumbnails.querySelectorAll('.zoom-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            if (zoomActiveImg) zoomActiveImg.src = thumb.dataset.src;
          });
        });
      } else {
        zoomThumbnails.innerHTML = '';
      }
    }

    // WhatsApp Direct Inquiry
    if (zoomWhatsappLink) {
      const waMsg = `Hello RATNAYA JEWELLERS Concierge,\n\nI am admiring *${productData.name}* (Price: ₹${Number(productData.price).toLocaleString('en-IN')}).\n\nCould you please share more details, gold certification, and custom sizing options?`;
      zoomWhatsappLink.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMsg)}`;
    }

    zoomModalOverlay.classList.add('active');
    document.body.classList.add('zoom-open');
  }

  // =========================================================
  // 5. ATTACH LISTENERS TO ALL PRODUCT CARDS ACROSS SITE
  // =========================================================
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    // Quick Add To Bag button inside card
    const quickAddBtn = card.querySelector('.quick-add-btn');
    if (quickAddBtn) {
      quickAddBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const name = card.dataset.name || card.querySelector('.product-name')?.textContent?.trim() || 'Jewellery Piece';
        const price = Number(card.dataset.price) || 0;
        const sku = card.dataset.sku || `RAT-${Date.now()}`;
        const specs = card.querySelector('.product-specs')?.textContent?.trim() || '';
        const image = card.querySelector('.img-primary, .product-image img')?.getAttribute('src') || '';

        // Button animation
        const originalText = quickAddBtn.textContent;
        quickAddBtn.textContent = 'Added ✓';
        quickAddBtn.style.background = 'var(--emerald)';
        quickAddBtn.style.color = '#FFFFFF';

        addToCart({ sku, name, price, specs, image, qty: 1 }, true);

        setTimeout(() => {
          quickAddBtn.textContent = originalText;
          quickAddBtn.style.background = '';
          quickAddBtn.style.color = '';
        }, 1600);
      });
    }

    // Wishlist button inside card
    const wishlistBtn = card.querySelector('.wishlist-btn');
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const productName = card.dataset.name || card.querySelector('.product-name')?.textContent?.trim() || 'Item';
        const isActive = wishlistBtn.classList.toggle('active');
        const wishlistCounter = document.getElementById('wishlist-count');
        let currentCount = Number(wishlistCounter?.textContent || '0');

        if (isActive) {
          currentCount++;
          showToast(`Saved “${productName}” to your Wishlist`);
        } else {
          currentCount = Math.max(0, currentCount - 1);
          showToast(`Removed “${productName}” from your Wishlist`);
        }

        if (wishlistCounter) wishlistCounter.textContent = String(currentCount);
      });
    }

    // Clicking anywhere on the card (image, name, card body) opens the Zoom Modal!
    card.addEventListener('click', (e) => {
      // Ignore if user clicked wishlist button or quick add button
      if (e.target.closest('.wishlist-btn') || e.target.closest('.quick-add-btn')) {
        return;
      }

      const name = card.dataset.name || card.querySelector('.product-name')?.textContent?.trim() || 'Signature Creation';
      const price = Number(card.dataset.price) || 0;
      const sku = card.dataset.sku || `RAT-${Date.now()}`;
      const specs = card.querySelector('.product-specs')?.textContent?.trim() || '';
      const category = card.querySelector('.product-category-label')?.textContent?.trim() || 'FINE JEWELLERY';
      const tag = card.querySelector('.product-tag')?.textContent?.trim() || '';

      // Collect all images (primary + hover angle view if available)
      const images = [];
      const primaryImg = card.querySelector('.img-primary, .product-image img');
      const hoverImg = card.querySelector('.img-hover');

      if (primaryImg && primaryImg.getAttribute('src')) {
        images.push(primaryImg.getAttribute('src'));
      }
      if (hoverImg && hoverImg.getAttribute('src') && hoverImg.getAttribute('src') !== images[0]) {
        images.push(hoverImg.getAttribute('src'));
      }

      openZoomModal({
        sku,
        name,
        price,
        specs,
        category,
        tag,
        image: images[0] || 'assets/images/prod-cocktail-ring.jpg',
        images
      });
    });
  });

  // =========================================================
  // 6. SEARCH & NEWSLETTER INTERACTIONS
  // =========================================================
  const searchTrigger = document.getElementById('search-trigger');
  if (searchTrigger) {
    searchTrigger.addEventListener('click', () => {
      const term = prompt('Search RATNAYA JEWELLERS (e.g. Sapphire, Lotus, Emerald, Solitaire, Rings):');
      if (term && term.trim()) {
        const query = term.trim().toLowerCase();
        showToast(`Searching collections for “${term.trim()}”...`);
        // Navigate or highlight matching products
        if (query.includes('ring')) {
          window.location.href = 'category-rings.html';
        } else if (query.includes('earring')) {
          window.location.href = 'category-earrings.html';
        } else if (query.includes('necklace')) {
          window.location.href = 'category-necklaces.html';
        } else if (query.includes('bracelet')) {
          window.location.href = 'category-bracelets.html';
        } else if (query.includes('mangalsutra')) {
          window.location.href = 'category-mangalsutras.html';
        } else {
          // If searching on a page, filter matching cards
          const matchedCards = Array.from(productCards).filter(c => 
            (c.dataset.name || '').toLowerCase().includes(query) ||
            (c.textContent || '').toLowerCase().includes(query)
          );
          if (matchedCards.length > 0) {
            matchedCards[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            matchedCards[0].style.outline = '2px solid var(--forest)';
            setTimeout(() => { matchedCards[0].style.outline = ''; }, 2500);
          }
        }
      }
    });
  }

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        input.value = '';
        showToast(`Thank you for joining. Welcome to RATNAYA JEWELLERS.`);
      }
    });
  }
});