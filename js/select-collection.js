
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".sc-card");
    const modal = document.getElementById("collection-modal");
  
    if (!modal) return;
  
    const closeButton = modal.querySelector(".sc-modal-close");
    const overlay = modal.querySelector(".sc-modal-overlay");
  
    const category = document.getElementById("modal-category");
    const title = document.getElementById("modal-title");
    const subtitle = document.getElementById("modal-subtitle");
    const mainImage = document.getElementById("modal-main-image");
    const description = document.getElementById("modal-description");
    const gallery = document.getElementById("modal-gallery");
    const extra = document.getElementById("modal-extra");

  
    const collections = {
      "visual-poetry": {
        category: "ART & DESIGN",
        title: "Visual Poetry",
        subtitle: "心を惹きつける、美しい断片。",
        extra: [
            {
              type: "text",
              content: "美しいと感じた瞬間を、ひとつずつ集めて。"
            },
            {
              type: "image",
              src: "images/collection-visual-poetry-01.png",
              title: "Visual Poetry"
            }
          ],
        image: "images/collection-visual-poetry.png",
        description: "色彩、造形、光と影。心を惹きつけた美しい作品やデザインを集めたコレクション。",
        gallery: [
          "images/collection-visual-poetry-01.png",
          "images/collection-visual-poetry-02.png",
          "images/collection-visual-poetry-03.png"
        ],
        link: "#"
      },
  
      "melodies": {
        category: "MUSIC & SOUND",
        title: "Melodies of My Soul",
        subtitle: "心に響く、忘れられない旋律。",
        extra: [],
        image: "images/collection-melodies.jpg",
        description: "歌声や旋律、記憶に残る音楽。心に寄り添い、感情を彩る音のコレクション。",
        gallery: [
          "images/collection-melodies-01.png",
          "images/collection-melodies-02.png",
          "images/collection-melodies-03.png"
        ],
        link: "#"
      },
  
      "fragments": {
        category: "WORDS & BOOKS",
        title: "Fragments of Words",
        subtitle: "心に残る、言葉の欠片。",
        extra: [],
        image: "images/collection-fragments.png",
        description: "何度も読み返したい言葉や物語。心に残った文章を集めたコレクション。",
        gallery: [
          "images/collection-fragments-01.png",
          "images/collection-fragments-02.png",
          "images/collection-fragments-03.png"
        ],
        link: "#"
      },
  
      "treasures": {
        category: "FAVORITES",
        title: "Little Treasures",
        subtitle: "日常に隠れた、小さな宝物。",
        extra: [],
        image: "images/collection-treasures.png",
        description: "好きなもの、大切なもの、何気ない日常の中で見つけた特別な宝物たち。",
        gallery: [
          "images/collection-treasures-01.png",
          "images/collection-treasures-02.png",
          "images/collection-treasures-03.png"
        ],
        link: "#"
      }
    };
  
    function openModal(collectionKey) {
      const data = collections[collectionKey];
  
      if (!data) return;
  
      category.textContent = data.category;
      title.textContent = data.title;
      subtitle.textContent = data.subtitle;
      mainImage.src = data.image;
      mainImage.alt = data.title;
      description.textContent = data.description;
  
      gallery.innerHTML = "";
      extra.innerHTML = "";
  
      data.gallery.forEach((imagePath) => {
        const image = document.createElement("img");
        image.src = imagePath;
        image.alt = data.title;
        gallery.appendChild(image);
      });

      data.extra.forEach((item) => {
        let element;
      
        if (item.type === "text") {
          element = document.createElement("p");
          element.textContent = item.content;
        }
      
        if (item.type === "image") {
          element = document.createElement("img");
          element.src = item.src;
          element.alt = item.title || data.title;
        }
      
        if (item.type === "video") {
          element = document.createElement("video");
          element.src = item.src;
          element.controls = true;
          element.playsInline = true;
        }
      
        if (item.type === "audio") {
          element = document.createElement("audio");
          element.src = item.src;
          element.controls = true;
        }
      
        if (element) {
          extra.appendChild(element);
        }
      });
  
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      closeButton.focus();
    }
  
    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = "";
    }
  
    cards.forEach((card) => {
      const activate = () => {
        openModal(card.dataset.collection);
      };
  
      card.addEventListener("click", activate);
  
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });
    });
  
    closeButton.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
  
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !modal.hidden) {
        closeModal();
      }
    });
  });