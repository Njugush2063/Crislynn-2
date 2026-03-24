/* =============================================
   CRISLYNN VENTURES — main.js
   All Experiences page functionality
   ============================================= */

// Supabase configuration
const SUPABASE_URL = 'https://hcalcyyzwtwbupkxpwkn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjYWxjeXl6d3R3YnVwa3hwd2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NzM2NjksImV4cCI6MjA4OTE0OTY2OX0.-VkzGML-CQIuWhH49iybrxwxnX1ClCeOSim_mjfZ4gM';

let allExperiences = [];

// FALLBACK DATA - This will show if Supabase fails
const FALLBACK_EXPERIENCES = [
  {
    slug: "watamu-marine-explorer",
    title: "Watamu Marine Explorer",
    tagline: "Discover the pristine waters of Watamu Marine National Park",
    description: "Snorkel through crystal clear waters and encounter sea turtles, tropical fish, and vibrant coral reefs.",
    card_image: "https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration_tag: "3 Days / 2 Nights",
    category: "Coast & Islands",
    itinerary: ["Boat safari in Watamu Marine Park", "Snorkeling at Coral Gardens", "Visit to Gede Ruins", "Sunset dhow cruise"]
  },
  {
    slug: "lamu-cultural-heritage",
    title: "Lamu Cultural Heritage",
    tagline: "Step back in time on the magical Lamu Archipelago",
    description: "Experience Swahili culture, traditional dhow sailing, and the UNESCO-listed Lamu Old Town.",
    card_image: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration_tag: "4 Days / 3 Nights",
    category: "Culture & Heritage",
    itinerary: ["Lamu Old Town walking tour", "Dhow sailing experience", "Donkey sanctuary visit", "Swahili cooking class"]
  },
  {
    slug: "tsavo-east-safari",
    title: "Tsavo East Safari",
    tagline: "Witness the legendary red elephants of Tsavo",
    description: "Game drives through Kenya's largest national park, home to lions, leopards, and vast elephant herds.",
    card_image: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration_tag: "3 Days / 2 Nights",
    category: "Safari & Wildlife",
    itinerary: ["Morning game drive", "Visit to Lugard Falls", "Sunset safari at Mudanda Rock", "Night game drive"]
  },
  {
    slug: "malindi-coastal-retreat",
    title: "Malindi Coastal Retreat",
    tagline: "Relax in the historic coastal town of Malindi",
    description: "Enjoy pristine beaches, Italian-influenced cuisine, and the famous Vasco da Gama Pillar.",
    card_image: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration_tag: "5 Days / 4 Nights",
    category: "Coast & Islands",
    itinerary: ["Malindi Marine Park visit", "Vasco da Gama Pillar tour", "Beach relaxation", "Local market exploration"]
  },
  {
    slug: "mombasa-old-town",
    title: "Mombasa Old Town",
    tagline: "Explore the rich history of Kenya's oldest city",
    description: "Walk through centuries of history in Mombasa's ancient streets, Fort Jesus, and vibrant markets.",
    card_image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration_tag: "2 Days / 1 Night",
    category: "Culture & Heritage",
    itinerary: ["Fort Jesus guided tour", "Old Town walking tour", "Spice market visit", "Traditional Swahili lunch"]
  },
  {
    slug: "amboseli-elephant-safari",
    title: "Amboseli Elephant Safari",
    tagline: "Elephants with Kilimanjaro as the backdrop",
    description: "Iconic views of Mount Kilimanjaro and large elephant herds in one of Kenya's most scenic parks.",
    card_image: "https://images.pexels.com/photos/815070/pexels-photo-815070.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration_tag: "3 Days / 2 Nights",
    category: "Safari & Wildlife",
    itinerary: ["Sunrise game drive", "Observation Hill hike", "Elephant research center visit", "Maasai cultural experience"]
  }
];

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
  
  toast.textContent = added ? '❤️ Added to wishlist' : '💔 Removed from wishlist';
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2500);
}

function shareExperience(slug, title, btn) {
  const url = window.location.origin + '/experience.html?slug=' + slug;
  
  if (navigator.share) {
    navigator.share({
      title: title + ' - Crislynn Ventures',
      url: url
    }).catch(() => {
      copyToClipboard(url, btn);
    });
  } else {
    copyToClipboard(url, btn);
  }
}

function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Copied!';
    setTimeout(() => { btn.innerHTML = orig; }, 2000);
  }).catch(() => {
    alert('Press Ctrl+C to copy: ' + text);
  });
}

function goToExp(slug) {
  window.location.href = 'experience.html?slug=' + slug;
}

function makeCardHTML(exp) {
  const img = exp.card_image || exp.image || 'https://images.pexels.com/photos/1605268/pexels-photo-1605268.jpeg?auto=compress&cs=tinysrgb&w=800';
  const tagline = exp.tagline || exp.description || '';
  const itinerary = exp.itinerary || [];
  const slug = exp.slug || '';
  const title = exp.title || '';
  const duration = exp.duration_tag || exp.duration || 'Flexible';
  const category = exp.category || 'Experience';
  const wishlisted = getWishlist().indexOf(slug) > -1 ? 'wishlisted' : '';

  const card = document.createElement('div');
  card.className = 'all-exp-card';
  card.setAttribute('data-slug', slug);
  card.setAttribute('data-category', category);

  // Image section
  const imgDiv = document.createElement('div');
  imgDiv.className = 'all-card-img';
  imgDiv.style.backgroundImage = `url(${img})`;
  imgDiv.style.backgroundSize = 'cover';
  imgDiv.style.backgroundPosition = 'center';
  imgDiv.onclick = () => goToExp(slug);

  // Duration tag
  const durSpan = document.createElement('span');
  durSpan.className = 'card-duration';
  durSpan.textContent = duration;

  // Category badge
  const catSpan = document.createElement('span');
  catSpan.className = 'all-card-category';
  catSpan.textContent = category;

  // Action buttons
  const actions = document.createElement('div');
  actions.className = 'card-actions';
  actions.onclick = (e) => e.stopPropagation();

  const wishBtn = document.createElement('button');
  wishBtn.className = `card-action-btn wishlist-btn ${wishlisted}`;
  wishBtn.innerHTML = wishlisted ? '❤️' : '🤍';
  wishBtn.title = 'Save to wishlist';
  wishBtn.onclick = () => toggleWishlist(slug, wishBtn);

  const shareBtn = document.createElement('button');
  shareBtn.className = 'card-action-btn share-btn';
  shareBtn.innerHTML = '📤';
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

  // Itinerary section
  if (itinerary && itinerary.length > 0) {
    const itin = document.createElement('div');
    itin.className = 'all-card-itinerary';
    const label = document.createElement('h6');
    label.className = 'itin-label';
    label.textContent = 'Highlights';
    const ul = document.createElement('ul');
    
    itinerary.slice(0, 4).forEach(item => {
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
  cta.className = 'all-card-cta';
  cta.href = 'experience.html?slug=' + slug;
  cta.textContent = 'Explore Experience →';
  body.appendChild(cta);

  card.appendChild(imgDiv);
  card.appendChild(body);
  return card;
}

function renderGrid(list) {
  const grid = document.getElementById('all-exp-grid');
  const noRes = document.getElementById('no-results');
  
  if (!grid) return;
  
  grid.innerHTML = '';
  
  if (!list || !list.length) {
    if (noRes) noRes.style.display = 'block';
    return;
  }
  
  if (noRes) noRes.style.display = 'none';
  list.forEach(exp => grid.appendChild(makeCardHTML(exp)));
}

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

function initSearch() {
  const searchInput = document.getElementById('expSearch');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function() {
    const q = this.value.trim().toLowerCase();
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach((b, i) => {
      if (i === 0) b.classList.add('active');
      else b.classList.remove('active');
    });
    
    if (!q) {
      renderGrid(allExperiences);
      return;
    }
    
    renderGrid(allExperiences.filter(e => {
      return (e.title || '').toLowerCase().includes(q)
        || (e.tagline || '').toLowerCase().includes(q)
        || (e.category || '').toLowerCase().includes(q);
    }));
  });
}

function loadAllExperiences() {
  const loadingIndicator = document.getElementById('exp-loading-indicator');
  
  // Try to fetch from Supabase
  fetch(`${SUPABASE_URL}/rest/v1/experiences?select=slug,title,tagline,description,card_image,duration_tag,category,itinerary&active=eq.true`, {
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
    
    if (data && data.length > 0) {
      allExperiences = data;
      console.log('Loaded from Supabase:', data.length, 'experiences');
    } else {
      console.log('No data from Supabase, using fallback data');
      allExperiences = FALLBACK_EXPERIENCES;
    }
    
    renderGrid(allExperiences);
    initFilters();
    initSearch();
  })
  .catch(err => {
    console.warn('Supabase fetch failed:', err.message);
    console.log('Using fallback data');
    
    if (loadingIndicator) loadingIndicator.style.display = 'none';
    allExperiences = FALLBACK_EXPERIENCES;
    renderGrid(allExperiences);
    initFilters();
    initSearch();
  });
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = 'rgba(61,15,16,0.98)';
        navLinks.style.padding = '1.5rem';
        navLinks.style.gap = '1rem';
        navLinks.style.zIndex = '1000';
      }
    });
    
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navLinks.style.display = '';
        navLinks.style.position = '';
        navLinks.style.backgroundColor = '';
      }
    });
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadAllExperiences();
  initMobileMenu();
});
