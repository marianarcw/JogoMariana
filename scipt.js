const userScoreEl = document.getElementById('user-score');
const computerScoreEl = document.getElementById('computer-score');
const resultMessageEl = document.querySelector('.result-message');
const choicesBtns = document.querySelectorAll('.choices button');

let userScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const choices = ['pedra', 'papel', 'tesoura'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playRound(userChoice) {
    const computerChoice = getComputerChoice();
    let result = '';

    if (userChoice === computerChoice) {
        result = 'Empate!';
    } else if (
        (userChoice === 'pedra' && computerChoice === 'tesoura') ||
        (userChoice === 'papel' && computerChoice === 'pedra') ||
        (userChoice === 'tesoura' && computerChoice === 'papel')
    ) {
        userScore++;
        result = `Você venceu! ${userChoice} vence ${computerChoice}.`;
    } else {
        computerScore++;
        result = `Você perdeu! ${computerChoice} vence ${userChoice}.`;
    }

    updateScore(userScore, computerScore);
    updateResult(result);
}

function updateScore(user, computer) {
    userScoreEl.textContent = `Sua Pontuação: ${user}`;
    computerScoreEl.textContent = `IA Pontuação: ${computer}`;
}

function updateResult(message) {
    resultMessageEl.textContent = message;
}

choicesBtns.forEach(button => {
    button.addEventListener('click', () => {
        const userChoice = button.id;
        playRound(userChoice);
    });
});