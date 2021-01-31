import {Board} from "./board.js";
import {MoveCounter} from "./move-counter.js";
import {Timer} from "./timer.js";
import {canvasElement, start, gameMenu, pauseMenu, resume,
  pause, save, loadGame, settings, scores, settingsContainer,
  mainMenuContainer, back, pictureSettings} from "./init.js";
import {State} from "./state.js";

export const ctx = canvasElement.getContext('2d');
ctx.strokeStyle = 'black';
ctx.font = '36px sanserif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

//state init
export let state = new State();
state.gameBoard = new Board();
export let tileWidth;
export const imageObj = new Image(400, 400);

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
function startGame(tileType) {  
  state.gameBoard.init(tileType);
  tileWidth = canvasElement.width / state.gameBoard.boardSize;
  state.gameBoard.renderBoard(ctx, tileWidth, canvasElement.width);
  gameMenu.style.display = 'none';
  pauseMenu.style.display = 'none';
  state.moveCounter.reset();
  state.timer.reset();
  state.timer.setTimer();
}

start.addEventListener('click', e => {
  startGame();
});
//new game end

pause.addEventListener('click', e => {
  settingsContainer.style.display = 'none';
  back.style.display = 'none';
  gameMenu.style.display = 'flex';
  mainMenuContainer.style.display = 'flex';
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
    state.gameBoard.renderBoard(ctx, tileWidth, canvasElement.width);
    gameMenu.style.display = 'none';
    pauseMenu.style.display = 'none';
    state.timer.setTimer();
  }
});

settings.addEventListener('click', e => {
  pauseMenu.style.display = 'none';
  mainMenuContainer.style.display = 'none';

  settingsContainer.style.display = 'flex';
  back.style.display = 'block';
});

const boardSizeSettings = document.querySelectorAll('.boardSize-settings');
function settingsListner(element, index) {
  element.addEventListener('click', e => {
    state.gameBoard.boardSize = index + 3;
    state.tileMargin = 10;
    startGame();
  });
}

for(let index = 0; index < boardSizeSettings.length - 1; index++) {
  settingsListner(boardSizeSettings[index], index);
}

pictureSettings.addEventListener('click', e => {
  state.gameBoard.boardSize = 4;
  imageObj.onload = function() {
    startGame(true);
  };
  const imgName = Math.floor(Math.random() * 150);
  imageObj.src = `../img/base/${imgName}.jpg`;
});

back.addEventListener('click', e => {
  settingsContainer.style.display = 'none';
  back.style.display = 'none';
  mainMenuContainer.style.display = 'flex';
  pauseMenu.style.display = 'flex';  
});

scores.addEventListener('click', e => {
  pauseMenu.style.display = 'none';
  mainMenuContainer.style.display = 'none';
  scores.style.display = 'block';
  back.style.display = 'block';
});
