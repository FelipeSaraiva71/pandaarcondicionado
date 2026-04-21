// =========================
// HERO + HEADER INIT
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  const header = document.querySelector('.header');

  if (hero) hero.classList.add('active');
  if (header) header.classList.add('active');
});


// =========================
// MENU MOBILE
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      toggle.classList.toggle('open');
    });
  }
});


// =========================
// OBSERVER GLOBAL (REVEAL ÚNICO)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(
    ".reveal, .about-container, .servicos, .numeros, .empresas, .depoimentos, .contato"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  targets.forEach(el => observer.observe(el));
});


// =========================
// CONTAGEM NUMÉRICA (NÚMEROS)
// =========================
function animateCount(el, target, callback) {
  let count = 0;
  const increment = target / 100;

  const h3 = el.closest("h3");

const prefix = h3.querySelector(".prefix");
const suffix = h3.querySelector(".suffix");

if (prefix) prefix.style.opacity = 1;
if (suffix) suffix.style.opacity = 1;

  const interval = setInterval(() => {
    count += increment;

    if (count >= target) {
      clearInterval(interval);

      el.textContent = target;

      const h3 = el.closest("h3");
      h3.classList.add("finished");

      const p = h3.nextElementSibling;
      if (p) p.classList.add("show");

      if (callback) callback();
    } else {
      el.textContent = Math.floor(count);
    }
  }, 20);
}

function startSequentialCount() {
  const counters = document.querySelectorAll(".count");
  let i = 0;

  function next() {
    if (i < counters.length) {
      const el = counters[i];
      const target = +el.dataset.target;

      animateCount(el, target, () => {
        i++;
        next();
      });
    }
  }

  next();
}


// ativa números quando entra na tela
document.addEventListener("DOMContentLoaded", () => {
  const numeros = document.querySelector(".numeros");

  if (!numeros) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        numeros.classList.add("animate");
        startSequentialCount();
        observer.unobserve(numeros);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(numeros);
});


// =========================
// GRÁFICOS CIRCULARES
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const graficos = document.querySelectorAll(".grafico");

  graficos.forEach(grafico => {
    const percent = grafico.dataset.percent;
    const circle = grafico.querySelector(".progress");
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    const offset = circumference - (percent / 100) * circumference;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          circle.style.strokeDashoffset = offset;
          grafico.classList.add("animate");
          observer.unobserve(grafico);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(grafico);
  });
});


// =========================
// SWIPER (CARROSSEL)
 // =========================
const swiper = new Swiper('.carrossel', {
  loop: true,
  slidesPerView: 5,
  spaceBetween: 20,

  autoplay: {
    delay: 0,
    disableOnInteraction: false
  },

  speed: 3000,
  pagination: false,
  navigation: false,

  breakpoints: {
    768: { slidesPerView: 3 },
    480: { slidesPerView: 2 }
  }
});