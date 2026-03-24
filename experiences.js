/* =============================================
   CRISLYNN VENTURES — main.js
   All Experiences page functionality
   ============================================= */

// Supabase configuration
const SUPABASE_URL = 'https://hcalcyyzwtwbupkxpwkn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjYWxjeXl6d3R3YnVwa3hwd2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NzM2NjksImV4cCI6MjA4OTE0OTY2OX0.-VkzGML-CQIuWhH49iybrxwxnX1ClCeOSim_mjfZ4gM';

let allExperiences = [];

// Wishlist functions
function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem('cv_wishlist') || '[]');
  } catch(e) {
    return [];
  }
}

function toggleWishlist(slug, btn) {
  let list = getWishlist();
  const saved = list.indexOf(slug) > -1;
  
  if (saved) {
    list = list.filter(s => s !== slug);
  } else {
    list.push(slug);
  }
  
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
  
  toast.textContent = added ? 'Added to wishlist' : 'Removed from wishlist';
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2500);
}

// Share experience
function shareExperience(slug, title, btn) {
  const url = window.location.origin + '/experience.html?slug=' + slug;
  
  if (navigator.share) {
    navigator.share({
      title: title + ' - Crislynn Ventures',
      url: url
    });
  } else {
    navigator.clipboard.writeText(url).then(() => {
      const orig = btn.innerHTML;
      btn.innerHTML = 'Copied!';
      setTimeout(() => { btn.innerHTML = orig; }, 2000);
    });
  }
}

// Navigate to experience detail
function goToExp(slug) {
  window.location.href = 'experience.html?slug=' + slug;
}

// Create experience card HTML
function makeCardHTML(exp) {
  const img = exp.card_image || 'https://images.pexels.com/photos/1605268/pexels-photo-1605268.jpeg?auto=compress&cs=tinysrgb&w=800';
  const tagline = exp.tagline || exp.description || '';
  const itinerary = exp.itinerary || [];
  const slug = exp.slug || '';
  const title = exp.title || '';
  const duration = exp.duration_tag || '';
  const category = exp.category || '';
  const wishlisted = getWishlist().indexOf(slug) > -1 ? 'wishlisted' : '';

  const card = document.createElement('div');
  card.className = 'all-exp-card';
  card.setAttribute('data-slug', slug);
  card.setAttribute('data-category', category);

  // Image section
  const imgDiv = document.createElement('div');
  imgDiv.className = 'all-card-img';
  imgDiv.style.backgroundImage = `url(${img})`;
  imgDiv.onclick = () => goToExp(slug);

  // Duration tag
  const durSpan = document.createElement('span');
  durSpan.className = 'card-duration';
  durSpan.textContent = duration;

  // Category badge
  const catSpan = document.createElement('span');
  catSpan.className = 'all-card-category';
  catSpan.textContent = category;

  // Action buttons (wishlist + share)
  const actions = document.createElement('div');
  actions.className = 'card-actions';
  actions.onclick = (e) => e.stopPropagation();

  const wishBtn = document.createElement('button');
  wishBtn.className = `card-action-btn wishlist-btn ${wishlisted}`;
  wishBtn.innerHTML = '❤️';
  wishBtn.title = 'Save to wishlist';
  wishBtn.onclick = () => toggleWishlist(slug, wishBtn);

  const shareBtn = document.createElement('button');
  shareBtn.className = 'card-action-btn share-btn';
  shareBtn.innerHTML = '🔗';
  shareBtn.title = 'Share';
  shareBtn.onclick = () => shareExperience(slug, title, shareBtn);

  actions.appendChild(wishBtn);
  actions.appendChild(shareBtn);
  imgDiv.appendChild(durSpan);
  imgDiv.appendChild(catSpan);
  imgDiv.appendChild(actions);

  // Card body
  const body = document.createElement('div');
  body.className = 'all-card-body';

  const h3 = document.createElement('h3');
  h3.className = 'all-card-title';
  h3.textContent = title;
  h3.onclick = () => goToExp(slug);

  const p = document.createElement('p');
  p.className = 'all-card-tagline';
  p.textContent = tagline;

  body.appendChild(h3);
  body.appendChild(p);

  // Itinerary section (if exists)
  if (itinerary && itinerary.length) {
    const itin = document.createElement('div');
    itin.className = 'all-card-itinerary';
    const label = document.createElement('h6');
    label.className = 'itin-label';
    label.textContent = 'Itinerary';
    const ul = document.createElement('ul');
    
    itinerary.slice(0, 6).forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
    
    itin.appendChild(label);
    itin.appendChild(ul);
    body.appendChild(itin);
  }

  // CTA button
  const cta = document.createElement('a');
  cta.className = 'all-card-cta btn-primary';
  cta.href = 'experience.html?slug=' + slug;
  cta.textContent = 'Explore Experience';
  body.appendChild(cta);

  card.appendChild(imgDiv);
  card.appendChild(body);
  return card;
}

// Render grid with filtered experiences
function renderGrid(list) {
  const grid = document.getElementById('all-exp-grid');
  const noRes = document.getElementById('no-results');
  grid.innerHTML = '';
  
  if (!list || !list.length) {
    noRes.style.display = 'block';
    return;
  }
  
  noRes.style.display = 'none';
  list.forEach(exp => grid.appendChild(makeCardHTML(exp)));
}

// Initialize filter tabs
function initFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const searchInput = document.getElementById('expSearch');
  
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (searchInput) searchInput.value = '';
      
      const filter = btn.getAttribute('data-filter');
      renderGrid(filter === 'all' 
        ? allExperiences 
        : allExperiences.filter(e => e.category === filter));
    });
  });
}

// Initialize search functionality
function initSearch() {
  const searchInput = document.getElementById('expSearch');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function() {
    const q = this.value.trim().toLowerCase();
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach((b, i) => b.classList.toggle('active', i === 0));
    
    if (!q) {
      renderGrid(allExperiences);
      return;
    }
    
    renderGrid(allExperiences.filter(e => {
      return (e.title || '').toLowerCase().indexOf(q) > -1
        || (e.tagline || '').toLowerCase().indexOf(q) > -1
        || (e.category || '').toLowerCase().indexOf(q) > -1;
    }));
  });
}

// Load experiences from Supabase
function loadAllExperiences() {
  const loadingIndicator = document.getElementById('exp-loading-indicator');
  
  fetch(`${SUPABASE_URL}/rest/v1/experiences?active=eq.true&select=slug,title,tagline,description,card_image,duration_tag,category,itinerary,price_from&order=sort_order.asc`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
    }
  })
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(data => {
    if (loadingIndicator) loadingIndicator.style.display = 'none';
    
    if (!data || !data.length) {
      document.getElementById('no-results').style.display = 'block';
      return;
    }
    
    allExperiences = data;
    renderGrid(data);
    initFilters();
    initSearch();
  })
  .catch(err => {
    console.error('Load error:', err);
    if (loadingIndicator) {
      loadingIndicator.innerHTML = '<p style="color:#6b5d50;padding:2rem;">Unable to load experiences. Please refresh.</p>';
    }
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      if (navLinks.style.display === 'flex') {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = 'rgba(61,15,16,0.98)';
        navLinks.style.padding = '1.5rem';
        navLinks.style.gap = '1rem';
      }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navLinks.style.display = '';
        navLinks.style.position = '';
        navLinks.style.backgroundColor = '';
      }
    });
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadAllExperiences();
  initMobileMenu();
});
