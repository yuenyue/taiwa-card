// ─────────────────────────────────
// カードリスト（01〜57）を準備
// ─────────────────────────────────
const cards = Array.from({length:57}, (_, i) => {
  const num = String(i+1).padStart(2, '0');
  return `images/${num}.png`;
});
let currentIndex = 0;

// ─────────────────────────────────
// 要素取得
// ─────────────────────────────────
const drawArea = document.getElementById('draw-area');
const board    = document.getElementById('board');
const resetBtn = document.getElementById('reset');
const cells    = [];

// ─────────────────────────────────
// ボードにセルを自動生成（50マス）
// ─────────────────────────────────
function createBoardCells(count = 50) {
  for (let i = 0; i < count; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    // クリックされたら、drawArea のカードをこのセルに移す
    cell.addEventListener('click', () => {
      const img = drawArea.querySelector('img');
      if (img) cell.appendChild(img);
    });
    board.appendChild(cell);
    cells.push(cell);
  }
}

// ─────────────────────────────────
// カードを１枚だけ引く
// ─────────────────────────────────
function drawCard() {
  if (currentIndex >= cards.length) return;
  drawArea.innerHTML = '';
  const img = document.createElement('img');
  img.src = cards[currentIndex++];
  img.dataset.index = currentIndex - 1;
  img.classList.add('back');
  drawArea.appendChild(img);
}

// ─────────────────────────────────
// 裏⇔表を切り替え
// ─────────────────────────────────
function flipCard(img) {
  img.classList.toggle('back');
  img.classList.toggle('front');
}

// ─────────────────────────────────
// リセット：セルも引きエリアもクリア
// ─────────────────────────────────
function resetAll() {
  drawArea.innerHTML = 'ここをタップしてカードを引く';
  currentIndex = 0;
  cells.forEach(cell => cell.innerHTML = '');
}

// ─────────────────────────────────
// イベント登録
// ─────────────────────────────────
drawArea.addEventListener('click', () => {
  const img = drawArea.querySelector('img');
  img ? flipCard(img) : drawCard();
});
resetBtn.addEventListener('click', resetAll);

// ─────────────────────────────────
// 初期化：セル作成＆初期状態
// ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  createBoardCells(50);
  resetAll();
});
