const palavraDisplay = document.getElementById('palavra-display');
const forcaImg = document.getElementById('forca-img');
const letrasBotoes = document.getElementById('letras-botoes');
const messageEl = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');

const palavras = ['PROGRAMACAO', 'JAVASCRIPT', 'TECNOLOGIA', 'COMPUTADOR', 'DESENVOLVEDOR'];
const forcaImagens = [
    'https://i.ibb.co/L5QyL3R/forca-0.png',
    'https://i.ibb.co/Rz95M9s/forca-1.png',
    'https://i.ibb.co/jT8B0Jz/forca-2.png',
    'https://i.ibb.co/WcT1W9d/forca-3.png',
    'https://i.ibb.co/P48n35V/forca-4.png',
    'https://i.ibb.co/Csg641J/forca-5.png',
    'https://i.ibb.co/D8dYh7Z/forca-6.png'
];

let palavraSecreta;
let letrasCorretas = [];
let letrasErradas = [];
const maxErros = 6;

function escolherPalavra() {
    palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
}

function exibirPalavra() {
    palavraDisplay.textContent = palavraSecreta
        .split('')
        .map(letra => (letrasCorretas.includes(letra) ? letra : '_'))
        .join(' ');
}

function verificarLetra(letra) {
    if (letrasErradas.includes(letra) || letrasCorretas.includes(letra)) {
        return;
    }

    if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);
    } else {
        letrasErradas.push(letra);
    }

    atualizarJogo();
}

function atualizarJogo() {
    exibirPalavra();
    atualizarForca();
    checarFimDeJogo();
}

function atualizarForca() {
    forcaImg.src = forcaImagens[letrasErradas.length];
}

function checarFimDeJogo() {
    if (letrasErradas.length >= maxErros) {
        mensagemFimDeJogo('Você perdeu! A palavra era: ' + palavraSecreta);
    } else if (!palavraDisplay.textContent.includes('_')) {
        mensagemFimDeJogo('Parabéns! Você venceu!');
    }
}

function mensagemFimDeJogo(mensagem) {
    messageEl.textContent = mensagem;
    letrasBotoes.querySelectorAll('button').forEach(btn => btn.disabled = true);
    restartBtn.classList.remove('hidden');
}

function gerarBotoesLetras() {
    letrasBotoes.innerHTML = '';
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letra => {
        const btn = document.createElement('button');
        btn.textContent = letra;
        btn.addEventListener('click', () => {
            verificarLetra(letra);
            btn.disabled = true;
        });
        letrasBotoes.appendChild(btn);
    });
}

function reiniciarJogo() {
    letrasCorretas = [];
    letrasErradas = [];
    messageEl.textContent = '';
    restartBtn.classList.add('hidden');
    
    escolherPalavra();
    exibirPalavra();
    atualizarForca();
    gerarBotoesLetras();
}

reiniciarJogo();
restartBtn.addEventListener('click', reiniciarJogo);