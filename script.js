// RATNAYA JEWELLERS — Interactive Controller
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking outside or on a link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // 2. Sticky Header Elevation on Scroll
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

  // 3. Toast Notification Helper
  const toast = document.getElementById('toast-notice');
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

  // 4. Wishlist Interaction
  let wishlistCount = 0;
  const wishlistCounter = document.getElementById('wishlist-count');
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');

  wishlistButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest('.product-card');
      const productName = card?.dataset.name || 'Item';
      const isActive = btn.classList.toggle('active');

      if (isActive) {
        wishlistCount++;
        showToast(`Added “${productName}” to your Wishlist`);
      } else {
        wishlistCount = Math.max(0, wishlistCount - 1);
        showToast(`Removed “${productName}” from your Wishlist`);
      }

      if (wishlistCounter) {
        wishlistCounter.textContent = String(wishlistCount);
      }
    });
  });

  // 5. Cart / Bag Interaction
  let cartCount = 0;
  const cartCounter = document.getElementById('cart-count');
  const addButtons = document.querySelectorAll('.quick-add-btn');

  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.product-card');
      const productName = card?.dataset.name || 'Jewellery piece';
      const price = card?.dataset.price ? `₹ ${Number(card.dataset.price).toLocaleString('en-IN')}` : '';

      cartCount++;
      if (cartCounter) cartCounter.textContent = String(cartCount);

      // Button feedback
      const originalText = btn.textContent;
      btn.textContent = 'Added ✓';
      btn.style.background = 'var(--emerald)';
      btn.style.color = '#FFFFFF';

      showToast(`Added “${productName}” (${price}) to Bag`);

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
      }, 1800);
    });
  });

  // 6. Search Trigger
  const searchTrigger = document.getElementById('search-trigger');
  if (searchTrigger) {
    searchTrigger.addEventListener('click', () => {
      const term = prompt('Search RATNAYA (e.g. Emerald, Diamond, Rings, Mangalsutra):');
      if (term && term.trim()) {
        showToast(`Searching for “${term.trim()}”...`);
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
        const email = input.value.trim();
        input.value = '';
        showToast(`Thank you for joining. Welcome to RATNAYA.`);
      }
    });
  }
});