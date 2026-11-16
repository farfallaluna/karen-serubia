
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".activity-card");
  
    cards.forEach((card) => {
      const button = card.querySelector(".activity-trigger");
      const detail = card.querySelector(".activity-detail");
      const label = card.querySelector(".activity-open");
  
      if (!button || !detail) return;
  
      button.addEventListener("click", () => {
        const isOpen = card.classList.contains("is-open");
  
        // すべてのカードを閉じる
        cards.forEach((otherCard) => {
          otherCard.classList.remove("is-open");
  
          const otherButton =
            otherCard.querySelector(".activity-trigger");
          const otherDetail =
            otherCard.querySelector(".activity-detail");
          const otherLabel =
            otherCard.querySelector(".activity-open");
  
          if (otherButton) {
            otherButton.setAttribute("aria-expanded", "false");
          }
  
          if (otherDetail) {
            otherDetail.hidden = true;
          }
  
          if (otherLabel) {
            otherLabel.textContent = "READ MORE　＋";
          }
        });
  
        // クリックしたカードを開く
        if (!isOpen) {
          card.classList.add("is-open");
          button.setAttribute("aria-expanded", "true");
          detail.hidden = false;
  
          if (label) {
            label.textContent = "CLOSE　－";
          }
        }
      });
    });
  });
  
  