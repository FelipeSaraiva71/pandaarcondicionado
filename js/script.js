// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Partículas animadas
const canvas = document.getElementById("particles-bg");
const ctx = canvas.getContext("2d");
let particlesArray = [];

function initParticles() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  particlesArray = [];
  for (let i = 0; i < 80; i++) {
    particlesArray.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedY: Math.random() * 1.2 + 0.3
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particlesArray) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 180, 255, 0.3)";
    ctx.fill();

    p.y += p.speedY;
    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", initParticles);
initParticles();
animateParticles();

// Alternar modo escuro
const toggleBtn = document.getElementById("toggle-dark-mode");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.querySelector("header").classList.toggle("dark-mode");
  document.querySelector("footer").classList.toggle("dark-mode");
});

function enviarEmailJS(event) {
  event.preventDefault();

  const feedback = document.getElementById("form-feedback");
  feedback.textContent = "";
  feedback.classList.remove("error");

  const email = document.getElementById("email").value.trim();
  const nome = document.getElementById("nome").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!nome || !email || !mensagem) {
    feedback.textContent = "Por favor, preencha todos os campos.";
    feedback.classList.add("error");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    feedback.textContent = "Por favor, insira um email válido.";
    feedback.classList.add("error");
    return;
  }

  emailjs.sendForm("service_xn89bfh", "template_0ppflw8", event.target)
    .then(() => {
      feedback.textContent = "✅ Mensagem enviada com sucesso!";
      feedback.classList.remove("error");
      event.target.reset();
    })
    .catch((error) => {
      console.error("Erro ao enviar:", error);
      feedback.textContent = "❌ Erro ao enviar. Tente novamente.";
      feedback.classList.add("error");
    });


}
  
const galeria = document.querySelector(".carousel .galeria");
const items = document.querySelectorAll(".carousel .item");

let index = 0;
let isTransitioning = false;

// 🔥 CLONA OS PRIMEIROS ELEMENTOS
const clones = [];
items.forEach(item => {
  const clone = item.cloneNode(true);
  galeria.appendChild(clone);
  clones.push(clone);
});

const allItems = document.querySelectorAll(".carousel .item");

function updateCarousel(animate = true) {
  const itemWidth = galeria.parentElement.getBoundingClientRect().width;

  if (!animate) {
    galeria.style.transition = "none";
  } else {
    galeria.style.transition = "transform 0.5s ease";
  }

  galeria.style.transform = `translateX(-${index * itemWidth}px)`;
}

// 🔁 LOOP AUTOMÁTICO
setInterval(() => {
  if (isTransitioning) return;

  index++;
  updateCarousel(true);

  // Quando chega no final "fake"
  if (index === items.length) {
    isTransitioning = true;

    setTimeout(() => {
      index = 0;
      updateCarousel(false); // volta sem animação
      isTransitioning = false;
    }, 500); // tempo igual ao transition
  }
}, 3000);

// Atualiza ao redimensionar
window.addEventListener("resize", () => {
  updateCarousel(false);
});

updateCarousel();