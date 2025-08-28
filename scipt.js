const colorName = document.getElementById('color-name');
const boxes = document.querySelectorAll('.box');
const message = document.getElementById('message');
const nextButton = document.getElementById('next-button');

const colors = ['red', 'blue', 'green'];
let correctColor;

function setupGame() {
    correctColor = colors[Math.floor(Math.random() * colors.length)];
    colorName.textContent = correctColor.toUpperCase();
    message.textContent = '';
}

function checkAnswer(event) {
    const clickedColor = event.target.dataset.color;
    if (clickedColor === correctColor) {
        message.textContent = 'Correto! 🎉';
        message.style.color = 'green';
    } else {
        message.textContent = 'Errado. Tente de novo.';
        message.style.color = 'red';
    }
}

boxes.forEach(box => {
    box.addEventListener('click', checkAnswer);
});

nextButton.addEventListener('click', setupGame);

document.addEventListener('DOMContentLoaded', setupGame);