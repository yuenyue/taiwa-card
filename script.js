// ─────────────────────
// カードのパスを作る
// ─────────────────────
const cards = Array.from({length:57}, (_,i) => {
  const num = String(i+1).padStart(2,'0');
  return `images/${num}.png`;
});
let currentIndex = 0;

// ─────────────────────
// HTML要素を取得
// ─────────────────────
const drawArea = document.getElementById('draw-area');
const zones = {
  high:   document.getElementById('high-zone'),
  medium: document.getElementById('medium-zone'),
  low:    document.getElementById('low-zone'),
};
const resetBtn = document.getElementById('reset');

// ─────────────────────
// カードを１枚だけ表示する関数
// ─────────────────────
function drawCard() {
  if (currentIndex >= cards.length) return;
  // **前のカードをクリア** してから…
  drawArea.innerHTML = '';
  // 新しい<img>を１枚だけ追加
  const img = document.createElement('img');
  img.src = cards[currentIndex];
  img.dataset.index = currentIndex;
  img.classList.add('back');
  drawArea.appendChild(img);

  currentIndex++;
}

// ─────────────────────
// 裏⇔表を切り替え
// ─────────────────────
function flipCard(img) {
  img.classList.toggle('back');
  img.classList.toggle('front');
}

// ─────────────────────
// 選んだゾーンに１枚だけ移動
// ─────────────────────
function classifyCard(key) {
  const img = drawArea.querySelector('img');
  if (!img) return;
  zones[key].appendChild(img);
}

// ─────────────────────
// 全部リセット
// ─────────────────────
function resetAll() {
  // ゾーンの中身を見出しだけに戻す
  Object.values(zones).forEach(z => {
    z.innerHTML = z.textContent;
  });
  // 引き直しエリアも初期状態
  drawArea.innerHTML = 'ここをタップしてカードを引く';
  currentIndex = 0;
}

// ─────────────────────
// イベント登録
// ─────────────────────
// １）drawArea をタップ → カードがなければ「引く」、あれば「めくる」
drawArea.addEventListener('click', () => {
  const img = drawArea.querySelector('img');
  if (!img) {
    drawCard();
  } else {
    flipCard(img);
  }
});
// ２）各ゾーンをタップ → カードをそのゾーンに１枚だけ移動
zones.high.addEventListener('click',  () => classifyCard('high'));
zones.medium.addEventListener('click',() => classifyCard('medium'));
zones.low.addEventListener('click',   () => classifyCard('low'));
// ３）リセット
resetBtn.addEventListener('click', resetAll);

// ─────────────────────
// ページ読み込み時の初期表示
// ─────────────────────
resetAll();
