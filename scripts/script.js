import {Board} from "./board.js";
import {MoveCounter} from "./move-counter.js";
import {Timer} from "./timer.js";
import {canvasElement, start, gameMenu, pauseMenu, resume, pause, movesAmount} from "./init.js";
import {State} from "./state.js";

const ctx = canvasElement.getContext('2d');
ctx.font = '48px sanserif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

let gameBoard = new Board();
let boardGrid = gameBoard.init();

//state init
const state = new State();
state.timer = new Timer();
const timer = state.timer;
const moveCounter = new MoveCounter();

//new game start
start.addEventListener('click', e => {
  gameBoard = new Board(); 
  boardGrid = gameBoard.init();
  gameBoard.renderBoard(boardGrid, ctx);
  gameMenu.style.display = 'none';
  pauseMenu.style.display = 'none';
  moveCounter.reset();
  timer.reset();
  timer.setTimer();
});
//new game end

// move tile on click start
canvasElement.addEventListener('click', e => {
  const j = Math.floor(e.offsetX / 100);
  const i = Math.floor(e.offsetY / 100);
  
  if((i > 0) && (boardGrid[i - 1][j].caption === 0)) {
    boardGrid[i - 1][j].caption = boardGrid[i][j].caption;
    boardGrid[i - 1][j].render(ctx);
    boardGrid[i][j].caption = 0;
    boardGrid[i][j].render(ctx);
    moveCounter.countMoves();
  } else if((j > 0) && (boardGrid[i][j - 1].caption === 0)) {
    boardGrid[i][j - 1].caption = boardGrid[i][j].caption;
    boardGrid[i][j - 1].render(ctx);
    boardGrid[i][j].caption = 0;
    boardGrid[i][j].render(ctx);
    moveCounter.countMoves();
  } else if((i < gameBoard.boardSize - 1) && (boardGrid[i + 1][j].caption === 0)) {
    boardGrid[i + 1][j].caption = boardGrid[i][j].caption;
    boardGrid[i + 1][j].render(ctx);
    boardGrid[i][j].caption = 0;
    boardGrid[i][j].render(ctx);
    moveCounter.countMoves();
  } else if((j < gameBoard.boardSize - 1) && (boardGrid[i][j + 1].caption === 0)) {
    boardGrid[i][j + 1].caption = boardGrid[i][j].caption;
    boardGrid[i][j + 1].render(ctx);
    boardGrid[i][j].caption = 0;
    boardGrid[i][j].render(ctx);
    moveCounter.countMoves();
  }

  if(checkGame(boardGrid, gameBoard.boardSize) === true) {
    // alert(`Ура! Вы решили головоломку за #:## и ${movesAmount.innerHTML} ходов`);
  }
});
// move tile on click end

pause.addEventListener('click', e => {
  gameMenu.style.display = 'flex';
  pauseMenu.style.display = 'flex';
  timer.pause();
});

resume.addEventListener('click', e => {
  gameMenu.style.display = 'none';
  pauseMenu.style.display = 'none';
  timer.setTimer();
});

// end of game start
function checkGame(boardGrid, boardSize) {
  let checkNumbers = Array.from(Array(boardSize * boardSize).keys());
  checkNumbers.push(checkNumbers.shift());
  for(let i = 0; i < boardSize; i++) {
    for(let j = 0; j < boardSize; j++) {
      if(boardGrid[i][j].caption === checkNumbers.shift()) {
        continue;
      } else {
        return false;
      }
    }
  }
  return true;
}
// end of game start
