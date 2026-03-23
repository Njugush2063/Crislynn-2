// =============================================
// CRISLYNN VENTURES — experience.js
// =============================================

const SUPABASE_URL      = 'https://hcalcyyzwtwbupkxpwkn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjYWxjeXl6d3R3YnVwa3hwd2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NzM2NjksImV4cCI6MjA4OTE0OTY2OX0.-VkzGML-CQIuWhH49iybrxwxnX1ClCeOSim_mjfZ4gM';

// ── HERO VIDEO per slug (YouTube embed IDs — autoplay muted loop) ─────────
// Using free-to-use YouTube videos that match each experience category
const HERO_VIDEOS = {
  'watamu-marine-explorer':    'UkzBRSyiako', // underwater coral/ocean
  'dhow-cruise-malindi':       'n_BdRaqQuas', // dhow sailing Indian Ocean
  'island-escapades':          'UkzBRSyiako', // tropical island / ocean
  'malindi-heritage-trail':    'YkOSUi97IGk', // Kenya coastal town heritage
  'swahili-bites-tour':        'PNK8S8WVSBI', // East African food / market
  'craft-culture-canyon':      'YkOSUi97IGk', // Kenyan culture / crafts
  'ancient-stones-mangrove':   'YkOSUi97IGk', // mangrove / nature Kenya
  'golden-sands-marafa':       '1421903',      // canyon / dunes (fallback img)
  'tsavo-east-one-day':        'H7mVJMvJoYY', // Tsavo safari wildlife
  'tsavo-amboseli':            'H7mVJMvJoYY', // Amboseli Kilimanjaro safari
  'bush-to-beach-maasai-mara': 'H7mVJMvJoYY', // Maasai Mara savannah
  'tsavo-east-west':           'H7mVJMvJoYY'  // Tsavo wildlife
};

// ── FALLBACK HERO IMAGES (when video not available) ───────────────────────
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

// ── GALLERY: 12+ images + 2 videos per slug ───────────────────────────────
// Videos are Pexels free video embeds (format: {type:'video', src:'...'})
// Images are {type:'image', src:'...'}
const GALLERY_ITEMS = {
  'watamu-marine-explorer': [
    {type:'image', src:'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1605268/pexels-photo-1605268.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/2765872/pexels-photo-2765872.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3155659/pexels-photo-3155659.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3046629/pexels-photo-3046629.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'video', src:'https://www.pexels.com/video/3045163/'},
    {type:'video', src:'https://www.pexels.com/video/1093671/'}
  ],
  'dhow-cruise-malindi': [
    {type:'image', src:'https://images.pexels.com/photos/1605268/pexels-photo-1605268.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/2255491/pexels-photo-2255491.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3232677/pexels-photo-3232677.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3046629/pexels-photo-3046629.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'video', src:'https://www.pexels.com/video/6981028/'},
    {type:'video', src:'https://www.pexels.com/video/1093671/'}
  ],
  'island-escapades': [
    {type:'image', src:'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/2255491/pexels-photo-2255491.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3232677/pexels-photo-3232677.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1605268/pexels-photo-1605268.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3046629/pexels-photo-3046629.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'video', src:'https://www.pexels.com/video/3045163/'},
    {type:'video', src:'https://www.pexels.com/video/6981028/'}
  ],
  'malindi-heritage-trail': [
    {type:'image', src:'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3889844/pexels-photo-3889844.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/2765872/pexels-photo-2765872.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3232677/pexels-photo-3232677.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'video', src:'https://www.pexels.com/video/5387167/'},
    {type:'video', src:'https://www.pexels.com/video/3015489/'}
  ],
  'swahili-bites-tour': [
    {type:'image', src:'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3889844/pexels-photo-3889844.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'video', src:'https://www.pexels.com/video/3015489/'},
    {type:'video', src:'https://www.pexels.com/video/5387167/'}
  ],
  'craft-culture-canyon': [
    {type:'image', src:'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3889844/pexels-photo-3889844.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/2765872/pexels-photo-2765872.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3232677/pexels-photo-3232677.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'video', src:'https://www.pexels.com/video/5387167/'},
    {type:'video', src:'https://www.pexels.com/video/3015489/'}
  ],
  'ancient-stones-mangrove': [
    {type:'image', src:'https://images.pexels.com/photos/3889844/pexels-photo-3889844.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3232677/pexels-photo-3232677.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/2765872/pexels-photo-2765872.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'video', src:'https://www.pexels.com/video/3045163/'},
    {type:'video', src:'https://www.pexels.com/video/6981028/'}
  ],
  'golden-sands-marafa': [
    {type:'image', src:'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/2765872/pexels-photo-2765872.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3232677/pexels-photo-3232677.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'video', src:'https://www.pexels.com/video/5387167/'},
    {type:'video', src:'https://www.pexels.com/video/3015489/'}
  ],
  'tsavo-east-one-day': [
    {type:'image', src:'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1670995/pexels-photo-1670995.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/2087524/pexels-photo-2087524.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3573351/pexels-photo-3573351.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1003715/pexels-photo-1003715.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'video', src:'https://www.pexels.com/video/elephants-walking-on-a-dry-grass-field-3174168/'},
    {type:'video', src:'https://www.pexels.com/video/4088702/'}
  ],
  'tsavo-amboseli': [
    {type:'image', src:'https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1670995/pexels-photo-1670995.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3573351/pexels-photo-3573351.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/2087524/pexels-photo-2087524.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1003715/pexels-photo-1003715.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'video', src:'https://www.pexels.com/video/elephants-walking-on-a-dry-grass-field-3174168/'},
    {type:'video', src:'https://www.pexels.com/video/4088702/'}
  ],
  'bush-to-beach-maasai-mara': [
    {type:'image', src:'https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1670995/pexels-photo-1670995.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1003715/pexels-photo-1003715.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3573351/pexels-photo-3573351.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'video', src:'https://www.pexels.com/video/elephants-walking-on-a-dry-grass-field-3174168/'},
    {type:'video', src:'https://www.pexels.com/video/4088702/'}
  ],
  'tsavo-east-west': [
    {type:'image', src:'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1670995/pexels-photo-1670995.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/2087524/pexels-photo-2087524.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/1003715/pexels-photo-1003715.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'image', src:'https://images.pexels.com/photos/3573351/pexels-photo-3573351.jpeg?auto=compress&cs=tinysrgb&w=800'},
    {type:'video', src:'https://www.pexels.com/video/elephants-walking-on-a-dry-grass-field-3174168/'},
    {type:'video', src:'https://www.pexels.com/video/4088702/'}
  ]
};

// ── MAIN LOAD FUNCTION ────────────────────────────────────────────────────
async function loadExperience() {
  const params = new URLSearchParams(window.location.search);
  const slug   = params.get('slug');

  if (!slug) { showError(); return; }

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/experiences?slug=eq.${slug}&active=eq.true&select=*`,
      { headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` } }
    );
    const data = await res.json();
    if (!data || data.length === 0) { showError(); return; }
    renderExperience(data[0]);
  } catch (err) {
    console.error('Experience fetch error:', err);
    showError();
  }
}

// ── RENDER ────────────────────────────────────────────────────────────────
function renderExperience(exp) {
  document.title = `${exp.title} — Crislynn Ventures`;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', exp.title);

  // Hero: inject video background
  renderHeroVideo(exp);

  setEl('exp-category-label', exp.category || '');
  setEl('exp-title',          exp.title);
  setEl('exp-tagline',        exp.tagline || exp.description || '');
  setEl('exp-title-body',     exp.title);
  setEl('exp-long-desc',      exp.long_desc || exp.description || '');

  // Itinerary
  const itinEl    = document.getElementById('exp-itinerary');
  const itinerary = exp.itinerary || [];
  if (itinEl) itinEl.innerHTML = itinerary.length
    ? itinerary.map(item => `<li>${item}</li>`).join('')
    : '<li>Itinerary details available on booking.</li>';

  // Gallery — 12+ items including videos
  renderGallery(exp);

  // Booking card
  setEl('booking-duration',   exp.duration_tag || '');
  setEl('booking-title',      exp.title);
  setEl('booking-group',      exp.group_size   || '2–12 people');
  setEl('booking-departures', exp.departures   || 'Daily');

  const includesEl = document.getElementById('booking-includes');
  const includes   = exp.includes || [];
  if (includesEl) includesEl.innerHTML = includes.length
    ? includes.map(item => `<li>${item}</li>`).join('')
    : '';

  // Reveal
  const loadEl    = document.getElementById('exp-loading');
  const contentEl = document.getElementById('exp-content');
  if (loadEl)    loadEl.style.display    = 'none';
  if (contentEl) contentEl.style.display = 'block';
}

// ── HERO VIDEO ────────────────────────────────────────────────────────────
function renderHeroVideo(exp) {
  const heroEl = document.getElementById('exp-hero');
  if (!heroEl) return;

  const videoId = HERO_VIDEOS[exp.slug];
  const fallbackImg = exp.hero_image || HERO_IMAGES[exp.slug] || HERO_IMAGES['watamu-marine-explorer'];

  if (videoId) {
    // Remove any existing background image
    heroEl.style.backgroundImage = '';
    heroEl.style.background = '#1a0a0a';

    // Create YouTube iframe as background
    const iframe = document.createElement('iframe');
    iframe.className = 'hero-video-bg';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;
    iframe.allow = 'autoplay; fullscreen';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('aria-hidden', 'true');

    // Insert before overlay
    const overlay = heroEl.querySelector('.exp-hero-overlay');
    if (overlay) {
      heroEl.insertBefore(iframe, overlay);
    } else {
      heroEl.prepend(iframe);
    }

    // Fallback: if iframe fails to load (e.g. iframe blocked), show image
    iframe.onerror = () => {
      heroEl.style.backgroundImage = `url('${fallbackImg}')`;
      iframe.remove();
    };
  } else {
    heroEl.style.backgroundImage = `url('${fallbackImg}')`;
  }
}

// ── GALLERY RENDER ────────────────────────────────────────────────────────
function renderGallery(exp) {
  const galleryEl = document.getElementById('exp-gallery');
  if (!galleryEl) return;

  // Use DB gallery if populated, else use our GALLERY_ITEMS
  let items = [];
  if (exp.gallery_images && exp.gallery_images.length > 0) {
    items = exp.gallery_images.map(src => ({ type: 'image', src }));
  } else {
    items = GALLERY_ITEMS[exp.slug] || [];
  }

  if (!items.length) return;

  galleryEl.innerHTML = items.map(item => {
    if (item.type === 'video') {
      // Extract Pexels video ID from URL
      const pexelsMatch = item.src.match(/\/video\/(?:[^\/]+-)?(\d+)\/?/);
      const videoId = pexelsMatch ? pexelsMatch[1] : null;
      if (!videoId) return '';
      return `
        <div class="gallery-item gallery-video" onclick="openLightbox('video','${item.src}')">
          <div class="gallery-video-thumb" style="background:var(--maroon-deep);">
            <div class="gallery-play-btn">▶</div>
            <span class="gallery-video-label">Video</span>
          </div>
        </div>`;
    } else {
      return `
        <div class="gallery-item gallery-img"
             style="background-image:url('${item.src}')"
             onclick="openLightbox('image','${item.src}')">
        </div>`;
    }
  }).join('');
}

// ── LIGHTBOX ──────────────────────────────────────────────────────────────
function openLightbox(type, src) {
  const existing = document.getElementById('gallery-lightbox');
  if (existing) existing.remove();

  const lb = document.createElement('div');
  lb.id = 'gallery-lightbox';
  lb.innerHTML = type === 'image'
    ? `<div class="lb-backdrop" onclick="closeLightbox()"></div>
       <button class="lb-close" onclick="closeLightbox()">✕</button>
       <img src="${src}" class="lb-img" />`
    : `<div class="lb-backdrop" onclick="closeLightbox()"></div>
       <button class="lb-close" onclick="closeLightbox()">✕</button>
       <iframe src="${src}" class="lb-video" allow="autoplay; fullscreen" frameborder="0"></iframe>`;

  document.body.appendChild(lb);
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('gallery-lightbox');
  if (lb) lb.remove();
  document.body.style.overflow = '';
}

// ── HELPERS ───────────────────────────────────────────────────────────────
function setEl(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function showError() {
  const loadEl = document.getElementById('exp-loading');
  const errEl  = document.getElementById('exp-error');
  if (loadEl) loadEl.style.display = 'none';
  if (errEl)  errEl.style.display  = 'flex';
}

// ── INIT ──────────────────────────────────────────────────────────────────
loadExperience();
