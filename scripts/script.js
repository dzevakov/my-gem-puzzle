import {Board} from "./board.js";
import {MoveCounter} from "./move-counter.js";
import {Timer} from "./timer.js";
import {canvasElement, start, gameMenu, pauseMenu, resume, pause, save, loadGame} from "./init.js";
import {State} from "./state.js";

const ctx = canvasElement.getContext('2d');
ctx.font = '48px sanserif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

//state init
let state = new State();
function stateLoad() {
  state.timer = new Timer();
  state.moveCounter = new MoveCounter();
  state.gameBoard = new Board();
  state.gameBoard.init();
  state.score = [];
  if(localStorage.getItem('state')) {
    state.load();
  }
}

stateLoad();

//new game start
start.addEventListener('click', e => {
  state.gameBoard = new Board(); 
  state.gameBoard.init();
  state.gameBoard.renderBoard(ctx);
  gameMenu.style.display = 'none';
  pauseMenu.style.display = 'none';
  state.moveCounter.reset();
  state.timer.reset();
  state.timer.setTimer();
});
//new game end

// move tile on click start
function reRenderTile(i, j) {
  state.gameBoard.boardGrid[i][j].caption = 0;
  state.gameBoard.boardGrid[i][j].render(ctx);
  state.moveCounter.countMoves();
}

canvasElement.addEventListener('click', e => {
  const j = Math.floor(e.offsetX / 100);
  const i = Math.floor(e.offsetY / 100);
  
  if((i > 0) && (state.gameBoard.boardGrid[i - 1][j].caption === 0)) {
    state.gameBoard.boardGrid[i - 1][j].caption = state.gameBoard.boardGrid[i][j].caption;
    state.gameBoard.boardGrid[i - 1][j].render(ctx);
    reRenderTile(i, j);
  } else if((j > 0) && (state.gameBoard.boardGrid[i][j - 1].caption === 0)) {
    state.gameBoard.boardGrid[i][j - 1].caption = state.gameBoard.boardGrid[i][j].caption;
    state.gameBoard.boardGrid[i][j - 1].render(ctx);
    reRenderTile(i, j);
  } else if((i < state.gameBoard.boardSize - 1) && (state.gameBoard.boardGrid[i + 1][j].caption === 0)) {
    state.gameBoard.boardGrid[i + 1][j].caption = state.gameBoard.boardGrid[i][j].caption;
    state.gameBoard.boardGrid[i + 1][j].render(ctx);
    reRenderTile(i, j);
  } else if((j < state.gameBoard.boardSize - 1) && (state.gameBoard.boardGrid[i][j + 1].caption === 0)) {
    state.gameBoard.boardGrid[i][j + 1].caption = state.gameBoard.boardGrid[i][j].caption;
    state.gameBoard.boardGrid[i][j + 1].render(ctx);
    reRenderTile(i, j);
  }

  if(checkGame(state.gameBoard.boardGrid, state.gameBoard.boardSize) === true) {
    // alert(`Ура! Вы решили головоломку за #:## и ${movesAmount.innerHTML} ходов`);
  }
});
// move tile on click end

pause.addEventListener('click', e => {
  gameMenu.style.display = 'flex';
  pauseMenu.style.display = 'flex';
  state.timer.pause();
});

resume.addEventListener('click', e => {
  gameMenu.style.display = 'none';
  pauseMenu.style.display = 'none';
  state.timer.setTimer();
});

save.addEventListener('click', e => {
  state.save(state);
});

loadGame.addEventListener('click', e => {
  if(localStorage.getItem('state')) {
    state.load();
    state.gameBoard.renderBoard(ctx);
    gameMenu.style.display = 'none';
    pauseMenu.style.display = 'none';
    state.timer.setTimer();
  }
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
