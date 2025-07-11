// ┌───────────────────────────
// │ 1. カードの画像パスを準備
// └───────────────────────────
const cards = [];
for (let i = 1; i <= 57; i++) {
  // 1〜9 → "01","02"…、10〜57 → "10","11"…
  const num = ('0' + i).slice(-2);
  cards.push(`images/${num}.png`);
}

let currentIndex = 0;  // 次に引くカードの番号

// ┌───────────────────────────
// │ 2. HTML上の場所を取り出す
// └───────────────────────────
const drawButton  = document.getElementById('draw-button');
const drawArea    = document.getElementById('draw-area');
const zones = {
  high:   document.getElementById('high-zone'),    // とても重要
  medium: document.getElementById('medium-zone'),  // ある程度重要
  low:    document.getElementById('low-zone')      // 重要ではない
};

// ┌───────────────────────────
// │ 3. カードを「引く」しくみ
// └───────────────────────────
drawButton.addEventListener('click', () => {
  // カードがなくなったら何もしない
  if (currentIndex >= cards.length) return;

  // 新しい<img>を作って drawArea に入れる
  const img = document.createElement('img');
  img.src       = cards[currentIndex];
  img.id        = `card-${currentIndex}`;
  img.draggable = true;        // ドラッグできるように
  img.className = 'card back'; // CSSで裏面デザインを当てます

  // 以前のカードは消して、新しいカードだけ表示
  drawArea.innerHTML = '';
  drawArea.appendChild(img);

  currentIndex++;
});

// ┌───────────────────────────
// │ 4. クリックで「めくる」（裏⇔表）
// └───────────────────────────
drawArea.addEventListener('click', e => {
  if (e.target.tagName !== 'IMG') return;
  const img = e.target;
  if (img.classList.contains('back')) {
    img.classList.remove('back');
    img.classList.add('front');
  } else {
    img.classList.remove('front');
    img.classList.add('back');
  }
});

// ┌───────────────────────────
// │ 5. ドラッグ＆ドロップのしくみ
// └───────────────────────────

// カードをドラッグし始めたとき
drawArea.addEventListener('dragstart', e => {
  if (e.target.tagName === 'IMG') {
    e.dataTransfer.setData('text/plain', e.target.id);
  }
});

// 分類ゾーンを「ここに置けるよ！」状態にして
Object.values(zones).forEach(zone => {
  zone.addEventListener('dragover', e => e.preventDefault());
  zone.addEventListener('drop', e => {
    e.preventDefault();
    const id   = e.dataTransfer.getData('text/plain');
    const card = document.getElementById(id);
    zone.appendChild(card);
  });
});
