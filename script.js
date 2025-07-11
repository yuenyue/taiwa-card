
document.addEventListener("DOMContentLoaded", () => {
  const cards = [
    { name: "痛みや苦しみがないこと" },
    { name: "穏やかな気持ちでいられること" },
    { name: "自宅など、希望する場所で過ごせること" },
    { name: "信頼できる医師にみてもらえること" },
    { name: "安心できる看護師がそばにいること" },
    { name: "家族と一緒に過ごせること" },
    { name: "会いたい人に会っておくこと" }
    // ...ここに残りのカードを追加
  ];

  const drawButton = document.getElementById("draw-button");
  const drawnCard = document.getElementById("drawn-card");

  drawButton.addEventListener("click", () => {
    if (cards.length === 0) {
      alert("すべてのカードを引き終わりました");
      return;
    }
    const card = cards.splice(Math.floor(Math.random() * cards.length), 1)[0];
    drawnCard.textContent = card.name;
    drawnCard.classList.remove("hidden");
    drawnCard.setAttribute("draggable", true);
    drawnCard.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", card.name);
    });
  });

  const dropzones = document.querySelectorAll(".dropzone");
  dropzones.forEach(zone => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      const cardName = e.dataTransfer.getData("text/plain");
      const cardEl = document.createElement("div");
      cardEl.className = "card";
      cardEl.textContent = cardName;
      zone.appendChild(cardEl);
      drawnCard.classList.add("hidden");
      drawnCard.textContent = "";
    });
  });
});
