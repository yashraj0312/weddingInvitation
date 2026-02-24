confettiCtx.rotate((p.rotation * Math.PI) / 180);

    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.4);

    confettiCtx.restore();

    // Remove off-screen particles
    if (p.y > confettiCanvas.height) {
      confettiElements.splice(i, 1);
    }
  }

  // Continue animation if particles remain
  if (confettiElements.length > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    animationRunning = false;
  }
}

const confettiCanvas = document.getElementById("confetti");
const confettiCtx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;
let confettiElements = [];
let confettiStarted = false;
function triggerConfetti() {
  for (let i = 0; i < 150; i++) {
    confettiElements.push({
      x: Math.random() * confettiCanvas.width,
      y: -10,
      r: Math.random() * 6 + 4,
      dx: (Math.random() - 0.5) * 6,
      dy: Math.random() * 4 + 2,
      color: `hsl(${Math.random() * 360},80%,60%)`,
    });
  }
  // animateConfetti();
  if (!animationRunning) {
    animationRunning = true;
    lastTime = performance.now();
    requestAnimationFrame(animateConfetti);
  }
}

// COUNTDOWN
const countdownEl = document.getElementById("countdown");
const weddingDate = new Date("Nov 20, 2026 00:00:00").getTime();
let timeGapForConfetti = 0;
function updateCountdown() {
  const now = new Date().getTime();
  const gap = weddingDate - now;
  const days = Math.max(Math.floor(gap / (1000 * 60 * 60 * 24)), 0);
  const hours = Math.max(
    Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    0,
  );
  const minutes = Math.max(
    Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60)),
    0,
  );
  const seconds = Math.max(Math.floor((gap % (1000 * 60)) / 1000), 0);
  countdownEl.innerHTML = `
        <div>${days}<br>Days</div>
        <div>${hours}<br>Hours</div>
        <div>${minutes}<br>Minutes</div>
        <div>${seconds}<br>Seconds</div>
    `;

  timeGapForConfetti = gap;
}

function triggerConfettiOnCompletion() {
  if (timeGapForConfetti <= 0) {
    triggerConfetti();
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

triggerConfettiOnCompletion();
setInterval(triggerConfettiOnCompletion, 2000);

// INTRO LOADER FADE
window.addEventListener("load", () => {
  const loader = document.getElementById("intro-loader");
  setTimeout(() => {
    loader.classList.add("fade-out");
  }, 2500);
});

// PARTICLE ANIMATION
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
const particleCount = window.innerWidth < 768 ? 30 : 80;
for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    dy: Math.random() * 0.5 + 0.2,
  });
}
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(212,165,255,0.5)";
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y += p.dy;
    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// SCROLL PROGRESS & DOTS
const progress = document.getElementById("progress-bar");
const panels = document.querySelectorAll(".panel");
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (scrollTop / scrollHeight) * 100 + "%";
  const sections = [
    ".hero",
    ".story",
    ".engagement",
    ".ceremony",
    ".reception",
  ];
  let index = 0;
  sections.forEach((sel, i) => {
    if (
      window.scrollY >=
      document.querySelector(sel).offsetTop - window.innerHeight / 2
    ) {
      index = i;
    }
  });
  document.querySelectorAll("#dot-nav li").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
  panels.forEach((panel) => {
    panel.style.backgroundPosition = `center ${-scrollTop * 0.03}px`;
  });
});

// DOT NAV CLICK
document.querySelectorAll("#dot-nav li").forEach((dot) => {
  dot.addEventListener("click", () => {
    document
      .querySelector(dot.dataset.target)
      .scrollIntoView({ behavior: "smooth" });
  });
});

// RESIZE HANDLER
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

const sectionsData = [
  {
    head: "Emma & Liam",
    bodyText: "Wedding Invitation",
    type: "hero",
    imageURL: "assets/images/hero-bg.jpg",
    icon: null,
  },
  {
    head: "Our Story❤️",
    bodyText: "One message turned up to a connection of a lifetime.",
    type: "story",
    imageURL: "assets/images/story.jpg", // No image tag found in this section in the attached file
    icon: "❤️",
  },
  {
    head: "Engagement💍",
    bodyText: "Under the stars, forever began.",
    type: "engagement",
    imageURL: "assets/images/engagement_1.png", // No image tag found in this section in the attached file
    icon: "💍",
  },
  {
    head: "Wedding Ceremony👨🏻‍❤️‍👩🏻",
    bodyText: "Sunset Garden Hall · 4:00 PM",
    type: "ceremony",
    imageURL: "assets/images/wedding_1.png", // No image tag found in this section in the attached file
    icon: "⛪",
  },
  {
    head: "Reception🥂",
    bodyText: "Grand Ballroom · 6:00 PM",
    type: "reception",
    imageURL: "assets/images/reception.png",
    icon: "🥂",
  },
];

function createSection(section) {
  // Only add image if imageURL exists
  const imgTag = section.imageURL
    ? `<img class="bg-img" src="${section.imageURL}" alt="${section.head} Background" />`
    : "";

  // Panel class for all except hero
  const panelClass =
    section.type === "hero" ? "hero" : `panel image-panel ${section.type}`;

  // Section HTML
  return `
    <section class="${panelClass}">
      ${section.type !== "hero" ? '<div class="overlay-dark"></div>' : ""}
      ${imgTag}
      <div class="overlay-dark"></div>
      <div class="inner">
        <h2>${section.head}</h2>
        <p>${section.bodyText}</p>
      </div>
      ${
        section.type === "reception"
          ? `<footer><div class="footer-inner"><p>Emma & Liam ❤️ 2026</p></div></footer>`
          : ""
      }
    </section>
  `;
}

// Remove existing panels except hero
document.title = "Emma & Liam | Wedding Invitation";
document.querySelectorAll(".panel.image-panel").forEach((el) => el.remove());
window.onload = function () {
  window.scrollTo(0, 0); // Scrolls to top-left corner
};
// Insert sections in order after hero
const heroSection = document.querySelector(".hero");
let lastInserted = heroSection;
sectionsData.forEach((section) => {
  if (section.type !== "hero") {
    const html = createSection(section);
    lastInserted.insertAdjacentHTML("afterend", html);
    // Update lastInserted to the newly added section
    lastInserted = lastInserted.nextElementSibling;
  }
});

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', function () {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 10);
});

// REVEAL PANELS
function revealPanels() {
  document.querySelectorAll(".panel .inner").forEach((inner) => {
    const top = inner.getBoundingClientRect().top;
    const bottom = inner.getBoundingClientRect().bottom;
    // If any part of the panel is visible
    if (top < window.innerHeight - 100 && bottom > 100) {
      inner.classList.add("active");
    } else {
      inner.classList.remove("active");
    }
  });
}

// Call revealPanels only after DOM is fully loaded and sections are inserted
window.addEventListener("DOMContentLoaded", () => {
  revealPanels();
  window.addEventListener("scroll", revealPanels);
});