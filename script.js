const cards = document.querySelectorAll('.card');
let firstCard, secondCard;
var foundCardsAmount = 0;

function flipCard() {
    if (secondCard != null) return;

    this.classList.add('flip');
    disableCardClick(this);

    if (firstCard == null) {
        firstCard = this;
        return;
    }

    secondCard = this;
    const match = checkCardsMatch();

    if (match) {
        foundCardsAmount += 2;
        var audio = null;
        if (foundCardsAmount >= cards.length) {
            audio = new Audio('./sounds/winner.mp3');
        } else {
            audio = new Audio('./sounds/match.mp3');
        }

        audio.play();
    }

    setTimeout(() => {
        if (!match) {
            unflipCards();
        }

        enableAllCardsClick();
        resetSelectedCards();
    }, 1500);
}

function checkCardsMatch() {
    return firstCard.dataset.card === secondCard.dataset.card;
}

function enableCardClick(card) {
    card.addEventListener('click', flipCard);
}

function disableCardClick(card) {
    card.removeEventListener('click', flipCard);
}

function enableAllCardsClick() {
    cards.forEach(card => enableCardClick(card));
}

function unflipCard(card) {
    card.classList.remove('flip');
}

function unflipCards() {
    unflipCard(firstCard);
    unflipCard(secondCard);
}

function resetSelectedCards() {
    firstCard = null;
    secondCard = null;
}

function shuffleAllCards() {
    cards.forEach(card => {
        let cardPosition = Math.floor(Math.random() * cards.length);
        card.style.order = cardPosition;
    });
};

function init() {
    shuffleAllCards();
    enableAllCardsClick();
}

init();