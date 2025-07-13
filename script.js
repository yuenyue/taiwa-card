// ───────────────────────────────────────────
// script.js
// ───────────────────────────────────────────

// 1. 画像リストを用意 (images/card01.png ～ card58.png が存在する前提)
const cards = Array.from({ length: 58 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `images/card${num}.png`;
});

// 2. 状態変数
let drawIndex = 0;        // 次に引くカードのインデックス
let currentCardSrc = '';  // Draw エリアに表示中のカードパス

// 3. 要素取得
const drawArea = document.getElementById('draw-area');
const board    = document.getElementById('board');
const resetBtn = document.getElementById('reset');

// 4. ボード（空セル）を生成
//    例: 50 セル分
const CELL_COUNT = 50;
for (let i = 0; i < CELL_COUNT; i++) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.dataset.index = i;
  board.appendChild(cell);
}

// 5. Draw エリアを初期化する関数
function resetDrawArea() {
  drawArea.textContent = 'ここをタップしてカードを引く';
  currentCardSrc = '';
}
resetDrawArea();

// 6. カードを引く（Draw）ロジック
drawArea.addEventListener('click', () => {
  // すでにカード表示中なら何もしない
  if (currentCardSrc) return;
  // 引けるカードがなくなったら何もしない
  if (drawIndex >= cards.length) return;

  // img 要素を作って表示
  const img = document.createElement('img');
  img.src = cards[drawIndex];
  img.alt = `card${drawIndex + 1}`;
  drawArea.innerHTML = '';
  drawArea.appendChild(img);

  // 状態を更新
  currentCardSrc = cards[drawIndex];
  drawIndex++;
});

// 7. ボードへの配置（セルをクリックするとそこに currentCardSrc を貼り付け）
board.addEventListener('click', (e) => {
  const cell = e.target.closest('.cell');
  if (!cell) return;             // セル以外クリックは無視
  if (!currentCardSrc) return;   // カードを引いていなければ無視

  // セルに img を入れる
  cell.innerHTML = `<img src="${currentCardSrc}" alt="">`;

  // Draw エリアをクリアして、次の引きを可能に
  resetDrawArea();
});

// 8. リセットボタン
resetBtn.addEventListener('click', () => {
  // 引き直し位置クリア
  drawIndex = 0;
  // Draw エリアクリア
  resetDrawArea();
  // 全セルを空に
  board.querySelectorAll('.cell').forEach(cell => {
    cell.innerHTML = '';
  });
});
