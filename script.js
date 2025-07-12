alert('✅ script.js が読み込まれました');
// ── 以下、前回ご案内の draw/flip/classify/reset コード ──// ─────────────────────────────────
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
  if (currentIndex >= cards.length) return;
  drawArea.innerHTML = '';
  const img = document.createElement('img');
  img.src = cards[currentIndex];
  img.dataset.index = currentIndex;
  img.classList.add('back');
  drawArea.appendChild(img);
  currentIndex++;
}

// ─────────────────────────────────
// 【カードをめくる】
// ─────────────────────────────────
function flipCard(img) {
  if (!img) return;
  img.classList.toggle('back');
  img.classList.toggle('front');
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
  Object.values(zones).forEach(zone => {
    // ゾーン内の画像を取り出して空テキスト（見出し）だけ残す
    zone.innerHTML = zone.textContent;
  });
  drawArea.innerHTML = 'ここをタップしてカードを引く';
  currentIndex = 0;
}

// ─────────────────────────────────
// 【イベント登録】
// ─────────────────────────────────
drawArea.addEventListener('click', () => {
  const img = drawArea.querySelector('img');
  if (!img) {
    drawCard();
  } else {
    flipCard(img);
  }
});
zones.high.addEventListener('click',  ()=> classifyCard('high'));
zones.medium.addEventListener('click',()=> classifyCard('medium'));
zones.low.addEventListener('click',   ()=> classifyCard('low'));
resetBtn.addEventListener('click', resetAll);
