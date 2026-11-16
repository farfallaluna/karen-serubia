document.addEventListener("DOMContentLoaded", () => {
    // Music Boxの要素を取得
    const audio = document.getElementById("bgm");
    const playButton = document.getElementById("play-button");
    const seek = document.getElementById("seek");
    const currentTimeText = document.getElementById("current-time");
    const durationText = document.getElementById("duration");
    const musicStatus = document.getElementById("music-status");
  
    // 必要な要素がなければ終了
    if (!audio || !playButton || !seek) return;
  
    // 秒数を「分:秒」に変換
    function formatTime(seconds) {
      if (!Number.isFinite(seconds)) return "0:00";
  
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
  
      return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
    }
  
    // 再生・一時停止
    playButton.addEventListener("click", async () => {
      if (audio.paused) {
        try {
          await audio.play();
        } catch (error) {
          musicStatus.textContent = "音源を再生できません。ファイルの場所を確認してください。";
          console.error("音源の再生に失敗しました:", error);
        }
      } else {
        audio.pause();
      }
    });
  
    // 再生状態に合わせてボタンを変更
    audio.addEventListener("play", () => {
      playButton.textContent = "Ⅱ";
      playButton.setAttribute("aria-label", "音楽を一時停止");
      musicStatus.textContent = "Now Playing · Moonlit Prayer";
    });
  
    audio.addEventListener("pause", () => {
      playButton.textContent = "▶";
      playButton.setAttribute("aria-label", "音楽を再生");
      if (!audio.ended) {
        musicStatus.textContent = "一時停止中";
      }
    });
  
    // 音源の長さを取得
    audio.addEventListener("loadedmetadata", () => {
      seek.max = audio.duration;
      durationText.textContent = formatTime(audio.duration);
    });
  
    // 再生時間を更新
    audio.addEventListener("timeupdate", () => {
      seek.value = audio.currentTime;
      currentTimeText.textContent = formatTime(audio.currentTime);
    });
  
    // シークバーで再生位置を変更
    seek.addEventListener("input", () => {
      audio.currentTime = Number(seek.value);
    });
  
    // 再生終了
    audio.addEventListener("ended", () => {
      playButton.textContent = "▶";
      playButton.setAttribute("aria-label", "音楽を再生");
      musicStatus.textContent = "再生が終了しました";
      seek.value = 0;
      currentTimeText.textContent = "0:00";
    });
  
    // 音源の読み込みエラー
    audio.addEventListener("error", () => {
      musicStatus.textContent = "音源を読み込めません。ファイルの場所を確認してください。";
    });
  });
// =================================
// MOBILE MENU
// =================================

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const globalNav = document.querySelector(".global-nav");

  if (!menuToggle || !globalNav) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "メニューを開く" : "メニューを閉じる"
    );

    globalNav.classList.toggle("is-open", !isOpen);
  });

  globalNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "メニューを開く");
      globalNav.classList.remove("is-open");
    });
  });
});
