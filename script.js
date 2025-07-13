// ✅ script.js が読み込まれました！
alert('✅ script.js が読み込まれました！');

// ─────────────────────────────────────────────
// 【カードリストの準備】01～57までの画像パスを用意
// ─────────────────────────────────────────────
const cards = Array.from({ length: 57 }, (_, i) => {
  // i は 0～56 → +1 して 1～57
  // 1桁のときは左側に0をつけて "01" に
  const num = String(i + 1).padStart(2, '0');  
  // ★ここを変更★ "images/01.png" → "images/card01.png" を読む
  return `images/card${num}.png`;
});

// ─────────────────────────────────────────────
// 【状態管理用変数】
let currentIndex = 0; // 今何番目のカードを表示中か

// ─────────────────────────────────────────────
// 【要素を取得】
// ─────────────────────────────────────────────
const drawArea = document.getElementById('draw-area');     // カード表示エリア
const zones = {                                            // 分類ドロップゾーン
  high:   document.getElementById('high-zone'),
  medium: document.getElementById('medium-zone'),
  low:    document.getElementById('low-zone'),
};
const resetBtn = document.getElementById('reset');         // リセットボタン

// ─────────────────────────────────────────────
// 【カードを画面に表示する関数】
// ─────────────────────────────────────────────
function showCard(src) {
  drawArea.innerHTML = '';              // まずエリアを空に
  const img = document.createElement('img');
  img.src = src;
  img.draggable = true;                 // ドラッグできるように
  drawArea.appendChild(img);
}

// ─────────────────────────────────────────────
// 【カードをめくる（クリック）】
// ─────────────────────────────────────────────
drawArea.addEventListener('click', () => {
  // 次のカードインデックスへ進む（最後まで行ったら0に戻る）
  currentIndex = (currentIndex + 1) % cards.length;
  showCard(cards[currentIndex]);
});

// ─────────────────────────────────────────────
// 【ドラッグ＆ドロップの設定】
// ─────────────────────────────────────────────
// ドラッグオーバー時に「ドロップ可」にする
Object.values(zones).forEach(zone => {
  zone.addEventListener('dragover', e => {
    e.preventDefault();
  });
});
// ドロップ時に drawArea の img を移動
Object.values(zones).forEach(zone => {
  zone.addEventListener('drop', e => {
    e.preventDefault();
    const img = drawArea.querySelector('img');
    if (img) {
      zone.appendChild(img);
    }
  });
});

// ─────────────────────────────────────────────
// 【リセット処理】
// ─────────────────────────────────────────────
resetBtn.addEventListener('click', () => {
  // カード表示を最初に戻す
  currentIndex = 0;
  showCard(cards[currentIndex]);
  // ゾーン内をすべて空に
  Object.values(zones).forEach(zone => {
    zone.innerHTML = '';
  });
});

// ─────────────────────────────────────────────
// 【起動時の初期表示】
// ─────────────────────────────────────────────
showCard(cards[currentIndex]);
