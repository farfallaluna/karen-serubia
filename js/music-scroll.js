document.addEventListener("DOMContentLoaded", () => {

    // スクロールで登場させる要素
    const revealTargets = document.querySelectorAll(
      ".music-section-heading, " +
      ".track-item, " +
      ".music-decoration, " +
      ".music-policy-inner, " +
      ".about-footer"
    );
  
    // 対象に演出用クラスを追加
    revealTargets.forEach((element, index) => {
      element.classList.add("music-reveal");
  
      // 楽曲カードは少しずつ時間差をつける
      if (element.classList.contains("track-item")) {
        element.style.transitionDelay = `${(index % 3) * 0.18}s`;
      }
    });
  
    // ブラウザが対応していない場合
    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach(element => {
        element.classList.add("is-visible");
      });
      return;
    }
  
    // 画面に入ったかどうかを監視
    const observer = new IntersectionObserver((entries, observer) => {
  
      entries.forEach(entry => {
  
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
  
          // 一度表示した要素は再監視しない
          observer.unobserve(entry.target);
        }
  
      });
  
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px"
    });
  
    revealTargets.forEach(element => {
      observer.observe(element);
    });
  
  });
  