// =============================================
// CRISLYNN VENTURES — main.js  (FIXED)
// Fixes applied:
//   1. active=is.true  →  active=eq.true  (Supabase boolean filter)
//   2. exp-loading-indicator  →  exp-loading  (matches HTML id)
//   3. Fallback data added — experiences always show even if Supabase fails
//   4. experience.js fetch also fixed (active=eq.true)
//   5. Removed duplicate variable declarations that clash with experiences.js
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
// FALLBACK EXPERIENCES
// Shown immediately if Supabase is unreachable,
// returns an error, or returns an empty array.
// =============================================
const FALLBACK_EXPERIENCES = [
  {
    slug: 'watamu-marine-explorer',
    title: 'Watamu Marine Explorer',
    tagline: 'Crystal waters, sea turtles, and coral gardens await',
    card_image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_tag: '3 Days',
    category: 'Coast & Islands',
    itinerary: ['Boat safari in Watamu Marine Park', 'Snorkeling at Coral Gardens', 'Visit to Gede Ruins', 'Sunset dhow cruise']
  },
  {
    slug: 'lamu-cultural-heritage',
    title: 'Lamu Cultural Heritage',
    tagline: 'UNESCO-listed Lamu Old Town and timeless Swahili culture',
    card_image: 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_tag: '4 Days',
    category: 'Culture & Heritage',
    itinerary: ['Lamu Old Town walking tour', 'Traditional dhow sailing', 'Donkey sanctuary visit', 'Swahili cooking class']
  },
  {
    slug: 'tsavo-east-west',
    title: 'Tsavo East & West Safari',
    tagline: 'Red elephants, endless savannah, and legendary wildlife',
    card_image: 'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_tag: '4 Days',
    category: 'Safari & Wildlife',
    itinerary: ['Morning game drive — red elephants', 'Lugard Falls sundowner', 'Mudanda Rock panorama', 'Bush dinner under the stars']
  },
  {
    slug: 'malindi-coastal-retreat',
    title: 'Malindi Coastal Retreat',
    tagline: 'Historic town, pristine beaches, and Italian-influenced cuisine',
    card_image: 'https://images.pexels.com/photos/1605268/pexels-photo-1605268.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_tag: '5 Days',
    category: 'Coast & Islands',
    itinerary: ['Malindi Marine Park snorkeling', 'Vasco da Gama Pillar tour', 'Casuarina beach day', 'Local market exploration']
  },
  {
    slug: 'amboseli-elephant-safari',
    title: 'Amboseli Elephant Safari',
    tagline: 'Elephants silhouetted against the great Kilimanjaro',
    card_image: 'https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_tag: '3 Days',
    category: 'Safari & Wildlife',
    itinerary: ['Sunrise game drive at Amboseli', 'Observation Hill panorama', 'Elephant research centre visit', 'Maasai village experience']
  },
  {
    slug: 'swahili-bites-tour',
    title: 'Swahili Bites Food Tour',
    tagline: 'Taste the spice-laden soul of the Kenyan coast',
    card_image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_tag: '2 Days',
    category: 'Culture & Heritage',
    itinerary: ['Old town spice market walk', 'Swahili cooking class', 'Seafood dhow dinner', 'Malindi juice bar crawl']
  },
  {
    slug: 'island-escapades',
    title: 'Island Escapades',
    tagline: 'Manda, Kiwayu, and Lamu — pristine islands off the beaten path',
    card_image: 'https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_tag: '5 Days',
    category: 'Coast & Islands',
    itinerary: ['Dhow hop between islands', 'Kizingoni beach picnic', 'Fishing with local fishermen', 'Stargazing on the sandbar']
  },
  {
    slug: 'tsavo-amboseli',
    title: 'Bush to Big Five',
    tagline: "A grand circuit through Kenya's most iconic wildlife parks",
    card_image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_tag: '6 Days',
    category: 'Safari & Wildlife',
    itinerary: ['Tsavo East game drives', 'Lugard Falls & Mudanda Rock', 'Amboseli with Kilimanjaro views', 'Maasai Mara sunrise drive']
  }
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
      const sel = document.getElementById('expSelect');
      if (sel) sel.style.color = 'rgba(255,255,255,0.65)';
      setTimeout(() => { success.style.display = 'none'; }, 5000);
    }
  });
}

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
  container.innerHTML = ''; // clear any previous content
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
  // Remove old dynamic options first (keep the default placeholder)
  const existing = select.querySelectorAll('option[data-dynamic]');
  existing.forEach(o => o.remove());

  experiences.forEach(exp => {
    const opt = document.createElement('option');
    opt.value = exp.slug;
    opt.textContent = exp.title;
    opt.setAttribute('data-dynamic', '1');
    select.appendChild(opt);
  });
  const custom = document.createElement('option');
  custom.value = 'custom';
  custom.textContent = 'Custom Journey';
  custom.setAttribute('data-dynamic', '1');
  select.appendChild(custom);
}

function populateFooterLinks(experiences) {
  const container = document.getElementById('footer-exp-links');
  if (!container) return;
  container.innerHTML = '';
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
// HIDE LOADING SPINNER
// Tries both IDs to handle any HTML variation
// =============================================
function hideLoadingSpinner() {
  // Try both possible IDs used across versions of the HTML
  ['exp-loading', 'exp-loading-indicator'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

// =============================================
// BOOTSTRAP — render experiences then wire up UI
// =============================================
function bootstrapExperiences(experiences) {
  hideLoadingSpinner();
  renderCategories(experiences);
  populateContactSelect(experiences);
  populateFooterLinks(experiences);
  initFilters(experiences);
  initSearch();
}

// =============================================
// LOAD EXPERIENCES FROM SUPABASE
// FIX: active=eq.true  (was: active=is.true — wrong for boolean columns)
// Falls back to FALLBACK_EXPERIENCES on ANY failure or empty result
// =============================================
async function loadExperiences() {
  // Show fallback immediately so the section is never blank
  // (will be replaced by live data if Supabase responds in time)
  if (document.getElementById('exp-categories')) {
    bootstrapExperiences(FALLBACK_EXPERIENCES);
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000); // 6 s timeout

    const res = await fetch(
      SUPABASE_URL +
        '/rest/v1/experiences' +
        '?active=eq.true' +                               // ← FIXED (was is.true)
        '&select=slug,title,tagline,description,card_image,duration_tag,category,itinerary,price_from' +
        '&order=sort_order.asc',
      {
        headers: {
          'apikey':        SUPABASE_ANON_KEY,
          'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
        },
        signal: controller.signal
      }
    );

    clearTimeout(timer);

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`HTTP ${res.status}: ${errBody}`);
    }

    const experiences = await res.json();
    console.log(`Loaded ${experiences.length} experience(s) from Supabase`);

    // Only replace fallback if we actually got live data
    if (experiences && experiences.length > 0) {
      bootstrapExperiences(experiences);
    } else {
      console.warn('Supabase returned 0 experiences — keeping fallback data');
    }

  } catch (err) {
    // Network error, timeout, or bad response — fallback already showing, do nothing
    console.warn('loadExperiences: using fallback data.', err.message || err);
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
