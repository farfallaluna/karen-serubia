/* =========================================
   HIDDEN ROOM — MIST MOTION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------
       共通：スクロールで霞から現れる演出
    ----------------------------------------- */
  
    function setupMistReveal(
      sectionSelector,
      targetSelector,
      hiddenClass,
      visibleClass,
      delayVariable,
      stagger = 350,
      threshold = 0.2
    ) {
  
      const section = document.querySelector(sectionSelector);
  
      if (!section) return;
  
      const targets = Array.from(
        section.querySelectorAll(targetSelector)
      );
  
      if (targets.length === 0) return;
  
      // 最初は非表示にする
      targets.forEach((element, index) => {
  
        element.classList.add(hiddenClass);
  
        element.style.setProperty(
          delayVariable,
          `${index * stagger}ms`
        );
  
      });
  
      // アニメーション終了後、表示状態を保持
      function revealElement(element) {
  
        element.addEventListener("animationend", (event) => {
  
          if (event.target !== element) return;
  
          element.classList.add("is-mist-revealed");
  
        }, { once: true });
  
        element.classList.add(visibleClass);
  
      }
  
      // セクションが画面に入ったら表示
      const observer = new IntersectionObserver((entries) => {
  
        entries.forEach(entry => {
  
          if (!entry.isIntersecting) return;
  
          targets.forEach(element => {
            revealElement(element);
          });
  
          // 一度表示したら監視を終了
          observer.unobserve(entry.target);
  
        });
  
      }, {
        threshold: threshold
      });
  
      observer.observe(section);
  
    }
  
  
    /* =========================================
       HERO — INITIAL MIST REVEAL
    ========================================= */
  
    const heroTexts = [
      document.querySelector(".hidden-hero .eyebrow"),
      document.querySelector(".hidden-hero h1"),
      document.querySelector(".hidden-hero .hidden-moon"),
      document.querySelector(".hidden-hero h2"),
      document.querySelector(".hidden-hero .hidden-description")
    ].filter(Boolean);
  
    heroTexts.forEach((element, index) => {
  
      element.style.setProperty(
        "--mist-delay",
        `${index * 650}ms`
      );
  
      element.addEventListener("animationend", (event) => {
  
        if (event.target !== element) return;
  
        element.classList.add("is-mist-revealed");
  
      }, { once: true });
  
      element.classList.add("mist-visible");
  
    });
  
    // HEROタイトルの呼吸する光
    const heroTitle = document.querySelector(".hidden-hero h1");
  
    if (heroTitle) {
  
      setTimeout(() => {
        heroTitle.classList.add("mist-breathing");
      }, 4500);
  
    }
  
  
    /* =========================================
       TREASURES — MIST REVEAL
    ========================================= */
  
    setupMistReveal(
      ".hidden-treasures",
      ".eyebrow, h2, .hidden-section-description, .treasure-card",
      "treasure-mist-hidden",
      "treasure-mist-visible",
      "--treasure-delay",
      350,
      0.2
    );
  
  
    /* =========================================
       UNSEEN ART — MIST REVEAL
    ========================================= */
  
    setupMistReveal(
      ".hidden-art",
      ".hidden-eyebrow, h2, .hidden-section-heading > p:last-child, .artwork-card, .art-gallery-note",
      "art-mist-hidden",
      "art-mist-visible",
      "--art-delay",
      350,
      0.15
    );
  
  
    /* =========================================
       PRIVATE LETTER — MIST REVEAL
    ========================================= */
  
    setupMistReveal(
      ".hidden-message",
      ".eyebrow, h2, .message-moon, .hidden-message-frame > p",
      "message-mist-hidden",
      "message-mist-visible",
      "--message-mist-delay",
      450,
      0.2
    );
  
  
    /* =========================================
       RETURN — FINAL MIST REVEAL
    ========================================= */
  
    setupMistReveal(
      ".hidden-ending",
      ".ending-moon, h2, p, .return-garden",
      "ending-mist-hidden",
      "ending-mist-visible",
      "--ending-delay",
      500,
      0.2
    );
  
  });  