/* =========================================
   MEMORIES — CLOSING SCROLL MOTION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const closing = document.querySelector(".memories-closing");
  
    if (!closing) return;
  
    const butterfly = closing.querySelector(".closing-butterfly");
    const english = closing.querySelector("p:first-of-type");
    const japanese = closing.querySelector("h2");
    const signature = closing.querySelector(".closing-signature");
    const divider = closing.querySelector(".moon-divider");
  
    const targets = [
      butterfly,
      english,
      japanese,
      divider,
      signature
    ].filter(Boolean);
  
    // 初期状態
    targets.forEach((element, index) => {
      element.classList.add("closing-reveal");
  
      element.style.setProperty(
        "--reveal-delay",
        `${index * 350}ms`
      );
    });
  
    // スクロールで表示
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
  
          if (!entry.isIntersecting) return;
  
          closing.classList.add("is-closing-visible");
  
          targets.forEach((element) => {
            element.classList.add("is-revealed");
          });
  
          observer.unobserve(closing);
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -40px 0px"
      }
    );
  
    observer.observe(closing);
  
  });
  