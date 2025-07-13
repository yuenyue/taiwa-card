// script.js

// ページの DOM が完全に構築されたらメイン処理を走らせる
document.addEventListener('DOMContentLoaded', () => {
  // 1. カード画像パスのリストを作成（01～58）
  const cards = Array.from({ length: 58 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `images/card${num}.png`;
  });

  // 2. 状態管理
  let currentIndex = 0;

  // 3. 要素取得（HTML 側で id="draw-area" / id="board" / id="reset" にしておく）
  const drawArea = document.getElementById('draw-area');
  const board    = document.getElementById('board');
  const resetBtn = document.getElementById('reset');

  // 要素が取れなかったらエラー出して中断
  if (!drawArea || !board || !resetBtn) {
    console.error('必要な要素が見つかりませんでした:', {
      drawArea, board, resetBtn
    });
    return;
  }

  // カードを引く処理
  function drawCard() {
    const src = cards[currentIndex];
    // draw-area に表示（クリックごとに上書き）
    drawArea.innerHTML = `<img src="${src}" alt="card" />`;

    // board にもセルを追加
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerHTML = `<img src="${src}" alt="card" />`;
    board.appendChild(cell);

    // 次のカードへ（ループ）
    currentIndex = (currentIndex + 1) % cards.length;
  }

  // リセット処理
  function resetAll() {
    currentIndex = 0;
    drawArea.textContent = 'ここをタップしてカードを引く';
    board.innerHTML = ''; 
  }

  // クリックイベントを登録
  drawArea.addEventListener('click', drawCard);
  resetBtn.addEventListener('click', resetAll);
});
