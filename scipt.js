const memoryGrid = document.querySelector('.memory-grid');
const restartBtn = document.getElementById('restart-btn');

const symbols = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍋', '🍑'];
const cards = [...symbols, ...symbols];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(symbol) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;

    const cardFace = document.createElement('div');
    cardFace.classList.add('card-face');
    cardFace.textContent = symbol;

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.textContent = '?';

    card.appendChild(cardFace);
    card.appendChild(cardBack);

    card.addEventListener('click', flipCard);
    return card;
}

function generateCards() {
    shuffle(cards);
    memoryGrid.innerHTML = '';
    cards.forEach(symbol => {
        memoryGrid.appendChild(createCard(symbol));
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();
    }
}

function checkForMatch() {
    let isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    matchedPairs++;
    if (matchedPairs === symbols.length) {
        setTimeout(() => alert('Parabéns! Você venceu!'), 500);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function restartGame() {
    matchedPairs = 0;
    resetBoard();
    generateCards();
}

restartBtn.addEventListener('click', restartGame);

// Inicia o jogo
document.addEventListener('DOMContentLoaded', generateCards);