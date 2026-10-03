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

    // 6. Search Trigger
    const searchTrigger = document.getElementById('search-trigger');
    if (searchTrigger) {
      searchTrigger.addEventListener('click', () => {
        const term = prompt('Search RATNAYA JEWELLERS (e.g. Apsara, Emerald, Sapphire, Rings):');
        if (term && term.trim()) {
          const query = term.trim().toLowerCase();
          showToast(`Searching collections for “${term.trim()}”...`);
          if (query.includes('ring')) {
            window.location.href = 'category-rings.html';
          } else if (query.includes('earring') || query.includes('stud')) {
            window.location.href = 'category-earrings.html';
          } else if (query.includes('necklace') || query.includes('pendant')) {
            window.location.href = 'category-necklaces.html';
          } else if (query.includes('bracelet') || query.includes('bangle')) {
            window.location.href = 'category-bracelets.html';
          } else if (query.includes('mangalsutra')) {
            window.location.href = 'category-mangalsutras.html';
          }
        }
      });
    }

    // 7. Newsletter Form
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

  // Export engine for global accessibility
  window.RatnayaEngine = {
    getCart,
    saveCart,
    addToCart,
    openCart,
    closeCart,
    updateCartUI,
    initProductCards,
    showToast
  };
})();