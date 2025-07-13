const cards = Array.from({length:57},(_,i)=>{
  const num = String(i+1).padStart(2,'0');
  return `images/${num}.png`;
});
let currentIndex = 0;

const drawArea = document.getElementById('draw-area');
const boardCells = Array.from(document.querySelectorAll('.cell'));
const resetBtn = document.getElementById('reset');

// カードを１枚だけ引く
function drawCard(){
  if(currentIndex>=cards.length) return;
  drawArea.innerHTML = '';
  const img = document.createElement('img');
  img.src = cards[currentIndex++];
  img.dataset.index = currentIndex-1;
  img.classList.add('back');
  drawArea.appendChild(img);
}

// 裏⇔表を切り替え
function flipCard(img){
  img.classList.toggle('back');
  img.classList.toggle('front');
}

// ボードのマスをクリック → カードをそのマスに１枚だけ移動
function placeCard(cell){
  const img = drawArea.querySelector('img');
  if(!img) return;
  cell.appendChild(img);
}

// リセット
function resetAll(){
  // マスの中身をクリア
  boardCells.forEach(cell=>{
    cell.innerHTML = '';
  });
  drawArea.innerHTML = 'ここをタップしてカードを引く';
  currentIndex = 0;
}

// イベント登録
drawArea.addEventListener('click', ()=>{
  const img = drawArea.querySelector('img');
  img ? flipCard(img) : drawCard();
});
boardCells.forEach(cell=>{
  cell.addEventListener('click', ()=> placeCard(cell));
});
resetBtn.addEventListener('click', resetAll);

// ページ読み込み時に初期化
resetAll();
