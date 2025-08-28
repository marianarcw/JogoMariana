const startButton = document.getElementById('start-button');
const timeDisplay = document.getElementById('time-display');

let startTime;
let hasStarted = false;

function startGame() {
    if (!hasStarted) {
        hasStarted = true;
        startButton.textContent = 'Clique!';
        timeDisplay.textContent = 'Aguardando...';

        // Mudar a cor do botão para indicar que é hora de clicar
        startButton.style.backgroundColor = '#e74c3c';

        // Esconde o botão e mostra de novo após um tempo aleatório
        setTimeout(() => {
            startButton.style.display = 'block';
            startButton.style.backgroundColor = '#3498db';
            startButton.textContent = 'Clique agora!';
            startTime = Date.now();
        }, Math.random() * 2000 + 1000); // Aparece entre 1 e 3 segundos
    } else {
        const endTime = Date.now();
        const reactionTime = endTime - startTime;
        timeDisplay.textContent = `Seu tempo de reação: ${reactionTime} ms`;

        // Resetar o jogo
        hasStarted = false;
        startButton.textContent = 'Começar de novo';
        startButton.style.backgroundColor = '#2ecc71';
    }
}

startButton.addEventListener('click', startGame);