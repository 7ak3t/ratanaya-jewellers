// RATNAYA JEWELLERS — Interactive Controller & Luxury E-Commerce Engine
(function () {
  'use strict';

  const CART_STORAGE_KEY = 'ratnaya_cart_items_v3';
  const WHATSAPP_PHONE = '919876543210';

  // --- Cart Helpers ---
  function getCart() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to read cart', e);
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to write cart', e);
    }
    updateCartUI();
  }

  function showToast(message) {
    let toast = document.getElementById('toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notice';
      toast.className = 'toast-notice';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    if (window._toastTimer) clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --- Cart Drawer Injection & Controls ---
  function ensureCartDOM() {
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
            <span>❖ COMPLIMENTARY INSURED EXPRESS DELIVERY &amp; LUXURY GIFT CASKET ❖</span>
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

      const closeBtn = document.getElementById('cart-close-btn');
      if (closeBtn) closeBtn.addEventListener('click', closeCart);
      cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) closeCart();
      });

      const checkoutBtn = document.getElementById('cart-checkout-btn');
      if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
          const waBtn = document.getElementById('cart-whatsapp-btn');
          if (waBtn) waBtn.click();
        });
      }
    }
  }

  function openCart() {
    ensureCartDOM();
    const overlay = document.getElementById('cart-drawer-overlay');
    if (overlay) {
      overlay.classList.add('active');
      document.body.classList.add('cart-open');
    }
    renderCart();
  }

  function closeCart() {
    const overlay = document.getElementById('cart-drawer-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.classList.remove('cart-open');
    }
  }

  function updateCartUI() {
    const cart = getCart();
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

    const cartCounterHeader = document.getElementById('cart-count');
    const cartTotalCountElem = document.getElementById('cart-items-total');

    if (cartCounterHeader) cartCounterHeader.textContent = String(totalItems);
    if (cartTotalCountElem) cartTotalCountElem.textContent = `(${totalItems})`;

    renderCart();
  }

  function renderCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotalElem = document.getElementById('cart-subtotal');
    const cartCheckoutBtn = document.getElementById('cart-checkout-btn');
    const cartWhatsappBtn = document.getElementById('cart-whatsapp-btn');

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
          window.location.href = 'category-earrings.html';
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

    // Attach listeners
    cartItemsContainer.querySelectorAll('.cart-qty-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        changeItemQty(btn.dataset.sku, -1);
      });
    });

    cartItemsContainer.querySelectorAll('.cart-qty-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        changeItemQty(btn.dataset.sku, 1);
      });
    });

    cartItemsContainer.querySelectorAll('.cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeItem(btn.dataset.sku);
      });
    });

    if (cartWhatsappBtn) {
      const orderLines = cart.map(i => `• ${i.qty}x ${i.name} (₹${Number(i.price * i.qty).toLocaleString('en-IN')})`).join('\n');
      const waMsg = `Hello RATNAYA JEWELLERS Concierge,\n\nI would like to place an order for the following items:\n${orderLines}\n\n*Total Amount: ₹${Number(subtotal).toLocaleString('en-IN')}*\n\nPlease confirm availability and delivery timelines.`;
      cartWhatsappBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMsg)}`;
    }
  }

  function addToCart(item, openDrawer = true) {
    ensureCartDOM();
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
      }, 150);
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

  // --- Product Card Click Initializer ---
  function initProductCards(container = document) {
    const cards = container.querySelectorAll('.product-card');

    cards.forEach(card => {
      // Avoid duplicate bindings
      if (card.dataset.initialized) return;
      card.dataset.initialized = 'true';

      const sku = card.dataset.sku;

      // Quick Add To Bag button
      const quickAddBtn = card.querySelector('.quick-add-btn');
      if (quickAddBtn) {
        quickAddBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          const name = card.dataset.name || card.querySelector('.product-name')?.textContent?.trim() || 'Jewellery Piece';
          const price = Number(card.dataset.price) || 0;
          const cardSku = card.dataset.sku || `RAT-${Date.now()}`;
          const specs = card.querySelector('.product-specs')?.textContent?.trim() || '';
          const image = card.querySelector('.img-primary, .product-image img')?.getAttribute('src') || '';

          const originalText = quickAddBtn.textContent;
          quickAddBtn.textContent = 'Added ✓';
          quickAddBtn.style.background = 'var(--emerald)';
          quickAddBtn.style.color = '#FFFFFF';

          addToCart({ sku: cardSku, name, price, specs, image, qty: 1 }, true);

          setTimeout(() => {
            quickAddBtn.textContent = originalText;
            quickAddBtn.style.background = '';
            quickAddBtn.style.color = '';
          }, 1600);
        });
      }

      // Wishlist button
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

      // CLICKING ON THE PRODUCT CARD OPENS THE PRODUCT DETAIL PAGE!
      card.addEventListener('click', (e) => {
        if (e.target.closest('.wishlist-btn') || e.target.closest('.quick-add-btn')) {
          return;
        }

        if (sku) {
          window.location.href = `product.html?sku=${encodeURIComponent(sku)}`;
        }
      });
    });
  }

  // --- Main Initializer on DOM Ready ---
  document.addEventListener('DOMContentLoaded', () => {
    ensureCartDOM();
    updateCartUI();

    // 1. Mobile Menu Toggle
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

    // 2. Sticky Header Elevation
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

    // 3. Header Cart Trigger Button
    const cartTriggerBtn = document.getElementById('cart-trigger');
    if (cartTriggerBtn) {
      cartTriggerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
      });
    }

    // 4. Escape Key Closes Cart
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCart();
      }
    });

    // 5. Initialize Product Cards
    initProductCards(document);

    // 6. Luxury Search Modal
    initSearchModal();

    // 7. Floating WhatsApp Concierge Widget (Bottom-Right)
    initFloatingWhatsAppWidget();

    // 8. Size Guide Modal
    initSizeGuideModal();

    // 9. Video Consultation Modal
    initVideoConsultModal();

    // 10. Newsletter Form
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

  // --- 1. FLOATING WHATSAPP CONCIERGE WIDGET ---
  function initFloatingWhatsAppWidget() {
    if (document.getElementById('ratnaya-wa-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'ratnaya-wa-widget';
    widget.className = 'ratnaya-wa-widget';
    widget.innerHTML = `
      <!-- Popover Concierge Card -->
      <div class="ratnaya-wa-popover" id="ratnaya-wa-popover" role="dialog" aria-modal="true" aria-label="WhatsApp Jewellery Concierge">
        <div class="wa-popover-header">
          <div class="wa-popover-brand">
            <div class="wa-avatar-ring">
              <span>R</span>
              <span class="wa-pulse-dot" style="top:0;right:0;"></span>
            </div>
            <div class="wa-brand-text">
              <strong>RATNAYA CONCIERGE</strong>
              <small>Online • Certified Gemologist</small>
            </div>
          </div>
          <button class="wa-popover-close" id="wa-popover-close" aria-label="Close Concierge">✕</button>
        </div>

        <div class="wa-popover-body">
          <div class="wa-msg-bubble">
            <p><strong>Namaste!</strong> Welcome to Ratnaya Jewellers.</p>
            <p>How may our master atelier assist your fine jewellery selection today?</p>
            <span class="wa-msg-time">Just now • Atelier Mumbai</span>
          </div>

          <p class="wa-quick-options-label">Quick Assistance</p>
          <div class="wa-quick-options">
            <button class="wa-chip" data-msg="Namaste! I would like to inquire about bespoke jewellery customization and bridal sets.">
              <span>💎</span> <span>Bespoke Design Enquiry</span>
            </button>
            <button class="wa-chip" data-msg="Hello Ratnaya team, please share verification for BIS 750 Hallmarking and natural gemstone certificates.">
              <span>✨</span> <span>Check Hallmarking &amp; Certs</span>
            </button>
            <button class="wa-chip" data-msg="Hello! Can you help check express delivery timeline and insured shipping to my pincode?">
              <span>📦</span> <span>Insured Delivery &amp; Pincode</span>
            </button>
            <button class="wa-chip" data-msg="Hi! I would like to schedule a private Video Showing with a gemologist to view pieces live.">
              <span>📹</span> <span>Book Virtual Video Showing</span>
            </button>
          </div>
        </div>

        <div class="wa-popover-footer">
          <form class="wa-input-form" id="wa-input-form">
            <input type="text" id="wa-custom-msg" placeholder="Ask about designs, pricing, sizing..." autocomplete="off">
            <button type="submit" class="wa-send-btn" id="wa-send-btn" aria-label="Send WhatsApp message">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
          <a class="wa-direct-chat-btn" id="wa-direct-chat-btn" href="https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Namaste! I am exploring Ratnaya Jewellers and would like assistance.')}" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.076-2.029-.474-1.637-.674-2.678-2.339-2.759-2.447-.081-.108-.659-.878-.659-1.673 0-.795.414-1.185.56-1.347.145-.162.316-.202.421-.202.106 0 .211.002.302.007.098.005.228-.037.357.273.131.316.446 1.09.485 1.17.039.081.066.176.013.281-.053.106-.079.172-.158.263-.079.091-.167.202-.238.272-.08.077-.162.161-.07.319.092.158.409.674.877 1.091.603.537 1.111.703 1.269.782.159.079.251.069.345-.039.093-.108.397-.463.503-.621.106-.158.211-.132.356-.079.145.053.924.436 1.082.515.158.079.263.118.302.184.039.066.039.382-.105.787z"/>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.054 22l4.98-1.306A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.687 0-3.26-.523-4.57-1.42l-.328-.225-2.956.775.789-2.884-.216-.343A8.134 8.134 0 0 1 3.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z"/>
            </svg>
            <span>Direct Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      <!-- Trigger Button in Bottom-Right -->
      <button class="ratnaya-wa-trigger" id="ratnaya-wa-trigger" aria-label="Open WhatsApp Concierge" aria-expanded="false">
        <div class="wa-trigger-icon-wrap">
          <svg viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.076-2.029-.474-1.637-.674-2.678-2.339-2.759-2.447-.081-.108-.659-.878-.659-1.673 0-.795.414-1.185.56-1.347.145-.162.316-.202.421-.202.106 0 .211.002.302.007.098.005.228-.037.357.273.131.316.446 1.09.485 1.17.039.081.066.176.013.281-.053.106-.079.172-.158.263-.079.091-.167.202-.238.272-.08.077-.162.161-.07.319.092.158.409.674.877 1.091.603.537 1.111.703 1.269.782.159.079.251.069.345-.039.093-.108.397-.463.503-.621.106-.158.211-.132.356-.079.145.053.924.436 1.082.515.158.079.263.118.302.184.039.066.039.382-.105.787z"/>
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.054 22l4.98-1.306A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.687 0-3.26-.523-4.57-1.42l-.328-.225-2.956.775.789-2.884-.216-.343A8.134 8.134 0 0 1 3.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z"/>
          </svg>
          <span class="wa-pulse-dot"></span>
        </div>
        <div class="wa-trigger-label-group">
          <span class="wa-trigger-title">Concierge</span>
          <span class="wa-trigger-sub">Chat on WhatsApp</span>
        </div>
      </button>
    `;
    document.body.appendChild(widget);

    const trigger = document.getElementById('ratnaya-wa-trigger');
    const popover = document.getElementById('ratnaya-wa-popover');
    const closeBtn = document.getElementById('wa-popover-close');
    const chips = popover.querySelectorAll('.wa-chip');
    const inputForm = document.getElementById('wa-input-form');
    const inputField = document.getElementById('wa-custom-msg');

    function togglePopover(show) {
      const willOpen = typeof show === 'boolean' ? show : !popover.classList.contains('open');
      if (willOpen) {
        popover.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        popover.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    }

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePopover();
    });

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePopover(false);
    });

    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const msg = chip.getAttribute('data-msg') || 'Namaste! I need assistance.';
        window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
        togglePopover(false);
      });
    });

    if (inputForm) {
      inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = inputField.value.trim();
        if (text) {
          const finalMsg = `Namaste Ratnaya Concierge, ${text}`;
          window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(finalMsg)}`, '_blank');
          inputField.value = '';
          togglePopover(false);
        }
      });
    }

    document.addEventListener('click', (e) => {
      if (!widget.contains(e.target)) {
        togglePopover(false);
      }
    });
  }

  // --- 2. LUXURY LIVE SEARCH OVERLAY ---
  function initSearchModal() {
    let overlay = document.getElementById('ratnaya-search-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'ratnaya-search-modal-overlay';
      overlay.className = 'ratnaya-search-modal-overlay';
      overlay.innerHTML = `
        <div class="ratnaya-search-card" role="dialog" aria-modal="true" aria-label="Search Fine Jewellery">
          <div class="search-input-header">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" class="search-main-input" id="search-main-input" placeholder="Search creations by gemstone, style, collection..." autocomplete="off">
            <button class="search-close-btn" id="search-close-btn" aria-label="Close Search">✕</button>
          </div>
          <div class="search-suggestions-panel">
            <div class="search-chips-row">
              <span class="search-chip-tag" data-tag="Emerald">Emerald Studs</span>
              <span class="search-chip-tag" data-tag="Solitaire">Solitaires &amp; Rings</span>
              <span class="search-chip-tag" data-tag="Mangalsutra">Modern Mangalsutras</span>
              <span class="search-chip-tag" data-tag="Bangle">Bracelets &amp; Kadas</span>
              <span class="search-chip-tag" data-tag="Drop">Necklaces &amp; Drops</span>
            </div>
            <div class="search-results-list" id="search-results-list">
              <!-- Dynamically populated -->
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      const closeBtn = document.getElementById('search-close-btn');
      const input = document.getElementById('search-main-input');
      const resultsList = document.getElementById('search-results-list');
      const chipTags = overlay.querySelectorAll('.search-chip-tag');

      function closeSearch() {
        overlay.classList.remove('open');
      }

      function openSearch() {
        overlay.classList.add('open');
        input.value = '';
        renderResults('');
        setTimeout(() => input.focus(), 100);
      }

      function renderResults(q) {
        const catalog = window.RATNAYA_CATALOG || [];
        const query = q.trim().toLowerCase();
        let matches = [];

        if (!query) {
          // Default popular suggestions
          matches = catalog.slice(0, 4);
        } else {
          matches = catalog.filter(p => {
            return (
              p.title.toLowerCase().includes(query) ||
              p.category.toLowerCase().includes(query) ||
              p.stone.toLowerCase().includes(query) ||
              p.description.toLowerCase().includes(query)
            );
          });
        }

        if (matches.length === 0) {
          resultsList.innerHTML = `
            <div style="text-align: center; padding: 24px; color: var(--muted); font-size: 13px;">
              No matching creations found for “${q}”.<br>Our bespoke atelier can handcraft custom designs for you.
              <br><br>
              <a href="https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hi! I am searching for: ' + q)}" target="_blank" style="color: var(--forest); font-weight: 600; text-decoration: underline;">
                Ask Atelier Concierge on WhatsApp →
              </a>
            </div>
          `;
          return;
        }

        resultsList.innerHTML = matches.slice(0, 6).map(p => `
          <a class="search-result-item" href="product.html?sku=${p.sku}">
            <img class="search-item-thumb" src="${p.image}" alt="${p.title}" loading="lazy">
            <div class="search-item-info">
              <strong>${p.title}</strong>
              <small>${p.stone} • ${p.purity}</small>
            </div>
            <span class="search-item-price">₹ ${p.price.toLocaleString('en-IN')}</span>
          </a>
        `).join('');
      }

      input.addEventListener('input', (e) => {
        renderResults(e.target.value);
      });

      chipTags.forEach(chip => {
        chip.addEventListener('click', () => {
          const tag = chip.getAttribute('data-tag');
          input.value = tag;
          renderResults(tag);
        });
      });

      closeBtn.addEventListener('click', closeSearch);
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeSearch();
      });

      const searchTrigger = document.getElementById('search-trigger');
      if (searchTrigger) {
        searchTrigger.addEventListener('click', (e) => {
          e.preventDefault();
          openSearch();
        });
      }
    }
  }

  // --- 3. RING & BANGLE SIZE GUIDE MODAL ---
  function initSizeGuideModal() {
    let overlay = document.getElementById('size-guide-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'size-guide-overlay';
      overlay.className = 'size-guide-overlay';
      overlay.innerHTML = `
        <div class="size-guide-card" role="dialog" aria-modal="true" aria-label="Jewellery Sizing Guide">
          <div class="size-guide-header">
            <h3>RATNAYA SIZING GUIDE</h3>
            <button class="wa-popover-close" id="size-guide-close" aria-label="Close size guide">✕</button>
          </div>
          <div class="size-guide-tabs">
            <button class="size-tab-btn active" id="tab-ring-btn">Ring Sizing (Indian Standard)</button>
            <button class="size-tab-btn" id="tab-bangle-btn">Bangles &amp; Bracelets</button>
          </div>
          <div class="size-guide-body" id="size-guide-body">
            <!-- Ring table default -->
            <table class="size-guide-table" id="ring-size-table">
              <thead>
                <tr>
                  <th>Indian Size</th>
                  <th>Inner Diameter (mm)</th>
                  <th>Circumference (mm)</th>
                  <th>US / EU Approx</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Size 8</td><td>15.3 mm</td><td>48.0 mm</td><td>US 4.5 / EU 48</td></tr>
                <tr><td>Size 10</td><td>15.9 mm</td><td>50.0 mm</td><td>US 5.5 / EU 50</td></tr>
                <tr><td>Size 12</td><td>16.5 mm</td><td>51.8 mm</td><td>US 6.0 / EU 52</td></tr>
                <tr><td>Size 14 (Standard)</td><td>17.2 mm</td><td>54.0 mm</td><td>US 7.0 / EU 54</td></tr>
                <tr><td>Size 16</td><td>17.8 mm</td><td>55.9 mm</td><td>US 7.5 / EU 56</td></tr>
                <tr><td>Size 18</td><td>18.5 mm</td><td>58.1 mm</td><td>US 8.5 / EU 58</td></tr>
                <tr><td>Size 20</td><td>19.1 mm</td><td>60.0 mm</td><td>US 9.5 / EU 60</td></tr>
                <tr><td>Size 22</td><td>19.8 mm</td><td>62.2 mm</td><td>US 10.5 / EU 62</td></tr>
              </tbody>
            </table>

            <table class="size-guide-table" id="bangle-size-table" style="display:none;">
              <thead>
                <tr>
                  <th>Bangle Size</th>
                  <th>Inner Diameter (Inches)</th>
                  <th>Inner Diameter (mm)</th>
                  <th>Wrist Circumference</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>2-2 (Small)</td><td>2.125 in</td><td>54.0 mm</td><td>6.7 in (170 mm)</td></tr>
                <tr><td>2-4 (Medium)</td><td>2.25 in</td><td>57.2 mm</td><td>7.1 in (180 mm)</td></tr>
                <tr><td>2-6 (Standard)</td><td>2.375 in</td><td>60.3 mm</td><td>7.5 in (190 mm)</td></tr>
                <tr><td>2-8 (Large)</td><td>2.50 in</td><td>63.5 mm</td><td>7.9 in (200 mm)</td></tr>
              </tbody>
            </table>
          </div>
          <div style="padding: 14px 24px; background: var(--ivory); border-top: 1px solid var(--border-light); font-size: 12px; display: flex; justify-content: space-between; align-items: center;">
            <span style="color: var(--muted);">Unsure of your size? Our master atelier offers complimentary sizing.</span>
            <a href="https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hello, I need assistance measuring my ring/bangle size.')}" target="_blank" style="color: var(--forest); font-weight: 700; text-decoration: underline;">
              Ask Concierge →
            </a>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      const closeBtn = document.getElementById('size-guide-close');
      const tabRing = document.getElementById('tab-ring-btn');
      const tabBangle = document.getElementById('tab-bangle-btn');
      const ringTable = document.getElementById('ring-size-table');
      const bangleTable = document.getElementById('bangle-size-table');

      function closeSizeGuide() {
        overlay.classList.remove('open');
      }

      closeBtn.addEventListener('click', closeSizeGuide);
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeSizeGuide();
      });

      tabRing.addEventListener('click', () => {
        tabRing.classList.add('active');
        tabBangle.classList.remove('active');
        ringTable.style.display = 'table';
        bangleTable.style.display = 'none';
      });

      tabBangle.addEventListener('click', () => {
        tabBangle.classList.add('active');
        tabRing.classList.remove('active');
        bangleTable.style.display = 'table';
        ringTable.style.display = 'none';
      });

      // Hook up any size guide link on the page
      document.querySelectorAll('[data-open-size-guide], a[href*="size"]').forEach(el => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          overlay.classList.add('open');
        });
      });
    }
  }

  // --- 4. VIRTUAL VIDEO CONSULTATION MODAL ---
  function initVideoConsultModal() {
    let overlay = document.getElementById('video-consult-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'video-consult-overlay';
      overlay.className = 'video-consult-overlay';
      overlay.innerHTML = `
        <div class="video-consult-card" role="dialog" aria-modal="true" aria-label="Book Virtual Video Showing">
          <div class="video-consult-header">
            <h3>BOOK A VIRTUAL SHOWING</h3>
            <button class="wa-popover-close" id="video-consult-close" aria-label="Close appointment modal">✕</button>
          </div>
          <div class="video-consult-body">
            <p>Experience Ratnaya creations live over a private 1-on-1 video call with our certified gemologists in Mumbai. Inspect sparkle, scale, and craftsmanship from home.</p>
            <form id="video-consult-form">
              <div class="video-form-group">
                <label for="vc-name">Your Full Name</label>
                <input type="text" id="vc-name" required placeholder="e.g. Radhika Sharma">
              </div>
              <div class="video-form-group">
                <label for="vc-phone">WhatsApp Number</label>
                <input type="tel" id="vc-phone" required placeholder="+91 98765 43210">
              </div>
              <div class="video-form-group">
                <label for="vc-time">Preferred Time Slot</label>
                <select id="vc-time">
                  <option value="Morning (11:00 AM - 1:00 PM IST)">Morning (11:00 AM - 1:00 PM IST)</option>
                  <option value="Afternoon (2:00 PM - 5:00 PM IST)">Afternoon (2:00 PM - 5:00 PM IST)</option>
                  <option value="Evening (5:30 PM - 8:00 PM IST)">Evening (5:30 PM - 8:00 PM IST)</option>
                </select>
              </div>
              <div class="video-form-group">
                <label for="vc-pieces">Jewellery of Interest</label>
                <input type="text" id="vc-pieces" placeholder="e.g. Emerald Studs, Solitaire Rings">
              </div>
              <button type="submit" class="video-submit-btn">
                <span>CONFIRM APPOINTMENT VIA WHATSAPP</span>
                <span>→</span>
              </button>
            </form>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      const closeBtn = document.getElementById('video-consult-close');
      const form = document.getElementById('video-consult-form');

      function closeVideo() {
        overlay.classList.remove('open');
      }

      closeBtn.addEventListener('click', closeVideo);
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeVideo();
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('vc-name').value.trim();
        const phone = document.getElementById('vc-phone').value.trim();
        const slot = document.getElementById('vc-time').value;
        const pieces = document.getElementById('vc-pieces').value.trim() || 'All Collections';

        const waText = `Namaste Ratnaya Concierge! I would like to schedule a private Video Showing Consultation.\n\n• Name: ${name}\n• Phone: ${phone}\n• Preferred Slot: ${slot}\n• Pieces of Interest: ${pieces}\n\nPlease confirm availability. Thank you!`;
        window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waText)}`, '_blank');
        closeVideo();
        showToast('Consultation request sent to WhatsApp Concierge!');
      });

      document.querySelectorAll('[data-open-video-consult]').forEach(el => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          overlay.classList.add('open');
        });
      });
    }
  }

  // Export engine for global accessibility
  window.RatnayaEngine = {
    getCart,
    saveCart,
    addToCart,
    openCart,
    closeCart,
    updateCartUI,
    initProductCards,
    showToast,
    openSizeGuide: () => {
      const el = document.getElementById('size-guide-overlay');
      if (el) el.classList.add('open');
    },
    openVideoConsult: () => {
      const el = document.getElementById('video-consult-overlay');
      if (el) el.classList.add('open');
    }
  };
})();