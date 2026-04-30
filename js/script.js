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
  const links = document.querySelectorAll('.menu a');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      toggle.classList.toggle('open');
    });

    // 🔥 fecha menu ao clicar em qualquer link
    links.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
        toggle.classList.remove('open');
      });
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

        // 🔥 inicia contagem UMA ÚNICA VEZ
        if (entry.target.id === "numeros") {
          startSequentialCount();
        }

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  targets.forEach(el => observer.observe(el));

  // 🔥 fallback inteligente (mobile / edge cases)

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

      h3.classList.add("finished");

      const p = h3.nextElementSibling;
      if (p) p.classList.add("show");

      if (callback) callback();
    } else {
      el.textContent = Math.floor(count);
    }
  }, 20);
}


// =========================
// CONTROLE DEFINITIVO (ANTI-REPETIÇÃO)
// =========================
function startSequentialCount() {
  const section = document.querySelector("#numeros");

  // 🚫 trava execução duplicada
  if (section.classList.contains("counted")) return;
  section.classList.add("counted");

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


// =========================
// GRÁFICOS CIRCULARES
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const graficos = document.querySelectorAll(".grafico");

  graficos.forEach(grafico => {
    const percent = grafico.getAttribute("data-percent");
    const progress = grafico.querySelector(".progress");
    const radius = progress.getAttribute("r");
    const circumference = 2 * Math.PI * radius;

    progress.style.strokeDasharray = circumference;
    progress.style.strokeDashoffset = circumference;

    const offset = circumference - (percent / 100) * circumference;

    setTimeout(() => {
      progress.style.transition = "stroke-dashoffset 1.5s ease";
      progress.style.strokeDashoffset = offset;
    }, 200);
  });
});


// =========================
// SWIPER (CARROSSEL)
// =========================
document.addEventListener('DOMContentLoaded', () => {
  new Swiper('.carrossel', {
    loop: true,

    slidesPerView: 'auto',
    spaceBetween: 30,

    speed: 6000,

    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },

    allowTouchMove: false,

    // 🔥 ESSENCIAL PARA NÃO TRAVAR
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
  });
});