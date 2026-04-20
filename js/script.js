// Ativa animação de entrada ao carregar
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  const header = document.querySelector('.header');

  if (hero) hero.classList.add('active');
  if (header) header.classList.add('active');
});

// REVEAL ON SCROLL (para seções internas)
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-up');
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // executa uma vez ao carregar

// Toggle menu responsivo
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      toggle.classList.toggle('open'); // ativa a animação do X
    });
  }
});

// Observer para revelar seções
document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(
    ".about-container, .sobre.reveal, .servicos.reveal, .numeros.reveal, .empresas.reveal, .depoimentos.reveal, .contato.reveal"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target); // anima só uma vez
      }
    });
  }, { threshold: 0.3 });

  targets.forEach(el => observer.observe(el));
});

// Função de contagem sequencial
function animateCount(el, target, callback) {
  let count = 0;
  const increment = target / 100;
  const interval = setInterval(() => {
    count += increment;
    if (count >= target) {
      clearInterval(interval);
      el.textContent = target; // mantém valor final visível
      const h3 = el.closest("h3");
      h3.classList.add("finished"); // aplica pulse
      h3.style.opacity = 1;
      // mostra o texto logo depois
      const p = h3.nextElementSibling;
      if (p) p.classList.add("show");
      if (callback) callback();
    } else {
      el.textContent = Math.floor(count);
      const h3 = el.closest("h3");
      h3.style.opacity = 1; // aparece durante a contagem
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

// dispara apenas quando o bloco .numeros entra na tela
document.addEventListener("DOMContentLoaded", () => {
  const numeros = document.querySelector(".numeros");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        numeros.classList.add("animate");
        startSequentialCount();
        observer.unobserve(numeros); // roda só uma vez
      }
    });
  }, { threshold: 0.3 });

  observer.observe(numeros);
});


// Observer para gráficos circulares
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

// Animação dos ventos
document.addEventListener("DOMContentLoaded", () => {
  const ventos = document.querySelectorAll(".vento");
  setInterval(() => {
    ventos.forEach(v => {
      const deslocamento = Math.random() * 20 - 10; // -10px a +10px
      const opacidade = 0.2 + Math.random() * 0.4; // entre 0.2 e 0.6
      v.style.transform = `translateX(${deslocamento}px) translateY(20px)`;
      v.style.opacity = opacidade;
    });
  }, 2000);
});

// Partículas no fundo
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".particulas");

  for (let i = 0; i < 40; i++) {
    const p = document.createElement("span");
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDelay = Math.random() * 6 + "s";
    p.style.animationDuration = 4 + Math.random() * 4 + "s";
    container.appendChild(p);
  }
});

// Inicialização do Swiper com autoplay contínuo
const swiper = new Swiper('.carrossel', {
  loop: true,              // loop infinito
  slidesPerView: 5,        // mostra 5 logos em telas grandes
  spaceBetween: 20,        // espaço entre os logos
  autoplay: {
    delay: 0,              // sem pausa entre movimentos
    disableOnInteraction: false
  },
  speed: 3000,             // velocidade da transição (quanto maior, mais suave)
  pagination: false,       // sem bolinhas
  navigation: false,       // sem setas

  // Responsividade automática
  breakpoints: {
    768: { slidesPerView: 3 }, // tablets
    480: { slidesPerView: 2 }  // celulares
  }
});
