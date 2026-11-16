/* =================================
   FAMILY — SCROLL TEXT REVEAL
================================= */

document.addEventListener("DOMContentLoaded", () => {
    const targets = document.querySelectorAll(
      ".family-concept .section-heading, " +
      ".concept-content p, " +
      ".bonds-section .section-heading, " +
      ".bond-card, " +
      ".garden-section .section-heading, " +
      ".garden-card, " +
      ".family-message-inner"
    );
  
    // 初期状態
    targets.forEach((element) => {
      element.classList.add("family-scroll-reveal");
    });
  
    // スクロール監視
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
      }
    );
  
    targets.forEach((element) => {
      observer.observe(element);
    });
  });
  