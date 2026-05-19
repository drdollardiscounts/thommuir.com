'use strict';

// Nav toggle
const hamburger = document.getElementById('hamburger');
const siteNav = document.getElementById('site-nav');

if (hamburger && siteNav) {
  hamburger.addEventListener('click', () => {
    const open = siteNav.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', open);
  });

  document.addEventListener('click', e => {
    if (!siteNav.contains(e.target) && !hamburger.contains(e.target)) {
      siteNav.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// Weather widget — Sydney coordinates
const weatherEl = document.getElementById('weather');
if (weatherEl) {
  const CONDITIONS = {
    0: 'clear sky',
    1: 'mostly clear', 2: 'partly cloudy', 3: 'overcast',
    45: 'foggy', 48: 'foggy',
    51: 'light drizzle', 53: 'drizzle', 55: 'heavy drizzle',
    61: 'light rain', 63: 'rain', 65: 'heavy rain',
    71: 'light snow', 73: 'snow', 75: 'heavy snow',
    77: 'snow grains',
    80: 'showers', 81: 'showers', 82: 'heavy showers',
    85: 'snow showers', 86: 'heavy snow showers',
    95: 'thunderstorm', 96: 'thunderstorm', 99: 'thunderstorm',
  };

  function describe(code) {
    if (CONDITIONS[code]) return CONDITIONS[code];
    if (code <= 3) return 'partly cloudy';
    if (code <= 49) return 'foggy';
    if (code <= 69) return 'rain';
    if (code <= 79) return 'snow';
    if (code <= 84) return 'showers';
    return 'stormy';
  }

  fetch('https://api.open-meteo.com/v1/forecast?latitude=-33.8908&longitude=151.2743&current=temperature_2m,weather_code&temperature_unit=celsius')
    .then(r => r.json())
    .then(({ current }) => {
      const temp = Math.round(current.temperature_2m);
      const condition = describe(current.weather_code);
      weatherEl.innerHTML =
        `<span class="w-temp">${temp} °C</span><span class="w-condition">${condition}</span>`;
    })
    .catch(() => {});
}

// Random hero image
const heroImg = document.getElementById('hero-img');
if (heroImg) {
  const images = [
    'SXSW_1.jpg','SXSW_2.jpg','SXSW_3.jpg','SXSW_4.jpg',
    'SXSW_5.jpg','SXSW_6.jpg','SXSW_7.jpg','SXSW_8.jpg',
    'SXSW_9.jpg','SXSW_10.jpg','SXSW_11.jpg','SXSW_12.jpg',
    'SXSW_13.jpg','SXSW_14.jpg','SXSW_15.jpg','SXSW_16.jpg',
  ];
  const pick = images[Math.floor(Math.random() * images.length)];
  heroImg.src = `assets/img/homepage/${pick}`;
}

// Lightbox — populate description from painting-meta siblings
document.querySelectorAll('.painting-entry .glightbox').forEach(link => {
  const meta = link.closest('.painting-entry').querySelector('.painting-meta');
  if (!meta) return;
  const medium = meta.querySelector('.medium');
  const dimensions = meta.querySelector('.dimensions');
  const parts = [medium, dimensions].filter(Boolean).map(el => el.textContent.trim());
  if (parts.length) link.dataset.description = parts.join(' — ');
});

if (typeof GLightbox !== 'undefined') {
  GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
}
