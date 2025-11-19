const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const root = document.documentElement;
const modeToggle = document.getElementById("modeToggle");
const modeIcon = modeToggle?.querySelector(".mode-icon");
const yearEl = document.getElementById("year");

const storageKey = "portfolio-theme";

const setTheme = (theme) => {
  if (theme === "light") {
    root.classList.add("light");
    if (modeIcon) modeIcon.textContent = "🌙";
  } else {
    root.classList.remove("light");
    if (modeIcon) modeIcon.textContent = "☀️";
  }
  localStorage.setItem(storageKey, theme);
};

const savedTheme = localStorage.getItem(storageKey);
const initialTheme = savedTheme || (prefersLight ? "light" : "dark");
setTheme(initialTheme);

modeToggle?.addEventListener("click", () => {
  const next = root.classList.contains("light") ? "dark" : "light";
  setTheme(next);
});

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Scroll reveal
const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

// Count-up animation for hero stats

/* 
const counters = document.querySelectorAll("[data-count]");

const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10);
  let current = 0;
  const duration = 800;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    current = Math.floor(progress * target);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 1 }
);

counters.forEach((el) => counterObserver.observe(el));

*/
