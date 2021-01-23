import {Board} from "./board.js";
import {Tile} from "./tile.js";
import {Timer} from "./timer.js";
import {canvasElement, start, gameMenu, pause} from "./init.js";

const ctx = canvasElement.getContext('2d');
ctx.font = '48px sanserif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

let gameBoard = new Board();
let boardGrid = gameBoard.init();

//new game start
const timer = new Timer();
start.addEventListener('click', e => {
  gameBoard = new Board(); 
  boardGrid = gameBoard.init();
  gameBoard.renderBoard(boardGrid, ctx);
  gameMenu.style.display = 'none';
  // timer.setTimer();
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

  if(checkGame(boardGrid, gameBoard.boardSize) === true) {
    alert('You Win!!!');
  }
});
// move tile on click end

pause.addEventListener('click', e => {
  gameMenu.style.display = 'flex';
  // timer.pause();
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
