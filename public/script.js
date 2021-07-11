import { Game } from "./Game.js";
const game = new Game(2);
function start() {
    game.start();
    startButton.disabled = true;
}
function restart() {
    startButton.disabled = false;
    game.restart();
}
const startButton = document.getElementById('start');
startButton.addEventListener('click', start);
document.getElementById('restart').addEventListener('click', restart);
