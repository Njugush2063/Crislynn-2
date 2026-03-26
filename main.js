// =============================================
// CRISLYNN VENTURES — main.js
// Consolidated: nav, counters, slider, forms
// + all experiences logic (moved from inline script)
// =============================================

// =============================================
// SUPABASE CONFIGURATION
// =============================================
const SUPABASE_URL      = 'https://hcalcyyzwtwbupkxpwkn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjYWxjeXl6d3R3YnVwa3hwd2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NzM2NjksImV4cCI6MjA4OTE0OTY2OX0.-VkzGML-CQIuWhH49iybrxwxnX1ClCeOSim_mjfZ4gM';

const CATEGORIES = [
  { key: 'Coast & Islands',    label: 'Coast & Islands',    id: 'coast'   },
  { key: 'Culture & Heritage', label: 'Culture & Heritage', id: 'culture' },
  { key: 'Safari & Wildlife',  label: 'Safari & Wildlife',  id: 'safari'  },
];

// =============================================
// NAV SCROLL — transparent → maroon on scroll
// =============================================
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// =============================================
// HAMBURGER MENU
// =============================================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// =============================================
// STAT COUNTERS — animated on scroll
// =============================================
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const suffix   = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start    = performance.now();
    el.textContent = '0' + suffix;
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

const whySection = document.querySelector('.why-us') || document.querySelector('.about');
if (whySection) {
  let triggered = false;
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      document.querySelectorAll('.stat').forEach(s => s.classList.add('in-view'));
      animateCounters();
      counterObserver.disconnect();
    }
  }, { threshold: 0.35 });
  counterObserver.observe(whySection);
}

// =============================================
// SLIDER
// =============================================
const sliderOffsets = {};
function slide(id, dir) {
  const track = document.getElementById(id);
  if (!track) return;
  const card = track.querySelector('.exp-card');
  if (!card) return;
  const cardWidth = card.offsetWidth + 24;
  const cards     = track.querySelectorAll('.exp-card').length;
  const visible   = Math.floor(track.offsetWidth / cardWidth);
  const max       = Math.max(0, cards - visible);
  sliderOffsets[id] = Math.min(Math.max((sliderOffsets[id] || 0) + dir, 0), max);
  track.style.transform  = `translateX(-${sliderOffsets[id] * cardWidth}px)`;
  track.style.transition = 'transform 0.4s ease';
  const wrapper = track.closest('.slider-wrapper');
  if (wrapper) {
    wrapper.querySelector('.prev').disabled = sliderOffsets[id] === 0;
    wrapper.querySelector('.next').disabled = sliderOffsets[id] >= max;
  }
}

// =============================================
// ITINERARY TOGGLE
// =============================================
function toggleItinerary(event, id) {
  event.stopPropagation();
  const list = document.getElementById(id);
  if (!list) return;
  const isOpen = list.classList.contains('open');
  list.classList.toggle('open', !isOpen);
  event.currentTarget.textContent = isOpen ? 'View Itinerary ›' : 'Close ×';
}

// =============================================
// NAVIGATE TO EXPERIENCE PAGE
// =============================================
function goToExperience(slug) {
  window.location.href = `experience.html?slug=${slug}`;
}

// =============================================
// CONTACT FORM
// =============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = document.getElementById('formSuccess');
    if (success) {
      success.style.display = 'block';
      contactForm.reset();
      // Reset select colour after reset
      const sel = document.getElementById('expSelect');
      if (sel) sel.style.color = 'rgba(255,255,255,0.65)';
      setTimeout(() => { success.style.display = 'none'; }, 5000);
    }
  });
}

// Keep select text white once a real option is chosen
const expSelectEl = document.getElementById('expSelect');
if (expSelectEl) {
  expSelectEl.addEventListener('change', function () {
    this.style.color = this.value ? 'var(--white)' : 'rgba(255,255,255,0.65)';
  });
}

// =============================================
// WISHLIST (localStorage)
// =============================================
function getWishlist() {
  try { return JSON.parse(localStorage.getItem('cv_wishlist') || '[]'); } catch { return []; }
}
function toggleWishlist(slug, btn) {
  let list = getWishlist();
  const saved = list.includes(slug);
  list = saved ? list.filter(s => s !== slug) : [...list, slug];
  localStorage.setItem('cv_wishlist', JSON.stringify(list));
  btn.classList.toggle('wishlisted', !saved);
  btn.title = saved ? 'Save to wishlist' : 'Saved!';
  showWishlistToast(!saved);
}
function showWishlistToast(added) {
  let toast = document.getElementById('wishlist-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'wishlist-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = added ? '❤️ Added to wishlist' : '🗑 Removed from wishlist';
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2500);
}

// =============================================
// SHARE
// =============================================
function shareExperience(slug, title, btn) {
  const url = window.location.origin + '/experience.html?slug=' + slug;
  if (navigator.share) {
    navigator.share({ title: title + ' — Crislynn Ventures', url });
  } else {
    navigator.clipboard.writeText(url).then(() => {
      const orig = btn.innerHTML;
      btn.innerHTML = '✓';
      btn.title = 'Link copied!';
      setTimeout(() => { btn.innerHTML = orig; btn.title = 'Share'; }, 2000);
    });
  }
}

// =============================================
// RENDER ONE EXPERIENCE CARD
// =============================================
function renderCard(exp) {
  const img       = exp.card_image || 'https://images.pexels.com/photos/1605268/pexels-photo-1605268.jpeg?auto=compress&cs=tinysrgb&w=800';
  const tagline   = exp.tagline || exp.description || '';
  const itinerary = exp.itinerary || [];
  const itinId    = 'itin-' + exp.slug;
  const wishlisted = getWishlist().includes(exp.slug) ? 'wishlisted' : '';

  const itinHtml = itinerary.length
    ? `<button class="itinerary-toggle" onclick="toggleItinerary(event,'${itinId}')">View Itinerary ›</button>
       <ul class="itinerary-preview" id="${itinId}">${itinerary.slice(0, 5).map(i => `<li>${i}</li>`).join('')}</ul>`
    : '';

  return `
    <div class="exp-card" onclick="goToExperience('${exp.slug}')">
      <div class="card-img" style="background-image:url('${img}')">
        <span class="card-duration">${exp.duration_tag || ''}</span>
        <div class="card-actions" onclick="event.stopPropagation()">
          <button class="card-action-btn wishlist-btn ${wishlisted}"
            onclick="toggleWishlist('${exp.slug}',this)" title="Save to wishlist">♡</button>
          <button class="card-action-btn share-btn"
            onclick="shareExperience('${exp.slug}','${exp.title.replace(/'/g, "\\'")}',this)" title="Share">↗</button>
        </div>
      </div>
      <div class="card-body">
        <h4>${exp.title}</h4>
        <p>${tagline}</p>
        ${itinHtml}
        <a class="card-cta" href="experience.html?slug=${exp.slug}" onclick="event.stopPropagation()">Explore →</a>
      </div>
    </div>`;
}

// =============================================
// RENDER CATEGORY SLIDERS
// =============================================
function renderCategories(experiences) {
  const container = document.getElementById('exp-categories');
  if (!container) return;
  CATEGORIES.forEach(cat => {
    const catExps = experiences.filter(e => e.category === cat.key);
    if (!catExps.length) return;
    const section = document.createElement('div');
    section.className = 'exp-category';
    section.innerHTML =
      `<h3 class="category-title">${cat.label}</h3>
       <div class="slider-wrapper">
         <button class="slider-btn prev" onclick="slide('${cat.id}',-1)">&#8249;</button>
         <div class="cards-track" id="${cat.id}">${catExps.map(renderCard).join('')}</div>
         <button class="slider-btn next" onclick="slide('${cat.id}',1)">&#8250;</button>
       </div>`;
    container.appendChild(section);
  });
}

// =============================================
// POPULATE CONTACT SELECT + FOOTER LINKS
// =============================================
function populateContactSelect(experiences) {
  const select = document.getElementById('expSelect');
  if (!select) return;
  experiences.forEach(exp => {
    const opt = document.createElement('option');
    opt.value = exp.slug;
    opt.textContent = exp.title;
    select.appendChild(opt);
  });
  const custom = document.createElement('option');
  custom.value = 'custom';
  custom.textContent = 'Custom Journey';
  select.appendChild(custom);
}

function populateFooterLinks(experiences) {
  const container = document.getElementById('footer-exp-links');
  if (!container) return;
  experiences.slice(0, 5).forEach(exp => {
    const a = document.createElement('a');
    a.href = 'experience.html?slug=' + exp.slug;
    a.textContent = exp.title;
    container.appendChild(a);
  });
}

// =============================================
// FILTER TABS
// =============================================
let allExperiences = [];
function initFilters(experiences) {
  allExperiences = experiences;
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const searchInput = document.getElementById('expSearch');
      if (searchInput) searchInput.value = '';
      const results = document.getElementById('exp-search-results');
      const cats    = document.getElementById('exp-categories');
      if (results) results.style.display = 'none';
      if (filter === 'all') {
        if (cats) cats.style.display = 'block';
      } else {
        if (cats) cats.style.display = 'none';
        const filtered = allExperiences.filter(e => e.category === filter);
        if (results) {
          results.innerHTML = `<div class="search-results-grid">${filtered.map(renderCard).join('')}</div>`;
          results.style.display = 'block';
        }
      }
    });
  });
}

// =============================================
// SEARCH
// =============================================
function initSearch() {
  const input = document.getElementById('expSearch');
  if (!input) return;
  input.addEventListener('input', () => {
    const q       = input.value.trim().toLowerCase();
    const results = document.getElementById('exp-search-results');
    const cats    = document.getElementById('exp-categories');
    if (!q) {
      if (results) results.style.display = 'none';
      if (cats)    cats.style.display    = 'block';
      document.querySelectorAll('.filter-tab').forEach((b, i) => b.classList.toggle('active', i === 0));
      return;
    }
    if (cats) cats.style.display = 'none';
    document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
    const filtered = allExperiences.filter(e =>
      e.title.toLowerCase().includes(q) ||
      (e.tagline  || '').toLowerCase().includes(q) ||
      (e.category || '').toLowerCase().includes(q)
    );
    if (results) {
      results.innerHTML = filtered.length
        ? `<div class="search-results-grid">${filtered.map(renderCard).join('')}</div>`
        : '<p class="no-results-msg">No experiences match your search.</p>';
      results.style.display = 'block';
    }
  });
}

// =============================================
// LOAD EXPERIENCES FROM SUPABASE
// =============================================
async function loadExperiences() {
  const loadingEl = document.getElementById('exp-loading-indicator');
  try {
    const res = await fetch(
      SUPABASE_URL + '/rest/v1/experiences?active=is.true&select=slug,title,tagline,description,card_image,duration_tag,category,itinerary,price_from&order=sort_order.asc',
      { headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': 'Bearer ' + SUPABASE_ANON_KEY } }
    );

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`HTTP ${res.status}: ${errBody}`);
    }

    const experiences = await res.json();
    console.log(`Loaded ${experiences.length} experience(s)`);

    if (loadingEl) loadingEl.style.display = 'none';
    if (!experiences || experiences.length === 0) {
      if (loadingEl) loadingEl.innerHTML = '<p style="color:#6b5d50;padding:2rem;">No experiences found yet — check back soon!</p>';
      return;
    }

    renderCategories(experiences);
    populateContactSelect(experiences);
    populateFooterLinks(experiences);
    initFilters(experiences);
    initSearch();

  } catch (err) {
    console.error('loadExperiences error:', err);
    if (loadingEl) loadingEl.innerHTML = '<p style="color:#6b5d50;padding:2rem;">Unable to load experiences. Please refresh.</p>';
  }
}

// =============================================
// INIT ON DOM READY
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('exp-categories')) {
    loadExperiences();
  }
});

// =============================================
// GLOBAL SCOPE (for onclick= attributes in HTML)
// =============================================
window.slide           = slide;
window.goToExperience  = goToExperience;
window.toggleItinerary = toggleItinerary;
window.toggleWishlist  = toggleWishlist;
window.shareExperience = shareExperience;
window.loadExperiences = loadExperiences;
