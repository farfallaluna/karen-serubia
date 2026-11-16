/* =========================================
   LETTER SYSTEM
   Karen Serubia — The Moonlit Sanctuary
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const letterList = document.getElementById("letter-list");
    const letters = window.letterData || [];
  
    if (!letterList) return;
  
  
    /* =========================================
       LETTER LIST
    ========================================= */
  
    function renderLetters() {
  
      letterList.innerHTML = "";
  
      letters.forEach((letter) => {
  
        const item = document.createElement("button");
  
        item.className = "letter-item";
        item.type = "button";
  
        item.innerHTML = `
          <div class="letter-seal">KS</div>
  
          <div class="letter-item-content">
  
            <div class="letter-meta">
              <span>${letter.date}</span>
              <span>${letter.category}</span>
            </div>
  
            <h3>${letter.title}</h3>
  
          </div>
  
          <span class="letter-arrow">→</span>
        `;
  
        item.addEventListener("click", () => {
          openLetter(letter);
        });
  
        letterList.appendChild(item);
  
      });
  
    }
  
  
    /* =========================================
       LETTER DETAIL
    ========================================= */
  
    function openLetter(letter) {
  
      closeLetter();
  
      const overlay = document.createElement("div");
  
      overlay.className = "letter-modal";
      overlay.id = "letter-modal";
  
      overlay.innerHTML = `
        <div class="letter-modal-inner">
  
          <button
            class="letter-modal-close"
            type="button"
            aria-label="Close">
            ×
          </button>
  
          <div class="letter-paper">
  
            <p class="letter-paper-eyebrow">
              A SMALL NOTE
            </p>
  
            <p class="letter-paper-date">
              ${letter.date}
            </p>
  
            <h2>${letter.heading || letter.title}</h2>
  
            <div class="letter-paper-divider">☾</div>
  
            <p class="letter-paper-message">
              ${letter.message.trim().replace(/\n\s*/g, "<br>")}
            </p>
  
            <p class="letter-paper-signature">
              Karen Serubia
            </p>
  
          </div>
  
        </div>
      `;
  
      document.body.appendChild(overlay);
  
      requestAnimationFrame(() => {
        overlay.classList.add("is-active");
      });
  
      document.body.classList.add("letter-modal-open");
  
      overlay.querySelector(".letter-modal-close")
        .addEventListener("click", closeLetter);
  
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
          closeLetter();
        }
      });
  
    }
  
  
    /* =========================================
       CLOSE LETTER
    ========================================= */
  
    function closeLetter() {
  
      const overlay = document.getElementById("letter-modal");
  
      if (overlay) {
        overlay.remove();
      }
  
      document.body.classList.remove("letter-modal-open");
  
    }
  
  
    /* =========================================
       ESC KEY
    ========================================= */
  
    document.addEventListener("keydown", (event) => {
  
      if (event.key === "Escape") {
        closeLetter();
      }
  
    });
  
  
    /* INITIALIZE */
    renderLetters();
  
  });