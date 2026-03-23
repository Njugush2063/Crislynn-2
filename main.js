// ── NAVBAR: scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── STAT COUNTERS ──
// Real values are in HTML — animate up from 0 when element enters view
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// ── HERO: loaded class ──
window.addEventListener('load', () => {
  const hero = document.getElementById('hero');
  if (hero) hero.classList.add('loaded');
});

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =========================================
   EXPERIENCE SLIDER
========================================= */
document.querySelectorAll(".exp-slider").forEach(slider => {
  const cards = slider.querySelector(".exp-cards");
  const firstCard = slider.querySelector(".exp-card");
  const leftBtn = slider.querySelector(".exp-arrow.left");
  const rightBtn = slider.querySelector(".exp-arrow.right");
  const counterEl = slider.querySelector(".exp-counter");

  const gap = 20;
  const visible = 3;
  let index = 0;
  let startX = 0;
  let isDragging = false;

  const total = cards.children.length;
  const maxIndex = Math.max(0, total - visible);

  // build dots
  const dotsWrap = document.createElement("div");
  dotsWrap.className = "exp-dots";
  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement("div");
    dot.className = "exp-dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  }
  slider.appendChild(dotsWrap);

  function goTo(i) {
    index = Math.max(0, Math.min(i, maxIndex));
    const cardWidth = firstCard.offsetWidth + gap;
    cards.style.transform = `translateX(${-index * cardWidth}px)`;
    dotsWrap.querySelectorAll(".exp-dot").forEach((d, idx) => {
      d.classList.toggle("active", idx === index);
    });
    if (counterEl) counterEl.textContent = `${index + 1} of ${total}`;
    leftBtn.style.opacity = index === 0 ? "0.3" : "1";
    rightBtn.style.opacity = index === maxIndex ? "0.3" : "1";
  }

  leftBtn.addEventListener("click", () => goTo(index - 1));
  rightBtn.addEventListener("click", () => goTo(index + 1));

  cards.addEventListener("mousedown", e => { isDragging = true; startX = e.pageX; });
  document.addEventListener("mouseup", () => { isDragging = false; });
  document.addEventListener("mousemove", e => {
    if (!isDragging) return;
    const delta = e.pageX - startX;
    if (Math.abs(delta) > 80) {
      goTo(delta < 0 ? index + 1 : index - 1);
      isDragging = false;
    }
  });
  cards.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
  cards.addEventListener("touchend", e => {
    const delta = e.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 50) goTo(delta < 0 ? index + 1 : index - 1);
  });

  goTo(0);
});

/* =========================================
   CLICKABLE CARDS — navigate to experience page
========================================= */
document.querySelectorAll(".exp-card").forEach(card => {
  card.addEventListener("click", () => {
    const link = card.querySelector(".exp-link");
    if (!link) return;
    window.location.href = link.getAttribute("href");
  });
});

// ── MOBILE NAV ──
const navBurger = document.getElementById('navBurger');
const navLinks = document.querySelector('.nav-links');
let navOpen = false;
if (navBurger) {
  navBurger.addEventListener('click', () => {
    navOpen = !navOpen;
    navLinks.style.display = navOpen ? 'flex' : 'none';
    if (navOpen) {
      Object.assign(navLinks.style, {
        flexDirection: 'column',
        position: 'absolute',
        top: '80px', left: '0', right: '0',
        background: 'rgba(245,240,232,0.98)',
        padding: '24px 48px',
        gap: '20px',
        zIndex: '99'
      });
    }
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navOpen = false;
      navLinks.style.display = 'none';
    });
  });
}

// ── FORM SUBMIT ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target;
  const original = btn.textContent;
  btn.textContent = "Sent! We'll be in touch ✓";
  btn.style.background = '#02423E';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    btn.disabled = false;
  }, 5000);
}

// ── SCROLL REVEAL: IntersectionObserver ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

/* =========================================
   EXPERIENCE SLIDER
========================================= */

document.querySelectorAll(".exp-slider").forEach(slider=>{

const cards=slider.querySelector(".exp-cards");
const card=slider.querySelector(".exp-card");
const left=slider.querySelector(".left");
const right=slider.querySelector(".right");

const gap=20;
const visible=3;

let index=0;
let startX=0;
let isDown=false;

const total=cards.children.length;

/* create dots */

const dotsContainer=document.createElement("div");
dotsContainer.className="exp-dots";

for(let i=0;i<total-visible+1;i++){

const dot=document.createElement("div");
dot.className="exp-dot";

if(i===0) dot.classList.add("active");

dotsContainer.appendChild(dot);

}

slider.appendChild(dotsContainer);

const dots=dotsContainer.querySelectorAll(".exp-dot");


function updateSlider(){

const cardWidth=card.offsetWidth+gap;

cards.style.transform=`translateX(${-index*cardWidth}px)`;

/* update dots */

dots.forEach(d=>d.classList.remove("active"));
if(dots[index]) dots[index].classList.add("active");

/* scale cards */

const allCards=slider.querySelectorAll(".exp-card");

allCards.forEach(c=>{
c.classList.remove("big","small");
});

if(allCards[index+1]){
allCards[index+1].classList.add("big");
}

if(allCards[index]){
allCards[index].classList.add("small");
}

if(allCards[index+2]){
allCards[index+2].classList.add("small");
}

}

/* arrows */

left.onclick=()=>{
index--;
if(index<0) index=0;
updateSlider();
}

right.onclick=()=>{
index++;
if(index>total-visible) index=total-visible;
updateSlider();
}

/* drag */

cards.addEventListener("mousedown",e=>{
isDown=true;
startX=e.pageX;
});

document.addEventListener("mouseup",()=>{
isDown=false;
});

document.addEventListener("mousemove",e=>{

if(!isDown) return;

const move=e.pageX-startX;

if(move>100){
index--;
if(index<0) index=0;
updateSlider();
isDown=false;
}

if(move<-100){
index++;
if(index>total-visible) index=total-visible;
updateSlider();
isDown=false;
}

});

/* touch */

cards.addEventListener("touchstart",e=>{
startX=e.touches[0].clientX;
});

cards.addEventListener("touchend",e=>{

let endX=e.changedTouches[0].clientX;
let move=endX-startX;

if(move>60){
index--;
if(index<0) index=0;
}

if(move<-60){
index++;
if(index>total-visible) index=total-visible;
}

updateSlider();

});

/* initial state */

updateSlider();

});


/* =========================================
   CLICKABLE CARDS
========================================= */

document.querySelectorAll(".exp-card").forEach(card=>{

card.addEventListener("click",()=>{

const link=card.querySelector(".exp-link");

if(!link) return;

const data={
title:link.dataset.title,
image:link.dataset.image,
video:link.dataset.video,
desc:link.dataset.desc
};

localStorage.setItem("selectedExperience",JSON.stringify(data));

window.location.href = link.getAttribute("href");

});

});

/* 
── ITINERARY TOGGLE ──
function toggleItinerary(btn) {
  const itinerary = btn.nextElementSibling;
  const isOpen = itinerary.classList.contains('open');
  // Close all open itineraries
  document.querySelectorAll('.exp-itinerary.open').forEach(el => {
    el.classList.remove('open');
    el.previousElementSibling.textContent = 'View Itinerary ›';
  });
  // Open clicked one if it was closed
  if (!isOpen) {
    itinerary.classList.add('open');
    btn.textContent = 'Close ×';
  }
}
  */

// ── MOBILE NAV ──
const navBurger = document.getElementById('navBurger');
const navLinks = document.querySelector('.nav-links');
if (navBurger) {
  navBurger.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '80px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(245,240,232,0.98)';
    navLinks.style.padding = '24px 48px';
    navLinks.style.gap = '20px';
  });
}

// ── FORM: submit handler ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target;
  btn.textContent = "Sent! We'll be in touch ✓";
  btn.style.background = '#4A7A5A';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = "Request Services ›";
    btn.style.background = '';
    btn.disabled = false;
  }, 4000);
}
