const container = document.getElementById('card-container');
for (let i = 1; i <= 57; i++) {
  const card = document.createElement('div');
  card.className = 'card';
  card.textContent = `Card ${i}`;
  container.appendChild(card);
}