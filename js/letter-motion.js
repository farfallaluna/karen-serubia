/* =========================================
   LETTER MOTION
   Karen Serubia — The Moonlit Sanctuary
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       HERO TYPEWRITER
    ===================================== */
  
    const heroTitle = document.querySelector(".letter-hero h1");
  
    if (!heroTitle) return;
  
    const originalText = heroTitle.textContent.trim();
  
    heroTitle.textContent = "";
    heroTitle.classList.add("is-typing");
  
    let index = 0;
  
    function typeCharacter() {
  
      if (index < originalText.length) {
  
        heroTitle.textContent += originalText[index];
  
        index++;
  
        setTimeout(typeCharacter, 85);
  
      } else {
  
        heroTitle.classList.remove("is-typing");
        heroTitle.classList.add("typing-complete");
  
      }
  
    }
  
    setTimeout(typeCharacter, 700);
  
  });
/* =========================================
   OTHER TEXT MOTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------------
       1. HERO SUBTITLE & DESCRIPTION
    ------------------------------------- */
  
    const heroTexts = [
      document.querySelector(".letter-hero h2"),
      document.querySelector(".letter-hero .hero-description")
    ].filter(Boolean);
  
    heroTexts.forEach((element, index) => {
      element.classList.add("letter-soft-hidden");
      element.style.setProperty("--text-delay", `${index * 500}ms`);
    });
  
    const heroObserver = new MutationObserver(() => {
      const title = document.querySelector(".letter-hero h1");
  
      if (title && title.classList.contains("typing-complete")) {
        heroTexts.forEach(element => {
          element.classList.add("letter-soft-visible");
        });
  
        heroObserver.disconnect();
      }
    });
  
    const heroTitle = document.querySelector(".letter-hero h1");
  
    if (heroTitle) {
      heroObserver.observe(heroTitle, {
        attributes: true,
        attributeFilter: ["class"]
      });
    }
  
  
    /* -------------------------------------
       2. SCROLL TEXT REVEAL
    ------------------------------------- */
  
    const revealTargets = [
      ...document.querySelectorAll(
        ".letter-index .section-heading, .letter-rose, .letter-closing-inner > *"
      ),
      ...document.querySelectorAll(".letter-item")
    ];
  
    revealTargets.forEach((element, index) => {
      element.classList.add("letter-scroll-hidden");
      element.style.setProperty(
        "--scroll-delay",
        `${(index % 5) * 150}ms`
      );
    });
  
    const scrollObserver = new IntersectionObserver((entries, observer) => {
  
      entries.forEach(entry => {
  
        if (!entry.isIntersecting) return;
  
        entry.target.classList.add("letter-scroll-visible");
        observer.unobserve(entry.target);
  
      });
  
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -35px 0px"
    });
  
    revealTargets.forEach(element => {
      scrollObserver.observe(element);
    });
  
  
    /* -------------------------------------
       3. LETTER MODAL TYPEWRITER
    ------------------------------------- */
  
  
function animateLetterMessage(message) {

  if (!message || message.dataset.typed === "true") return;

  message.dataset.typed = "true";

  // 本文を取得
  const originalText = message.textContent.trim();
  const lines = originalText.split(/\r?\n/);

  // 本文を一度クリア
  message.textContent = "";

  const characters = [];

  lines.forEach((line, lineIndex) => {

    Array.from(line).forEach(character => {

      const span = document.createElement("span");
      span.textContent = character;
      span.className = "letter-typed-character";

      message.appendChild(span);
      characters.push(span);

    });

    if (lineIndex < lines.length - 1) {
      message.appendChild(document.createElement("br"));
    }

  });

  // 一文字ずつ表示
  characters.forEach((character, index) => {

    setTimeout(() => {
      character.classList.add("is-written");
    }, index * 25);

  });

}

  
  
    /* -------------------------------------
       4. WATCH MODAL OPEN
    ------------------------------------- */
  
    const modalObserver = new MutationObserver(() => {
  
      const message = document.querySelector(
        ".letter-modal .letter-paper-message"
      );
  
      if (message) {
        animateLetterMessage(message);
      }
  
    });
  
    modalObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  
  });