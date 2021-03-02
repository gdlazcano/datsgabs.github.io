const cards = document.querySelectorAll('.list-card')
for (let card of cards) {
    card.addEventListener('click', () => handleClickCard(card))
}

function handleClickCard(card) {
    const isTextSelected = window.getSelection().toString();
    if (!isTextSelected) {
        window.location = card.dataset.url;
    }
}