/* =================================
   UNSEEN ART — ARTWORK VIEWER
================================= */

document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("art-gallery");
    const modal = document.getElementById("artwork-modal");
    const closeButton = document.getElementById("artwork-modal-close");
  
    const modalImage = document.getElementById("modal-artwork-image");
    const modalTitle = document.getElementById("modal-artwork-title");
    const modalDate = document.getElementById("modal-artwork-date");
    const modalDescription = document.getElementById("modal-artwork-description");
  
    if (!gallery || !modal || !closeButton) return;
  
    let previousFocus = null;
  
    // 作品を開く
    gallery.addEventListener("click", (event) => {
      const card = event.target.closest(".artwork-card");
  
      if (!card) return;
  
      const image = card.querySelector("img");
  
      if (!image) return;
  
      previousFocus = document.activeElement;
  
      modalImage.src = image.src;
      modalImage.alt = image.alt || "";
  
      modalTitle.textContent = card.dataset.title || "Untitled";
      modalDate.textContent = card.dataset.date || "";
      modalDescription.textContent = card.dataset.description || "";
  
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
  
      document.body.style.overflow = "hidden";
      closeButton.focus();
    });
  
    // モーダルを閉じる
    function closeArtworkModal() {
      if (!modal.classList.contains("is-open")) return;
  
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
  
      document.body.style.overflow = "";
  
      if (previousFocus) {
        previousFocus.focus();
      }
    }
  
    closeButton.addEventListener("click", closeArtworkModal);
  
    // 背景をクリックして閉じる
    modal.addEventListener("click", (event) => {
      if (event.target.classList.contains("artwork-modal-backdrop")) {
        closeArtworkModal();
      }
    });
  
    // Escapeキーで閉じる
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeArtworkModal();
      }
    });
  });
/* =================================
   UNSEEN ART — GALLERY RENDER
================================= */

document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("art-gallery");
    const artworkData = window.artworkData || [];
  
    if (!gallery) return;
  
    // 作品データがない場合
    if (artworkData.length === 0) {
      gallery.innerHTML = `
        <p class="art-gallery-empty">
          New artworks will be revealed beneath the moon.
        </p>
      `;
      return;
    }
  
    // 作品カードを生成
    artworkData.forEach((artwork) => {
      const card = document.createElement("button");
  
      card.type = "button";
      card.className = "artwork-card";
  
      card.dataset.title = artwork.title || "Untitled";
      card.dataset.date = artwork.date || "";
      card.dataset.description = artwork.description || "";
  
      const image = document.createElement("img");
      image.src = artwork.image;
      image.alt = artwork.title || "Artwork";
      image.loading = "lazy";
  
      const info = document.createElement("div");
      info.className = "artwork-info";
  
      const title = document.createElement("h3");
      title.textContent = artwork.title || "Untitled";
  
      const date = document.createElement("p");
      date.textContent = artwork.date || "";
  
      info.appendChild(title);
      info.appendChild(date);
  
      card.appendChild(image);
      card.appendChild(info);
  
      gallery.appendChild(card);
    });
  });