// Optional tiny enhancement: pause decorative movement when the tab is hidden.
document.addEventListener("visibilitychange", () => {
  document.querySelectorAll(".motion-layer img").forEach((item) => {
    item.style.animationPlayState = document.hidden ? "paused" : "running";
  });
});
// Scroll Reveal
const revealElements = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach((element) => {
  revealObserver.observe(element);
});