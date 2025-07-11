// 価値観カードの画像とテキストを定義
const cards = [
  { image: "images/card01.png", text: "痛みや苦しみがないこと" },
  { image: "images/card02.png", text: "穏やかな気持ちでいられること" },
  { image: "images/card03.png", text: "自宅など、希望する場所で過ごせること" },
  { image: "images/card04.png", text: "信頼できる医師にみてもらえること" },
  { image: "images/card05.png", text: "安心できる看護師がそばにいること" },
  { image: "images/card06.png", text: "家族と一緒に過ごせること" },
  { image: "images/card07.png", text: "会いたい人に会っておくこと" },
  { image: "images/card08.png", text: "自分で話して意思を伝えられること" },
  { image: "images/card09.png", text: "身の回りのことが自分でできること" },
  { image: "images/card10.png", text: "最期まで自分らしく生きること" },
  { image: "images/card11.png", text: "誰かに見守ってもらえること" },
  { image: "images/card12.png", text: "家族に感謝の気持ちを伝えられること" },
  { image: "images/card13.png", text: "静かな環境で過ごせること" },
  { image: "images/card14.png", text: "お金の心配をせずに過ごせること" },
  { image: "images/card15.png", text: "不安を受け止めてくれる人がいること" },
  { image: "images/card16.png", text: "自分の気持ちや価値観が尊重されること" },
  { image: "images/card17.png", text: "医療・ケアの内容を自分で選べること" },
  { image: "images/card18.png", text: "家族が納得していること" },
  { image: "images/card19.png", text: "家族の負担を減らすこと" },
  { image: "images/card20.png", text: "延命治療を望まないこと" },
  { image: "images/card21.png", text: "治療に納得していること" },
  { image: "images/card22.png", text: "医師と十分に話せること" },
  { image: "images/card23.png", text: "看取りに来てもらえること" },
  { image: "images/card24.png", text: "悔いのない人生だったと思えること" },
  { image: "images/card25.png", text: "日々に喜びや楽しみがあること" },
  { image: "images/card26.png", text: "最期まで希望を持てること" },
  { image: "images/card27.png", text: "自然なかたちで死を迎えること" },
  { image: "images/card28.png", text: "介護されることを受け入れられること" },
  { image: "images/card29.png", text: "孤独を感じずに過ごせること" },
  { image: "images/card30.png", text: "愛する人と別れの準備ができること" },
  { image: "images/card31.png", text: "そばにいてほしい人が誰かわかっていること" },
  { image: "images/card32.png", text: "宗教的・精神的な支えがあること" },
  { image: "images/card33.png", text: "自分の死後のことを準備できること" },
  { image: "images/card34.png", text: "大切なものを残しておけること（手紙・写真など）" },
  { image: "images/card35.png", text: "尊厳が守られること" },
  { image: "images/card36.png", text: "自分の存在を大切に思ってくれる人がいること" },
  { image: "images/card37.png", text: "最期を家族とともに迎えられること" },
  { image: "images/card38.png", text: "家族と意見のすれ違いがないこと" },
  { image: "images/card39.png", text: "介護職や支援者と信頼関係があること" },
  { image: "images/card40.png", text: "自分の部屋や物に囲まれて過ごせること" },
  { image: "images/card41.png", text: "生きていてよかったと思えること" },
  { image: "images/card42.png", text: "子や孫の顔を見られること" },
  { image: "images/card43.png", text: "旅立ちに向けて心の準備ができること" },
  { image: "images/card44.png", text: "苦しまないように緩和ケアがあること" },
  { image: "images/card45.png", text: "医療や介護を受けることに安心できること" },
  { image: "images/card46.png", text: "周囲に気を遣わずに過ごせること" },
  { image: "images/card47.png", text: "話をじっくり聞いてくれる人がいること" },
  { image: "images/card48.png", text: "「ありがとう」「ごめんね」が言えること" },
  { image: "images/card49.png", text: "自分の死について家族と話せること" },
  { image: "images/card50.png", text: "悲しませたくない人がいること" },
  { image: "images/card51.png", text: "介護してくれる人に感謝できること" },
  { image: "images/card52.png", text: "身近な人が安心していること" },
  { image: "images/card53.png", text: "愛されていたと感じられること" },
  { image: "images/card54.png", text: "やるだけのことはやったと思えること" },
  { image: "images/card55.png", text: "一人になれる時間があること" },
  { image: "images/card56.png", text: "普段通りの日常があること" },
  { image: "images/card57.png", text: "自分の生き方を貫けたと思えること" }
];

// カードを表示する
const container = document.getElementById("cardContainer");

cards.forEach((card, index) => {
  const cardElement = document.createElement("div");
  cardElement.className = "card";
  cardElement.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <img src="${card.image}" alt="Card ${index + 1}">
      </div>
      <div class="card-back">
        <p>${card.text}</p>
      </div>
    </div>
  `;
  container.appendChild(cardElement);
});
