// script.js
window.addEventListener('DOMContentLoaded', () => {
  // ───────────────
  // 1. カード画像パスの準備
  // ───────────────
  const cards = Array.from({ length: 58 }, (_, i) => {
    // i=0 → "01", …, i=57 → "58"
    const num = String(i + 1).padStart(2, '0');
    return `images/card${num}.png`;
  });

  let drawIndex    = 0;    // 次に引くカードのインデックス
  let currentIndex = null; // 今画面上に表示中のカードインデックス

  const drawArea = document.getElementById('draw-area');
  const board    = document.getElementById('board');
  const resetBtn = document.getElementById('reset');

  // ───────────────
  // 2. 「空っぽの」ボード（50セル）を描画
  // ───────────────
  for (let i = 0; i < 50; i++) {
    const cell = document.createElement('div');
    cell.className        = 'cell';
    cell.dataset.index    = i;
    board.appendChild(cell);
  }

  // ───────────────
  // 3. カードを引く処理
  // ───────────────
  drawArea.addEventListener('click', () => {
    // もう引くカードがなければ無視
    if (drawIndex >= cards.length) return;

    // 現在引いたカード index を保持して drawIndex を進める
    currentIndex = drawIndex++;
    // draw-area 内をクリアして新しい img を差し込む
    drawArea.innerHTML = '';
    const img = new Image();
    img.src = cards[currentIndex];
    img.alt = `card ${currentIndex + 1}`;
    drawArea.appendChild(img);
  });

  // ───────────────
  // 4. セルをタップ → 引いたカードをドロップ
  // ───────────────
  board.addEventListener('click', e => {
    const cell = e.target.closest('.cell');
    if (!cell) return;
    // カードをまだ引いていない or すでにセルにある場合は無視
    if (currentIndex === null) return;
    if (cell.querySelector('img')) return;

    // セルに img を追加
    const clone = new Image();
    clone.src = cards[currentIndex];
    clone.alt = `card ${currentIndex + 1}`;
    cell.appendChild(clone);

    // ドロップしたら draw-area を文言に戻し、currentIndex クリア
    currentIndex = null;
    drawArea.textContent = 'ここをタップしてカードを引く';
  });

  // ───────────────
  // 5. リセットボタン
  // ───────────────
  resetBtn.addEventListener('click', () => {
    // 引き直し準備
    drawIndex    = 0;
    currentIndex = null;
    drawArea.textContent = 'ここをタップしてカードを引く';
    // ボード内の img をすべて削除
    board.querySelectorAll('img').forEach(img => img.remove());
  });
});
