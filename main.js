import Game from './game.js';

const $logs = document.querySelector('#logs');
const $control = document.querySelector('.control');
console.log($logs);
const game = new Game($control, $logs);
game.startGame();

const $btnResetGame = document.getElementById('resetGame');
$btnResetGame.addEventListener('click', () => {
    game.resetGame();
});