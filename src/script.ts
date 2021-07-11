import { Game } from "./Game.js";


const game: Game = new Game(2);

function start(): void {
    game.start();
    startButton.disabled = true;
}

function restart(): void {
    startButton.disabled = false;
    game.restart();
}

const startButton = document.getElementById('start') as HTMLButtonElement;
startButton.addEventListener('click', start);
document.getElementById('restart').addEventListener('click', restart);