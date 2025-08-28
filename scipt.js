const colorNameEl = document.getElementById('color-name');
const colorBoxes = document.querySelectorAll('.color-box');
const messageEl = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');

const colors = [
    { name: 'VERMELHO', value: 'red' },
    { name: 'AZUL', value: 'blue' },
    { name: 'VERDE', value: 'green' },
    { name: 'AMARELO', value: 'yellow' }
];

let correctColor;

function startGame() {
    // Escolhe uma cor aleatória
    const randomIndex = Math.floor(Math.random() * colors.length);
    correctColor = colors[randomIndex].value;
    colorNameEl.textContent = colors[randomIndex].name;

    messageEl.textContent = '';
}

function handleGuess(event) {
    const selectedColor = event.target.dataset.color;

    if (selectedColor === correctColor) {
        messageEl.textContent = 'Parabéns! Você acertou!';
        messageEl.style.color = 'green';
    } else {
        messageEl.textContent = 'Ops, você errou. Tente de novo.';
        messageEl.style.color = 'red';
    }
}

function restartGame() {
    startGame();
    messageEl.textContent = '';
    messageEl.style.color = 'black';
}

// Adiciona o evento de clique em cada caixa de cor
colorBoxes.forEach(box => {
    box.addEventListener('click', handleGuess);
});

// Adiciona o evento de clique no botão de reiniciar
restartBtn.addEventListener('click', restartGame);

// Inicia o jogo quando a página carrega
document.addEventListener('DOMContentLoaded', startGame);