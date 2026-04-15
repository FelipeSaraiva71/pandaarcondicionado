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

// PARALLAX HERO (movimento do fundo ao rolar)
/*window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.backgroundPositionY = window.scrollY * 0.3 + "px";
  }
});*/

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

function animateNumbers() {
  const numbers = document.querySelectorAll(".numeros .numero h3");
  numbers.forEach(num => {
    const target = +num.textContent.replace(/\D/g, ""); // pega só dígitos
    let count = 0;
    const increment = target / 100; // velocidade da contagem
    const interval = setInterval(() => {
      count += increment;
      if (count >= target) {
        num.textContent = target + (num.textContent.includes("K") ? "K+" : num.textContent.includes("%") ? "%" : "");
        clearInterval(interval);
      } else {
        num.textContent = Math.floor(count);
      }
    }, 20);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const numeros = document.querySelector(".numeros");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        numeros.classList.add("animate");
        animateNumbers();
        observer.unobserve(numeros);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(numeros);
});

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

    // anima quando entra na tela
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


