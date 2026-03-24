// =============================================
// CRISLYNN VENTURES — main.js
// Complete file with Supabase experience loader
// =============================================

// =============================================
// NAV SCROLL — transparent → maroon
// =============================================
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load in case page is already scrolled
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
// STAT COUNTERS — animated on scroll with suffix support
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

// Trigger counters when about section enters viewport
const aboutSection = document.querySelector('.about');
if (aboutSection) {
  let triggered = false;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      document.querySelectorAll('.stat').forEach(s => s.classList.add('in-view'));
      animateCounters();
      observer.disconnect();
    }
  }, { threshold: 0.35 });
  observer.observe(aboutSection);
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
  track.style.transform = `translateX(-${sliderOffsets[id] * cardWidth}px)`;
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
  const btn = event.currentTarget;
  btn.textContent = isOpen ? 'View Itinerary ›' : 'Close ×';
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
      setTimeout(() => { success.style.display = 'none'; }, 5000);
    }
  });
}

// =============================================
// SUPABASE CONFIGURATION
// =============================================
const SUPABASE_URL = 'https://hcalcyyzwtwbupkxpwkn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjYWxjeXl6d3R3YnVwa3hwd2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NzM2NjksImV4cCI6MjA4OTE0OTY2OX0.-VkzGML-CQIuWhH49iybrxwxnX1ClCeOSim_mjfZ4gM';

let allExperiences = [];

// =============================================
// FETCH EXPERIENCES FROM SUPABASE
// FIX 1: Use `is.true` instead of `eq.true` for boolean columns in PostgREST
// FIX 2: Added fallback — if `active` filter returns nothing, fetch all rows
//         so you can verify data exists before debugging RLS/column issues
// =============================================
async function loadExperiences() {
    const container = document.getElementById('experiences-grid');
    if (!container) return;

    container.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <p class="loading-text">Loading experiences...</p>
        </div>
    `;

    try {
        // FIXED: PostgREST boolean syntax is `is.true`, not `eq.true`
        const url = `${SUPABASE_URL}/rest/v1/experiences?select=*&active=is.true&order=created_at.asc`;

        const response = await fetch(url, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                // ADDED: Tell PostgREST to return JSON
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            // Log the actual error body so you can diagnose it
            const errorBody = await response.text();
            console.error('Supabase error response:', response.status, errorBody);
            throw new Error(`HTTP ${response.status}: ${errorBody}`);
        }

        allExperiences = await response.json();

        // DEBUG HELPER: Log how many rows came back
        console.log(`Loaded ${allExperiences.length} experience(s) from Supabase`);

        // If active filter returned zero rows, try without the filter
        // so you know whether the table is empty vs the filter is wrong
        if (allExperiences.length === 0) {
            console.warn('No active experiences found — checking if table has any rows at all...');
            const fallbackResp = await fetch(
                `${SUPABASE_URL}/rest/v1/experiences?select=id,title,active&limit=5`,
                {
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                    }
                }
            );
            const fallbackData = await fallbackResp.json();
            console.log('Sample rows (no filter):', fallbackData);
        }

        renderExperiences(allExperiences);
        setupExperienceFilters();
        updateSliders();

    } catch (error) {
        console.error('Error loading experiences:', error);
        container.innerHTML = `
            <div class="error-message">
                <p>Unable to load experiences. Please refresh the page or try again later.</p>
                <button onclick="loadExperiences()" class="btn-outline">Retry</button>
            </div>
        `;
    }
}

// =============================================
// RENDER EXPERIENCES TO GRID
// =============================================
function renderExperiences(experiences) {
    const container = document.getElementById('experiences-grid');
    if (!container) return;

    if (!experiences || experiences.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <p>No experiences found. Check back soon for new adventures!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = experiences.map(exp => `
        <div class="exp-card" data-category="${exp.category || ''}" onclick="goToExperience('${exp.slug}')">
            <div class="exp-card-img" style="background-image: url('${exp.hero_image || 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800'}')">
                <span class="card-duration">${exp.duration_tag || 'Full Day'}</span>
            </div>
            <div class="exp-card-body">
                <span class="exp-card-category">${exp.category || 'Experience'}</span>
                <h3 class="exp-card-title">${escapeHtml(exp.title)}</h3>
                <p class="exp-card-tagline">${escapeHtml(exp.tagline || exp.description || '')}</p>
                <div class="exp-card-footer">
                    <button class="btn-outline btn-small" onclick="event.stopPropagation(); toggleItinerary(event, 'itin-${exp.id}')">View Itinerary ›</button>
                </div>
                <div id="itin-${exp.id}" class="exp-card-itinerary" style="display: none;">
                    <div class="itin-label">Your Journey</div>
                    <ul>
                        ${(exp.itinerary || ['Details available on booking']).map(item => `<li>${escapeHtml(item)}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `).join('');
}

// =============================================
// HELPER: Escape HTML to prevent XSS
// =============================================
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// =============================================
// FILTER EXPERIENCES BY CATEGORY
// =============================================
function filterExperiences(category) {
    if (category === 'All' || category === 'all') {
        renderExperiences(allExperiences);
    } else {
        const filtered = allExperiences.filter(exp => exp.category === category);
        renderExperiences(filtered);
    }
}

// =============================================
// SEARCH EXPERIENCES BY TITLE OR TAGLINE
// =============================================
function searchExperiences(keyword) {
    if (!keyword || keyword.trim() === '') {
        renderExperiences(allExperiences);
        return;
    }

    const searchTerm = keyword.toLowerCase().trim();
    const filtered = allExperiences.filter(exp =>
        exp.title.toLowerCase().includes(searchTerm) ||
        (exp.tagline && exp.tagline.toLowerCase().includes(searchTerm)) ||
        (exp.description && exp.description.toLowerCase().includes(searchTerm))
    );
    renderExperiences(filtered);
}

// =============================================
// SET UP FILTER AND SEARCH LISTENERS
// =============================================
function setupExperienceFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterExperiences(btn.dataset.filter);
        });
    });

    const searchInput = document.getElementById('experience-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchExperiences(e.target.value);
        });
    }
}

// =============================================
// UPDATE SLIDERS WITH LOADED EXPERIENCES
// =============================================
function updateSliders() {
    const sliders = document.querySelectorAll('.slider-track');
    sliders.forEach(slider => {
        const category = slider.dataset.category;
        if (category && allExperiences.length) {
            const filtered = allExperiences.filter(exp => exp.category === category);
            if (filtered.length) {
                slider.innerHTML = filtered.map(exp => `
                    <div class="exp-card" onclick="goToExperience('${exp.slug}')">
                        <div class="exp-card-img" style="background-image: url('${exp.hero_image || ''}')">
                            <span class="card-duration">${exp.duration_tag || ''}</span>
                        </div>
                        <div class="exp-card-body">
                            <h3 class="exp-card-title">${escapeHtml(exp.title)}</h3>
                            <p class="exp-card-tagline">${escapeHtml(exp.tagline || '')}</p>
                        </div>
                    </div>
                `).join('');
            }
        }
    });
}

// =============================================
// INITIALIZE ON DOM READY
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('experiences-grid')) {
        loadExperiences();
        // Note: setupExperienceFilters() is now called inside loadExperiences()
        // after data loads, so filters work on the actual data
    }

    if (document.querySelector('.slider-track')) {
        if (!allExperiences.length) {
            setTimeout(() => {
                if (allExperiences.length) updateSliders();
            }, 1000);
        }
    }
});

// =============================================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// =============================================
window.goToExperience = goToExperience;
window.toggleItinerary = toggleItinerary;
window.slide = slide;
window.filterExperiences = filterExperiences;
window.searchExperiences = searchExperiences;
window.loadExperiences = loadExperiences;
