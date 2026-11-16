/* =========================================
   SPECIAL PAGE
   The Secret Garden — Gate Animation
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const openButton = document.getElementById("open-gate");
    const gateSection = document.querySelector(".special-gate");
    const gardenLetter = document.querySelector(".garden-letter");
  
    if (!openButton || !gateSection || !gardenLetter) {
      console.error("Secret Garden: 必要な要素が見つかりません。");
      return;
    }
  
    openButton.addEventListener("click", () => {
  
      // 二重クリック防止
      if (gateSection.classList.contains("gate-opening")) {
        return;
      }
  
      // 門を開く
      gateSection.classList.add("gate-opening");
  
      openButton.disabled = true;
      openButton.querySelector("span:first-child").textContent =
        "THE GARDEN IS OPEN";
  
      // 演出後に歓迎の手紙へ移動
      window.setTimeout(() => {
        gardenLetter.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 1800);
  
    });
  
  });
/* =========================================
   GARDEN LETTER — ENVELOPE OPENING
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const envelopeButton = document.getElementById("envelope-trigger");
    const envelopeArea = document.getElementById("envelope-area");
    const letterContent = document.getElementById("letter-content");
  
    if (!envelopeButton || !envelopeArea || !letterContent) {
      console.error("Garden Letter: 必要な要素が見つかりません。");
      return;
    }
  
    envelopeButton.addEventListener("click", () => {
  
      // 二重クリック防止
      if (envelopeButton.disabled) return;
  
      envelopeButton.disabled = true;
  
      // 封筒をふわっと消す
      envelopeArea.classList.add("envelope-closing");
  
      window.setTimeout(() => {
  
        // 封筒を隠す
        envelopeArea.hidden = true;
  
        // 手紙を表示
        letterContent.hidden = false;
        letterContent.classList.add("is-opening");
  
        // 開封済みにする
        envelopeButton.setAttribute("aria-expanded", "true");
  
        // 手紙までスクロール
        window.setTimeout(() => {
          letterContent.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }, 300);
  
      }, 650);
  
    });
  
  });
/* =========================================
   SECRET ARCHIVE — MODAL SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const archiveCards = document.querySelectorAll(".archive-card");
  const archiveModal = document.getElementById("archive-modal");
  const modalClose = document.getElementById("archive-modal-close");

  const modalCategory = document.getElementById("archive-modal-category");
  const modalTitle = document.getElementById("archive-modal-title");
  const modalBody = document.getElementById("archive-modal-body");

  if (!archiveModal || !modalClose) return;

  const archiveContents = {
    notice: {
      category: "SPECIAL NOTICE",
      title: "月夜の庭からのお知らせ",
      body: `
        <p>ようこそ、月夜の庭へ。</p>
        <p>この庭を訪れてくださり、ありがとうございます。</p>
        <p>ここでは、カレン・セルビアからの大切なお知らせや、特別なご案内をお届けします。</p>
        <p>どうぞ、これからも月明かりの下でお会いしましょう。</p>
      `
    },

    memorial: {
      category: "MEMORIAL CONTENT",
      title: "ホームページ開設を記念して",
      body: `
        <p>ひとつひとつの出逢いが、今日までの物語を紡いできました。</p>
        <p>笑顔も、言葉も、共に過ごした時間も。</p>
        <p>ここには、かけがえのない記憶を少しずつ残していきます。</p>
        <p>これからも、どうぞ一緒に歩んでください。</p>
      `
    },

    family: {
      category: "FAMILY PROJECT",
      title: "次の企画について",
      body: `
        <p>秘密の庭では、新しい物語が静かに動き始めています。</p>
        <p>次の企画については、現在準備中です。</p>
        <p>詳細は、もう少しだけお待ちください。</p>
        <p>どうぞ楽しみにお待ちくださいね。</p>
      `
    }
  };

  function openArchive(key) {
    const content = archiveContents[key];
    if (!content) return;

    modalCategory.textContent = content.category;
    modalTitle.textContent = content.title;
    modalBody.innerHTML = content.body;

    archiveModal.classList.add("is-open");
    archiveModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    modalClose.focus();
  }

  function closeArchive() {
    archiveModal.classList.remove("is-open");
    archiveModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  archiveCards.forEach((card) => {
    card.addEventListener("click", () => {
      openArchive(card.dataset.archive);
    });
  });

  modalClose.addEventListener("click", closeArchive);

  archiveModal.querySelectorAll("[data-close-archive]").forEach((element) => {
    element.addEventListener("click", closeArchive);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && archiveModal.classList.contains("is-open")) {
      closeArchive();
    }
  });

});
/* =================================
   GOLDEN STARDUST EFFECT
================================= */

document.addEventListener("DOMContentLoaded", () => {
  const gate = document.querySelector(".special-gate");
  const gateFrame = document.querySelector(".gate-frame");
  const openButton = document.getElementById("open-gate");

  if (!gate || !gateFrame || !openButton) return;

  // 星粒の入れ物を作成
  const sparkleContainer = document.createElement("div");
  sparkleContainer.className = "golden-stardust";
  sparkleContainer.setAttribute("aria-hidden", "true");

  gateFrame.appendChild(sparkleContainer);

  // 星粒を生成
  for (let i = 0; i < 65; i++) {
    const star = document.createElement("span");

    star.className = "golden-star";
    star.textContent = Math.random() > 0.5 ? "✦" : "✧";

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${45 + Math.random() * 55}%`;
    star.style.setProperty("--delay", `${Math.random() * 1.8}s`);
    star.style.setProperty("--duration", `${2 + Math.random() * 3}s`);
    star.style.setProperty("--size", `${8 + Math.random() * 13}px`);
    star.style.setProperty("--drift", `${Math.random() * 100 - 50}px`);

    sparkleContainer.appendChild(star);
  }

  // 門が開くと星粒が舞う
  openButton.addEventListener("click", () => {
    sparkleContainer.classList.add("is-active");
  });
});
