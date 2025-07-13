// ─────────────────────────────────
// 【カードリストの準備】01〜57までの画像パスを配列に
// ─────────────────────────────────
const cards = Array.from({length:57}, (_,i)=> {
  const num = String(i+1).padStart(2,'0');
  return `images/${num}.png`;
});
let currentIndex = 0;

// ─────────────────────────────────
// 【要素を取ってくる】
// ─────────────────────────────────
const drawArea = document.getElementById('draw-area');
const board   = document.getElementById('board');
const resetBtn = document.getElementById('reset');

// ─────────────────────────────────
// 【ボードのマスを自動生成】
// ─────────────────────────────────
const cells = [];
function createBoardCells(count = 50) {
  for (let i = 0; i < count; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    // クリックでカードを置く
    cell.addEventListener('click', () => {
      const img = drawArea.querySelector('img');
      if (img) cell.appendChild(img);
    });
    board.appendChild(cell);
    cells.push(cell);
  }
}

// ─────────────────────────────────
// 【カードを引く／めくる】
// ─────────────────────────────────
function drawCard() {
  if (currentIndex >= cards.length) return;
  drawArea.innerHTML = '';
  const img = document.createElement('img');
  img.src = cards[currentIndex];
  img.dataset.index = currentIndex;
  img.classList.add('back');
  drawArea.appendChild(img);
  currentIndex++;
}
function flipCard(img) {
  img.classList.toggle('back');
  img.classList.toggle('front');
}

// ─────────────────────────────────
// 【リセット】全てクリア＆最初に戻す
// ─────────────────────────────────
function resetAll() {
  // draw-area を初期メッセージに戻す
  drawArea.innerHTML = 'ここをタップしてカードを引く';
  currentIndex = 0;
  // 既存のカードをすべてセルから取り除く
  cells.forEach(cell => cell.innerHTML = '');
}

// ─────────────────────────────────
// 【イベント登録】
// ─────────────────────────────────
drawArea.addEventListener('click', () => {
  const img = drawArea.querySelector('img');
  img ? flipCard(img) : drawCard();
});
resetBtn.addEventListener('click', resetAll);

// ─────────────────────────────────
// 【初期化】
// ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  createBoardCells(50);  // マスを50個作る
  resetAll();            // 初期表示
});
