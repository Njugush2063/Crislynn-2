// =============================================
// CRISLYNN VENTURES — experience.js
// =============================================

const SUPABASE_URL     = 'https://hcalcyyzwtwbupkxpwkn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjYWxjeXl6d3R3YnVwa3hwd2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NzM2NjksImV4cCI6MjA4OTE0OTY2OX0.-VkzGML-CQIuWhH49iybrxwxnX1ClCeOSim_mjfZ4gM';

// Fallback gallery images per slug (in case gallery_images is empty in DB)
const FALLBACK_IMAGES = {
  'watamu-marine-explorer': [
    'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1605268/pexels-photo-1605268.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'dhow-cruise-malindi': [
    'https://images.pexels.com/photos/1605268/pexels-photo-1605268.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'island-escapades': [
    'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'malindi-heritage-trail': [
    'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3889844/pexels-photo-3889844.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'swahili-bites-tour': [
    'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'craft-culture-canyon': [
    'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'ancient-stones-mangrove': [
    'https://images.pexels.com/photos/3889844/pexels-photo-3889844.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'golden-sands-marafa': [
    'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'tsavo-east-one-day': [
    'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'tsavo-amboseli': [
    'https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'bush-to-beach-maasai-mara': [
    'https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'tsavo-east-west': [
    'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg?auto=compress&cs=tinysrgb&w=800'
  ]
};

// Fallback hero images per slug
const HERO_IMAGES = {
  'watamu-marine-explorer':    'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'dhow-cruise-malindi':       'https://images.pexels.com/photos/1605268/pexels-photo-1605268.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'island-escapades':          'https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'malindi-heritage-trail':    'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'swahili-bites-tour':        'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'craft-culture-canyon':      'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'ancient-stones-mangrove':   'https://images.pexels.com/photos/3889844/pexels-photo-3889844.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'golden-sands-marafa':       'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'tsavo-east-one-day':        'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'tsavo-amboseli':            'https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg?auto=compress&cs=tinysrgb&w=1400',
  'bush-to-beach-maasai-mara': 'https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'tsavo-east-west':           'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=1400'
};
  'watamu-marine-explorer': [
    'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'dhow-cruise-malindi': [
    'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'island-escapades': [
    'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'malindi-heritage-trail': [
    'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/247837/pexels-photo-247837.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3889844/pexels-photo-3889844.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'swahili-bites-tour': [
    'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'craft-culture-canyon': [
    'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/247837/pexels-photo-247837.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'ancient-stones-mangrove': [
    'https://images.pexels.com/photos/3889844/pexels-photo-3889844.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'golden-sands-marafa': [
    'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'tsavo-east-one-day': [
    'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'tsavo-amboseli': [
    'https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'bush-to-beach-maasai-mara': [
    'https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'tsavo-east-west': [
    'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg?auto=compress&cs=tinysrgb&w=800'
  ]
};



// ---- MAIN LOAD FUNCTION ----
async function loadExperience() {
  const params = new URLSearchParams(window.location.search);
  const slug   = params.get('slug');

  if (!slug) {
    showError();
    return;
  }

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/experiences?slug=eq.${slug}&active=eq.true&select=*`,
      {
        headers: {
          'apikey':        SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      }
    );

    const data = await res.json();

    if (!data || data.length === 0) {
      showError();
      return;
    }

    renderExperience(data[0]);

  } catch (err) {
    console.error('Experience fetch error:', err);
    showError();
  }
}

// ---- RENDER ----
function renderExperience(exp) {
  // Page meta
  document.title = `${exp.title} — Crislynn Ventures`;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', exp.title);

  // Hero
  const heroImg = exp.hero_image || HERO_IMAGES[exp.slug] || HERO_IMAGES['watamu-marine-explorer'];
  const heroEl  = document.getElementById('exp-hero');
  heroEl.style.backgroundImage = `url('${heroImg}')`;

  setEl('exp-category-label', exp.category || '');
  setEl('exp-title',          exp.title);
  setEl('exp-tagline',        exp.tagline || exp.description || '');

  // Body
  setEl('exp-title-body', exp.title);
  setEl('exp-long-desc',  exp.long_desc || exp.description || '');

  // Itinerary
  const itinEl    = document.getElementById('exp-itinerary');
  const itinerary = exp.itinerary || [];
  itinEl.innerHTML = itinerary.length
    ? itinerary.map(item => `<li>${item}</li>`).join('')
    : '<li>Itinerary details available on booking.</li>';

  // Gallery
  const galleryEl  = document.getElementById('exp-gallery');
  const galleryArr = (exp.gallery_images && exp.gallery_images.length > 0)
    ? exp.gallery_images
    : (FALLBACK_IMAGES[exp.slug] || []);

  galleryEl.innerHTML = galleryArr.length
    ? galleryArr.map(src =>
        `<div class="gallery-img" style="background-image:url('${src}')"></div>`
      ).join('')
    : '';

  // Booking card
  setEl('booking-duration',   exp.duration_tag || '');
  setEl('booking-title',      exp.title);
  setEl('booking-group',      exp.group_size  || '2–12 people');
  setEl('booking-departures', exp.departures  || 'Daily');

  const includesEl = document.getElementById('booking-includes');
  const includes   = exp.includes || [];
  includesEl.innerHTML = includes.length
    ? includes.map(item => `<li>${item}</li>`).join('')
    : '';

  // Reveal content
  document.getElementById('exp-loading').style.display  = 'none';
  document.getElementById('exp-content').style.display  = 'block';
}

// ---- HELPERS ----
function setEl(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function showError() {
  document.getElementById('exp-loading').style.display = 'none';
  document.getElementById('exp-error').style.display   = 'flex';
}

// ---- INIT ----
loadExperience();
