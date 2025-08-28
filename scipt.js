const guessInput = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');
const messageEl = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');

let secretNumber;

function generateSecretNumber() {
    // Gera um número aleatório entre 1 e 100
    secretNumber = Math.floor(Math.random() * 100) + 1;
}

function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    // Verifica se a entrada é um número válido
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        setMessage('Por favor, digite um número válido entre 1 e 100.');
        return;
    }

    if (userGuess === secretNumber) {
        setMessage(`Parabéns! Você adivinhou o número ${secretNumber}!`);
        endGame();
    } else if (userGuess < secretNumber) {
        setMessage('O número é maior. Tente novamente.');
    } else {
        setMessage('O número é menor. Tente novamente.');
    }
}

function setMessage(message) {
    messageEl.textContent = message;
}

function endGame() {
    submitBtn.disabled = true;
    guessInput.disabled = true;
    restartBtn.classList.remove('hidden');
}

function restartGame() {
    generateSecretNumber();
    guessInput.value = '';
    setMessage('');
    submitBtn.disabled = false;
    guessInput.disabled = false;
    restartBtn.classList.add('hidden');
}

// Adiciona os eventos de clique
submitBtn.addEventListener('click', checkGuess);
restartBtn.addEventListener('click', restartGame);

// Inicia o jogo quando a página carrega
generateSecretNumber();