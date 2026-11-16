document.addEventListener("DOMContentLoaded", () => {
    const tracks = window.musicData || [];
  
    const audio = document.getElementById("audio-element");
    const trackList = document.getElementById("track-list");
  
    const playerCover = document.getElementById("player-cover-image");
    const playerTitle = document.getElementById("player-title");
    const playerArtist = document.getElementById("player-artist");
  
    const prevButton = document.getElementById("prev-track");
    const playButton = document.getElementById("play-toggle");
    const nextButton = document.getElementById("next-track");
  
    const currentTimeText = document.getElementById("current-time");
    const durationText = document.getElementById("duration");
    const seekBar = document.getElementById("seek-bar");
    const volumeBar = document.getElementById("volume-bar");
  
    if (!audio || !trackList || tracks.length === 0) {
      console.error("Music Player: 必要な要素または楽曲データがありません。");
      return;
    }

    let currentTrackIndex = 0;
  
    // 時間を「分:秒」に変換
    function formatTime(seconds) {
      if (!Number.isFinite(seconds)) return "00:00";
  
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
  
      return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
      ).padStart(2, "0")}`;
    }
  
    // プレイリストを表示
    function renderPlaylist() {
      trackList.innerHTML = "";
  
      tracks.forEach((track, index) => {
        const item = document.createElement("div");
        item.className = "track-item";
        item.dataset.index = index;
  
        item.innerHTML = `
          <div class="track-cover">
            <img src="${track.cover}" alt="">
            <span class="track-number">${String(index + 1).padStart(2, "0")}</span>
          </div>
  
          <div class="track-info">
            <h3>${track.title}</h3>
            <p>${track.description}</p>
          </div>
  
          <span class="track-duration">${track.duration}</span>
  
          <button class="track-play" type="button" aria-label="再生">
            ▶
          </button>
        `;
  
        const coverImage = item.querySelector(".track-cover img");
  
        coverImage.addEventListener("error", () => {
          coverImage.style.display = "none";
        });
  
        item.querySelector(".track-play").addEventListener("click", () => {
          playTrack(index);
        });
  
        item.addEventListener("click", (event) => {
          if (!event.target.closest(".track-play")) {
            playTrack(index);
          }
        });
  
        trackList.appendChild(item);
      });
  
      updatePlaylistState();
    }
  
    // 選択中の曲を表示
    function updatePlaylistState() {
      const items = trackList.querySelectorAll(".track-item");
  
      items.forEach((item, index) => {
        const isActive = index === currentTrackIndex;
        item.classList.toggle("is-active", isActive);
  
        const button = item.querySelector(".track-play");
        button.textContent =
          isActive && !audio.paused ? "Ⅱ" : "▶";
      });
    }
  
    // プレイヤー情報を更新
    function updatePlayerInfo() {
      const track = tracks[currentTrackIndex];
  
      playerTitle.textContent = track.title;
      playerArtist.textContent = track.description;
  
      if (playerCover) {
        playerCover.src = track.cover;
        playerCover.alt = track.title;
        playerCover.onerror = () => {
          playerCover.style.visibility = "hidden";
        };
        playerCover.style.visibility = "visible";
      }
  
      currentTimeText.textContent = "00:00";
      durationText.textContent = track.duration;
      seekBar.value = 0;
  
      updatePlaylistState();
    }
  
    // 再生
    async function playTrack(index) {
      currentTrackIndex = index;
  
      const track = tracks[currentTrackIndex];
  
      audio.src = track.audio;
      updatePlayerInfo();
  
      try {
        await audio.play();
        playButton.textContent = "Ⅱ";
        updatePlaylistState();
      } catch (error) {
        console.error("音楽を再生できませんでした。", error);
        playButton.textContent = "▶";
      }
    }
  
    // 再生・一時停止
    async function togglePlay() {
      if (!audio.src) {
        await playTrack(currentTrackIndex);
        return;
      }
  
      if (audio.paused) {
        try {
          await audio.play();
        } catch (error) {
          console.error("再生できませんでした。", error);
        }
      } else {
        audio.pause();
      }
    }
  
    // 次の曲
    function nextTrack() {
      const nextIndex = (currentTrackIndex + 1) % tracks.length;
      playTrack(nextIndex);
    }
  
    // 前の曲
    function previousTrack() {
      if (audio.currentTime > 3) {
        audio.currentTime = 0;
        return;
      }
  
      const previousIndex =
        (currentTrackIndex - 1 + tracks.length) % tracks.length;
  
      playTrack(previousIndex);
    }
  
    // 再生・一時停止ボタン
    playButton.addEventListener("click", togglePlay);
  
    // 曲送り・曲戻し
    nextButton.addEventListener("click", nextTrack);
    prevButton.addEventListener("click", previousTrack);
  
    // 再生状態の変化
    audio.addEventListener("play", () => {
      playButton.textContent = "Ⅱ";
      updatePlaylistState();
    });
  
    audio.addEventListener("pause", () => {
      playButton.textContent = "▶";
      updatePlaylistState();
    });
  
    // 再生時間の更新
    audio.addEventListener("timeupdate", () => {
      currentTimeText.textContent = formatTime(audio.currentTime);
  
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        seekBar.value = (audio.currentTime / audio.duration) * 100;
      }
    });
  
    // 曲の長さを取得
    audio.addEventListener("loadedmetadata", () => {
      durationText.textContent = formatTime(audio.duration);
    });
  
    // 再生位置の調整
    seekBar.addEventListener("input", () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        audio.currentTime = (seekBar.value / 100) * audio.duration;
      }
    });
  
    // 音量の調整
    volumeBar.addEventListener("input", () => {
      audio.volume = Number(volumeBar.value);
    });
  
    // 曲が終わったら次の曲へ
    audio.addEventListener("ended", nextTrack);
  
    // 初期音量
    audio.volume = volumeBar ? Number(volumeBar.value) : 0.7;
  
    // 初期表示
    renderPlaylist();
    updatePlayerInfo();
  });
  