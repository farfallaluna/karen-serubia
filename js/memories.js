/* =========================================
   MEMORIES SYSTEM
   THE ARCHIVE OF MOONLIGHT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const memoryGrid = document.getElementById("memory-grid");
    const filterButtons = document.querySelectorAll(".memory-filter");
  
    const memories = window.memoriesData || [];
  
    if (!memoryGrid) return;
  
  
    /* -----------------------------------------
       DATE FORMAT
    ----------------------------------------- */
  
    function formatDate(dateString) {
      return dateString.replace(/-/g, ".");
    }
  
  
    /* -----------------------------------------
       CREATE MEMORY CARD
    ----------------------------------------- */
  
    function renderMemories(category = "ALL") {
  
      const filteredMemories = category === "ALL"
        ? memories
        : memories.filter(memory => memory.category === category);
  
      memoryGrid.innerHTML = "";
  
      filteredMemories.forEach(memory => {
  
        const card = document.createElement("button");
        card.className = "memory-card";
        card.type = "button";
  
        const imagePath = memory.thumbnail || memory.image;
  
        card.innerHTML = `
          <div class="memory-card-image">
            ${
              imagePath
                ? `<img src="${imagePath}" alt="${memory.title}">`
                : `<div class="memory-image-placeholder">☾</div>`
            }
          </div>
  
          <div class="memory-card-info">
            <span class="memory-card-category">${memory.category}</span>
            <h3>${memory.title}</h3>
            <time>${formatDate(memory.date)}</time>
          </div>
        `;
  
        card.addEventListener("click", () => {
          openMemoryLetter(memory);
        });
  
        memoryGrid.appendChild(card);

      });

      // 新しく生成されたカードもスクロール監視に登録
      if (typeof window.observeMemoryCards === "function") {
        window.observeMemoryCards();
      }

    }
  
  
    /* -----------------------------------------
       FILTER BUTTONS
    ----------------------------------------- */
  
    filterButtons.forEach(button => {
  
      button.addEventListener("click", () => {
  
        const selectedCategory = button.dataset.filter;
  
        filterButtons.forEach(filter => {
          filter.classList.remove("active");
          filter.setAttribute("aria-pressed", "false");
        });
  
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");
  
        renderMemories(selectedCategory);
  
      });
  
    });
  
  
    /* -----------------------------------------
       MEMORY LETTER MODAL
    ----------------------------------------- */
  
    function openMemoryLetter(memory) {
  
      let modal = document.getElementById("memory-modal");
  
      if (!modal) {
  
        modal = document.createElement("div");
        modal.id = "memory-modal";
        modal.className = "memory-modal";
        modal.setAttribute("aria-hidden", "true");
  
        document.body.appendChild(modal);
  
      }
  
      const imagePath = memory.image || memory.thumbnail;
  
      modal.innerHTML = `
        <div class="memory-letter-inner" role="dialog" aria-modal="true" aria-label="Memory Letter">
  
          <button class="memory-letter-close" type="button" aria-label="閉じる">
            ×
          </button>
  
          <div class="memory-letter-content">
  
            <div class="memory-letter-image">
              ${
                imagePath
                  ? `<img src="${imagePath}" alt="${memory.title}">`
                  : `<div class="memory-image-placeholder">☾</div>`
              }
            </div>
  
            <div class="memory-letter-text">
  
              <p class="memory-letter-eyebrow">A MEMORY FROM THE MOONLIT NIGHTS</p>
  
              <span class="memory-letter-category">${memory.category}</span>
  
              <time class="memory-letter-date">${formatDate(memory.date)}</time>
  
              <h2>${memory.title}</h2>
  
              <p class="memory-letter-message">${memory.message}</p>
  
              <div class="memory-letter-signature">
                With love,<br>
                <span>Karen Serubia</span>
              </div>
  
            </div>
  
          </div>
  
        </div>
      `;
  
      modal.classList.add("is-active");
      modal.setAttribute("aria-hidden", "false");
  
      document.body.style.overflow = "hidden";
  
  
      /* Close button */
  
      const closeButton = modal.querySelector(".memory-letter-close");
  
      closeButton.addEventListener("click", closeMemoryLetter);
  
  
      /* Click outside the letter */
  
      modal.addEventListener("click", (event) => {
  
        if (event.target === modal) {
          closeMemoryLetter();
        }
  
      });
  
    }
  
  
    /* -----------------------------------------
       CLOSE MEMORY LETTER
    ----------------------------------------- */
  
    function closeMemoryLetter() {
  
      const modal = document.getElementById("memory-modal");
  
      if (!modal) return;
  
      modal.classList.remove("is-active");
      modal.setAttribute("aria-hidden", "true");
  
      document.body.style.overflow = "";
  
    }
  
  
    /* -----------------------------------------
       ESC KEY
    ----------------------------------------- */
  
    document.addEventListener("keydown", (event) => {
  
      if (event.key === "Escape") {
        closeMemoryLetter();
      }
  
    });
  
  
    /* -----------------------------------------
       INITIAL DISPLAY
    ----------------------------------------- */
  
    renderMemories("ALL");
  
  });
/* =========================================
   PETAL GENERATOR
   CONTINUOUS FLOW
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector(".petal-container");
    const hero = document.querySelector(".memories-hero");
  
    if (!container || !hero) return;
  
    const petalCount = 32;
  
    // HEROの高さを取得
    const heroHeight = hero.offsetHeight;
  
    for (let i = 0; i < petalCount; i++) {
  
      const petal = document.createElement("span");
  
      petal.className = "memory-petal";
  
      // 花びらの発生位置
      const startX = (Math.random() - 0.5) * 180;
      const startY = heroHeight * 0.58;
  
      // 花びらが舞い散る距離
      const driftX = (Math.random() - 0.5) * 900;
      const driftY = 900 + Math.random() * 600;
  
      const spin = (Math.random() - 0.5) * 1000;
      const duration = 8 + Math.random() * 7;
      const delay = Math.random() * -14;
      const scale = 0.6 + Math.random() * 1.1;
  
      petal.style.left = `calc(50% + ${startX}px)`;
      petal.style.top = `${startY}px`;
  
      petal.style.setProperty("--drift-x", `${driftX}px`);
      petal.style.setProperty("--drift-y", `${driftY}px`);
      petal.style.setProperty("--spin", `${spin}deg`);
      petal.style.setProperty("--duration", `${duration}s`);
      petal.style.setProperty("--delay", `${delay}s`);
      petal.style.setProperty("--scale", scale);
  
      container.appendChild(petal);
  
    }
  
  });
/* =========================================
   MEMORY CARD SCROLL REVEAL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }

    });

  }, {
    threshold: 0.15
  });

  // いつでも新しいカードを監視できるようにする
  window.observeMemoryCards = () => {

    document.querySelectorAll(".memory-card:not(.is-visible)")
      .forEach((card) => {
        observer.observe(card);
      });

  };

  // 初回表示
  window.observeMemoryCards();

});
 