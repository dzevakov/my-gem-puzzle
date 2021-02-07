import {Board} from "./board.js";
import {MoveCounter} from "./move-counter.js";
import {Timer} from "./timer.js";
import {canvasElement, start, gameMenu, pauseMenu, resume,
  pause, save, loadGame, settings, scores, settingsContainer,
  mainMenuContainer, back, pictureSettings, soundToggle,
  scoreTable} from "./init.js";
import {State} from "./state.js";

export const ctx = canvasElement.getContext('2d');
if(window.innerWidth < 400) {
  resizeCanvas(300, 24);
 } else if (window.innerWidth > 400) {
  resizeCanvas(400, 36);
 }

// ctx.strokeStyle = 'black';
// ctx.font = '36px sanserif';
// ctx.textAlign = 'center';
// ctx.textBaseline = 'middle';

// resize canvas
function resizeCanvas(newSize, newFont) {
  ctx.canvas.width = newSize;
  ctx.canvas.height = newSize;
  ctx.strokeStyle = 'black';
  ctx.font = `${newFont}px sanserif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
}
 window.addEventListener('resize', e => {
   if(window.innerWidth < 400) {
    resizeCanvas(300, 24);
   } else if (window.innerWidth > 400) {
    resizeCanvas(400, 36);
   }
   state.gameBoard.renderBoard(ctx, tileWidth, canvasElement.width);
 });

//state init
export let state = new State();
state.gameBoard = new Board();
export let tileWidth;
export const imageObj = new Image(400, 400);
export let score = [];

function stateLoad() {
  state.timer = new Timer();
  state.moveCounter = new MoveCounter();
  state.gameBoard = new Board();
  state.gameBoard.init();
  state.tileType = false;
  state.imgName = 1;
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
  if(state.tileType) {
    imageObj.onload = function() {
      startGame(state.tileType);
    };
    state.imgName = Math.floor(Math.random() * 150);
    imageObj.src = `../img/base/${state.imgName}.jpg`;
  } else {
    startGame(state.tileType);
  }
});
//new game end

pause.addEventListener('click', e => {
  settingsContainer.style.display = 'none';
  scoreTable.style.display = 'none';
  back.style.display = 'none';
  scoreTable.innerHTML = '';
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
    tileWidth = canvasElement.width / state.gameBoard.boardSize;
    imageObj.onload = function() {
      state.gameBoard.renderBoard(ctx, tileWidth, canvasElement.width);
      gameMenu.style.display = 'none';
      pauseMenu.style.display = 'none';
      state.timer.setTimer();
    };
    imageObj.src = `../img/base/${state.imgName}.jpg`;
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
    state.tileType = false;
    startGame(state.tileType);
  });
}

for(let index = 0; index < boardSizeSettings.length - 1; index++) {
  settingsListner(boardSizeSettings[index], index);
}

pictureSettings.addEventListener('click', e => {
  state.gameBoard.boardSize = 4;
  state.tileType = true;
  imageObj.onload = function() {
    startGame(state.tileType);
  };
  state.imgName = Math.floor(Math.random() * 150);
  imageObj.src = `../img/base/${state.imgName}.jpg`;
});

back.addEventListener('click', e => {
  settingsContainer.style.display = 'none';
  scoreTable.style.display = 'none';
  back.style.display = 'none';
  scoreTable.innerHTML = '';
  mainMenuContainer.style.display = 'flex';
  pauseMenu.style.display = 'flex';  
});

//score
function renderScore(scoreInfo) {
  let scoreItem;
  scoreItem = document.createElement('h3');
    scoreItem.className = 'score-item';
    scoreItem.innerHTML = 'Position';
    scoreTable.append(scoreItem);

    scoreItem = document.createElement('h3');
    scoreItem.className = 'score-item';
    scoreItem.innerHTML = 'Time';
    scoreTable.append(scoreItem);

    scoreItem = document.createElement('h3');
    scoreItem.className = 'score-item';
    scoreItem.innerHTML = 'Moves';
    scoreTable.append(scoreItem);

    scoreItem = document.createElement('h3');
    scoreItem.className = 'score-item';
    scoreItem.innerHTML = 'Size';
    scoreTable.append(scoreItem);
  if(localStorage.score) {
    for(let i = 1; i <= scoreInfo.length; i++) {
      scoreItem = document.createElement('h3');
      scoreItem.className = 'score-item';
      scoreItem.innerHTML = i;
      scoreTable.append(scoreItem);

      scoreItem = document.createElement('h3');
      scoreItem.className = 'score-item';
      scoreItem.innerHTML = `${Math.floor(scoreInfo[i - 1].time / 60)}:${Math.floor(scoreInfo[i - 1].time % 60)}`;
      scoreTable.append(scoreItem);

      scoreItem = document.createElement('h3');
      scoreItem.className = 'score-item';
      scoreItem.innerHTML = scoreInfo[i - 1].moves;
      scoreTable.append(scoreItem);

      scoreItem = document.createElement('h3');
      scoreItem.className = 'score-item';
      scoreItem.innerHTML = scoreInfo[i - 1].size;
      scoreTable.append(scoreItem);
    }
  }
}

scores.addEventListener('click', e => {
  pauseMenu.style.display = 'none';
  mainMenuContainer.style.display = 'none';
  scoreTable.style.display = 'grid';
  back.style.display = 'block';
  score = JSON.parse(localStorage.getItem("score"));
  renderScore(score);
});

// sound toggle
function toggle(el) {
  if(el.classList.contains('sound-toggleOff')) {
    el.classList.remove('sound-toggleOff');
    el.classList.add('sound-toggleOn');
  } else {
    el.classList.remove('sound-toggleOn');
    el.classList.add('sound-toggleOff');
  }  
}

soundToggle.addEventListener('click', e => {
  toggle(soundToggle);
});
