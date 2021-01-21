import {Board} from "./board.js";
import {Tile} from "./tile.js";
import {setTimer} from "./timer.js";

const body = document.querySelector('body');

// status bar start
const statusBar = document.createElement('section');
statusBar.className = 'status-bar';
body.append(statusBar);

const timer = document.createElement('div');
timer.className = 'timer';
statusBar.append(timer);

const timerBlock = document.createElement('div');
timerBlock.className = 'timer-block';
timerBlock.innerText = 'Time ';
timer.append(timerBlock);

const timeMinutes = document.createElement('span');
timeMinutes.className = 'time-minutes';
timerBlock.append(timeMinutes);

timerBlock.append(' : ');

const timeSeconds = document.createElement('span');
timeSeconds.className = 'time-seconds';
timerBlock.append(timeSeconds);
//status bar end

//game feild start
const container = document.createElement('div');
container.className = 'container';
statusBar.after(container);

const canvasElement = document.createElement('canvas');
canvasElement.className = 'game-field';
canvasElement.width = '400';
canvasElement.height = '400';
container.append(canvasElement);
//game feild end

//game menu start
const gameMenu = document.createElement('div');
gameMenu.className = 'gameMenu';
container.append(gameMenu);

const startButton = document.createElement('input');
startButton.className = 'start-button';
startButton.type = 'button';
startButton.value = 'New game';
gameMenu.append(startButton);

//game menu end

const ctx = canvasElement.getContext('2d');
ctx.font = '48px sanserif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

const gameBoard = new Board();
const boardGrid = gameBoard.init();
gameBoard.renderBoard(boardGrid, ctx);
// setTimer();

// move tile on click start
canvasElement.addEventListener('click', e => {
  const i = Math.floor(e.offsetX / 100);
  const j = Math.floor(e.offsetY / 100);
  
  if((i > 0) && (boardGrid[i - 1][j].caption === 0)) {
    boardGrid[i - 1][j].caption = boardGrid[i][j].caption;
    boardGrid[i - 1][j].render(ctx);
    boardGrid[i][j].caption = 0;
    boardGrid[i][j].render(ctx);
  } else if((j > 0) && (boardGrid[i][j - 1].caption === 0)) {
    boardGrid[i][j - 1].caption = boardGrid[i][j].caption;
    boardGrid[i][j - 1].render(ctx);
    boardGrid[i][j].caption = 0;
    boardGrid[i][j].render(ctx);
  } else if((i < gameBoard.boardSize - 1) && (boardGrid[i + 1][j].caption === 0)) {
    boardGrid[i + 1][j].caption = boardGrid[i][j].caption;
    boardGrid[i + 1][j].render(ctx);
    boardGrid[i][j].caption = 0;
    boardGrid[i][j].render(ctx);
  } else if((j < gameBoard.boardSize - 1) && (boardGrid[i][j + 1].caption === 0)) {
    boardGrid[i][j + 1].caption = boardGrid[i][j].caption;
    boardGrid[i][j + 1].render(ctx);
    boardGrid[i][j].caption = 0;
    boardGrid[i][j].render(ctx);
  }
});
// move tile on click end

//new game start
startButton.addEventListener('click', e => {
  gameMenu.style.display = 'none';
});
//new game end