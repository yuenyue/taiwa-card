// ─────────────────────────────────
// 【カードリストの準備】01〜57までの画像パスを配列に
// ─────────────────────────────────
const cards = Array.from({length:57}, (_,i)=> {
  const num = String(i+1).padStart(2,'0');
  return `images/${num}.png`;
});
let currentIndex = 0;  // 次に引くカードの番号

// ─────────────────────────────────
// 【要素を取ってくる】
// ─────────────────────────────────
const drawArea = document.getElementById('draw-area');
const zones = {
  high:   document.getElementById('high-zone'),
  medium: document.getElementById('medium-zone'),
  low:    document.getElementById('low-zone')
};
const resetBtn = document.getElementById('reset');

// ─────────────────────────────────
// 【カードを引く／次へ】
// ─────────────────────────────────
function drawCard() {
  // もうカードが残っていなければ何もしない
  if (currentIndex >= cards.length) return;
  drawArea.innerHTML = '';            // 前のカードをクリア
  const img = document.createElement('img');
  img.src = cards[currentIndex];
  img.dataset.index = currentIndex;  // 何番目のカードか保持
  img.classList.add('back');          // CSSで裏面スタイルも付与できる
  drawArea.appendChild(img);
  currentIndex++;
  drawArea.textContent = '';          // 「ここをタップ…」文を消す
}

// ─────────────────────────────────
// 【カードをめくる】
// ─────────────────────────────────
function flipCard(img) {
  if (!img) return;
  if (img.classList.contains('back')) {
    img.classList.replace('back','front');
  } else {
    img.classList.replace('front','back');
  }
}

// ─────────────────────────────────
// 【カードをゾーンに振り分ける】
// ─────────────────────────────────
function classifyCard(zoneKey) {
  const img = drawArea.querySelector('img');
  if (!img) return;
  zones[zoneKey].appendChild(img);
}

// ─────────────────────────────────
// 【リセット】全てのカードを戻して最初から
// ─────────────────────────────────
function resetAll() {
  // ゾーン内のカードを消す
  Object.values(zones).forEach(zone => zone.innerHTML = zone.textContent);
  // 引き直しエリアも初期状態に
  drawArea.innerHTML = 'ここをタップしてカードを引く';
  currentIndex = 0;
}

// ─────────────────────────────────
// 【イベント登録】
// ─────────────────────────────────

// draw-area をタップ → カードがなければ「引く」、あれば「めくる」
drawArea.addEventListener('click', e => {
  const img = drawArea.querySelector('img');
  if (!img) {
    drawCard();      // カードを引く
  } else {
    flipCard(img);   // カードをめくる
  }
});

// ゾーンをタップ → カードをそのゾーンに移動
zones.high.addEventListener('click',  ()=> classifyCard('high'));
zones.medium.addEventListener('click',()=> classifyCard('medium'));
zones.low.addEventListener('click',   ()=> classifyCard('low'));

// リセットボタン
resetBtn.addEventListener('click', resetAll);
