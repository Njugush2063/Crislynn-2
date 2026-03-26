/* =============================================================
   experiences.js — Crislynn Ventures
   Fixes:
   1. Supabase filter changed from active=is.true → active=eq.true
   2. Loading div hidden IMMEDIATELY before any async work, so
      fallback data always shows even if fetch never resolves
   3. All element IDs match the HTML (expGrid, gridCount, etc.)
   ============================================================= */

const SB_URL = 'https://hcalcyyzwtwbupkxpwkn.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjYWxjeXl6d3R3YnVwa3hwd2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NzM2NjksImV4cCI6MjA4OTE0OTY2OX0.-VkzGML-CQIuWhH49iybrxwxnX1ClCeOSim_mjfZ4gM';

/* ── FALLBACK DATA ── */
const FALLBACK = [
  {
    slug: 'watamu-marine-explorer',
    title: 'Watamu Marine Explorer',
    tagline: 'Crystal waters, sea turtles, and coral gardens await',
    card_image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_tag: '3 Days', category: 'Coast & Islands',
    itinerary: ['Boat safari in Watamu Marine Park', 'Snorkeling at Coral Gardens', 'Visit to Gede Ruins', 'Sunset dhow cruise']
  },
  {
    slug: 'lamu-cultural-heritage',
    title: 'Lamu Cultural Heritage',
    tagline: 'UNESCO-listed Lamu Old Town and timeless Swahili culture',
    card_image: 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_tag: '4 Days', category: 'Culture & Heritage',
    itinerary: ['Lamu Old Town walking tour', 'Traditional dhow sailing', 'Donkey sanctuary visit', 'Swahili cooking class']
  },
  {
    slug: 'tsavo-east-west',
    title: 'Tsavo East & West Safari',
    tagline: 'Red elephants, endless savannah, and legendary wildlife',
    card_image: 'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_tag: '4 Days', category: 'Safari & Wildlife',
    itinerary: ['Morning game drive — red elephants', 'Lugard Falls sundowner', 'Mudanda Rock panorama', 'Bush dinner under the stars']
  },
  {
    slug: 'malindi-coastal-retreat',
    title: 'Malindi Coastal Retreat',
    tagline: 'Historic town, pristine beaches, and Italian-influenced cuisine',
    card_image: 'https://images.pexels.com/photos/1605268/pexels-photo-1605268.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_tag: '5 Days', category: 'Coast & Islands',
    itinerary: ['Malindi Marine Park snorkeling', 'Vasco da Gama Pillar tour', 'Casuarina beach day', 'Local market exploration']
  },
  {
    slug: 'amboseli-elephant-safari',
    title: 'Amboseli Elephant Safari',
    tagline: 'Elephants silhouetted against the great Kilimanjaro',
    card_image: 'https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_tag: '3 Days', category: 'Safari & Wildlife',
    itinerary: ['Sunrise game drive at Amboseli', 'Observation Hill panorama', 'Elephant research centre visit', 'Maasai village experience']
  },
  {
    slug: 'swahili-bites-tour',
    title: 'Swahili Bites Food Tour',
    tagline: 'Taste the spice-laden soul of the Kenyan coast',
    card_image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_tag: '2 Days', category: 'Culture & Heritage',
    itinerary: ['Old town spice market walk', 'Swahili cooking class', 'Seafood dhow dinner', 'Malindi juice bar crawl']
  },
  {
    slug: 'island-escapades',
    title: 'Island Escapades',
    tagline: 'Manda, Kiwayu, and Lamu — pristine islands off the beaten path',
    card_image: 'https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_tag: '5 Days', category: 'Coast & Islands',
    itinerary: ['Dhow hop between islands', 'Kizingoni beach picnic', 'Fishing with local fishermen', 'Stargazing on the sandbar']
  },
  {
    slug: 'tsavo-amboseli',
    title: 'Bush to Big Five',
    tagline: 'A grand circuit through Kenya\'s most iconic wildlife parks',
    card_image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration_tag: '6 Days', category: 'Safari & Wildlife',
    itinerary: ['Tsavo East game drives', 'Lugard Falls & Mudanda Rock', 'Amboseli with Kilimanjaro views', 'Maasai Mara sunrise drive']
  }
];

/* ── STATE ── */
let ALL = [], ACTIVE = [];

/* ── HELPERS ── */
function getWL() {
  try { return JSON.parse(localStorage.getItem('cv_wl') || '[]'); } catch(e) { return []; }
}

function toggleWL(slug, btn) {
  let wl = getWL();
  const has = wl.includes(slug);
  wl = has ? wl.filter(s => s !== slug) : [...wl, slug];
  localStorage.setItem('cv_wl', JSON.stringify(wl));
  btn.classList.toggle('wishlisted', !has);
  btn.textContent = !has ? '♥' : '♡';
  showToast(!has ? '♥ Saved to wishlist' : 'Removed from wishlist');
}

function showToast(msg) {
  const t = document.getElementById('cv-toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ── CARD BUILDER ── */
function makeCard(exp) {
  const saved = getWL().includes(exp.slug);
  const img   = exp.card_image || 'https://images.pexels.com/photos/1605268/pexels-photo-1605268.jpeg?auto=compress&cs=tinysrgb&w=800';
  const items = (exp.itinerary || []).slice(0, 3);

  const card = document.createElement('article');
  card.className = 'exp-card';
  card.innerHTML = `
    <div class="card-img">
      <img src="${img}" alt="${exp.title}" loading="lazy"/>
      <div class="card-badges">
        <span class="badge-cat">${exp.category || ''}</span>
        <span class="badge-dur">${exp.duration_tag || ''}</span>
      </div>
      <div class="card-actions">
        <button class="card-btn wl-btn${saved ? ' wishlisted' : ''}" title="Save to wishlist">${saved ? '♥' : '♡'}</button>
        <button class="card-btn share-btn" title="Share">&#8599;</button>
      </div>
    </div>
    <div class="card-body">
      <h3 class="card-title">${exp.title}</h3>
      <p class="card-tagline">${exp.tagline || exp.description || ''}</p>
      ${items.length ? `<ul class="card-highlights">${items.map(i => `<li>${i}</li>`).join('')}</ul>` : ''}
      <a class="card-cta" href="experience.html?slug=${exp.slug}">
        Explore Experience <span>&#8599;</span>
      </a>
    </div>`;

  /* wishlist button */
  card.querySelector('.wl-btn').addEventListener('click', function(e) {
    e.stopPropagation();
    toggleWL(exp.slug, this);
  });

  /* share button */
  card.querySelector('.share-btn').addEventListener('click', function(e) {
    e.stopPropagation();
    const url = location.origin + '/experience.html?slug=' + exp.slug;
    if (navigator.share) {
      navigator.share({ title: exp.title, url });
    } else {
      navigator.clipboard.writeText(url).then(() => showToast('Link copied!'));
    }
  });

  /* navigate on image / body click */
  const dest = 'experience.html?slug=' + exp.slug;
  card.querySelector('.card-img').addEventListener('click', () => location.href = dest);
  card.querySelector('.card-body').addEventListener('click', () => location.href = dest);

  return card;
}

/* ── RENDER ── */
function render(list) {
  const grid  = document.getElementById('expGrid');
  const noRes = document.getElementById('noResults');
  const count = document.getElementById('gridCount');

  grid.innerHTML = '';

  if (!list || !list.length) {
    noRes.classList.add('visible');
    count.classList.remove('visible');
    return;
  }

  noRes.classList.remove('visible');
  count.classList.add('visible');
  count.textContent = list.length + ' experience' + (list.length === 1 ? '' : 's');
  list.forEach(exp => grid.appendChild(makeCard(exp)));
}

/* ── FILTERS & SEARCH ── */
function initControls() {
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('expSearch').value = '';
      const f = btn.dataset.filter;
      ACTIVE = f === 'all' ? ALL : ALL.filter(e => e.category === f);
      render(ACTIVE);
    });
  });

  document.getElementById('expSearch').addEventListener('input', function() {
    const q = this.value.trim().toLowerCase();
    document.querySelectorAll('.filter-tab').forEach((b, i) => b.classList.toggle('active', i === 0));
    ACTIVE = !q ? ALL : ALL.filter(e =>
      (e.title    || '').toLowerCase().includes(q) ||
      (e.tagline  || '').toLowerCase().includes(q) ||
      (e.category || '').toLowerCase().includes(q)
    );
    render(ACTIVE);
  });
}

/* ── HIDE LOADER ── */
function hideLoader() {
  const el = document.getElementById('exp-loading');
  if (el) el.classList.add('hidden');
}

/* ── BOOTSTRAP ── */
function showGrid(data) {
  hideLoader();
  ALL = ACTIVE = (data && data.length) ? data : FALLBACK;
  render(ALL);
  initControls();
}

/* ── LOAD from Supabase, fall back immediately on any failure ── */
function load() {
  /*
   * FIX 1: Use eq.true instead of is.true for boolean filter.
   * FIX 2: Set a 5-second timeout so GitHub Pages CORS hangs
   *        don't leave the spinner up forever.
   */
  const controller = new AbortController();
  const timer = setTimeout(() => { controller.abort(); }, 5000);

  fetch(
    SB_URL + '/rest/v1/experiences' +
    '?active=eq.true' +
    '&select=slug,title,tagline,description,card_image,duration_tag,category,itinerary' +
    '&order=sort_order.asc',
    {
      headers: { 'apikey': SB_KEY, 'Authorization': 'Bearer ' + SB_KEY },
      signal: controller.signal
    }
  )
  .then(r => { clearTimeout(timer); return r.ok ? r.json() : Promise.reject(r.status); })
  .then(data => showGrid(data))
  .catch(() => showGrid(null));   /* always shows fallback on any error */
}

/* ── MOBILE MENU ── */
function initMobileMenu() {
  const h = document.getElementById('hamburger');
  const n = document.getElementById('navLinks');
  if (!h || !n) return;

  h.addEventListener('click', () => {
    const open = n.style.display === 'flex';
    n.style.cssText = open
      ? ''
      : 'display:flex;flex-direction:column;position:absolute;top:56px;left:0;right:0;background:rgba(61,15,16,0.98);padding:1.5rem;gap:1rem;z-index:999;';
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) n.style.cssText = '';
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  load();
});
