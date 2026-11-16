document.addEventListener("DOMContentLoaded", () => {
  const opening = document.getElementById("book-opening");
  const book = document.getElementById("storybook");
  const hero = document.querySelector(".hero");

  if (!opening || !book || !hero) return;

  // HOMEの文字演出を開始
  const showHomeText = () => {
    hero.classList.add("home-content-visible");
  };

  // このタブですでに本を開いたか確認
  const hasPlayed = sessionStorage.getItem("bookOpeningPlayed");

  // 2回目以降は本を表示せず、HOMEの文字を表示
  if (hasPlayed) {
    opening.remove();
    showHomeText();
    return;
  }

  // 初回の演出を記録
  sessionStorage.setItem("bookOpeningPlayed", "true");

  // ① 閉じた本を見せてから表紙を開く
  setTimeout(() => {
    book.classList.add("is-opening");
    opening.classList.add("is-opening");
  }, 1000);

  // ② 見開きが完成してからメッセージを表示
  setTimeout(() => {
    book.classList.add("is-message-visible");
  }, 4900);

  // ③ メッセージを金色に輝かせる
  setTimeout(() => {
    book.classList.add("is-message-glowing");
  }, 6800);

  // ④ ページ全体へズームアップ
  setTimeout(() => {
    book.classList.add("is-zooming");
    opening.classList.add("is-zooming");
  }, 9000);

  // ⑤ ズーム完了後にフェードアウト
  setTimeout(() => {
    opening.classList.add("is-finished");
  }, 11300);

  // ⑥ フェードアウト完了後にHOMEの文字を表示
  setTimeout(() => {
    opening.remove();
    showHomeText();
  }, 12800);

});