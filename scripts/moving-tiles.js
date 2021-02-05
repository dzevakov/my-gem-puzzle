import {ctx, state, tileWidth, imageObj} from "./script.js";
import {canvasElement, soundToggle} from "./init.js";
import {addScore} from "./score.js";

let sound = new Audio('../sounds/sound.mp3');

let targetTile = {
  X : undefined,
  Y : undefined,
  clear : function() {
    this.X = undefined;
    this.Y = undefined;
  }
};
let mouseDownXY = {
  X : undefined,
  Y : undefined,
  clear : function() {
    this.X = undefined;
    this.Y = undefined;
  }
};
let isMoving = false;
let wasMoving = false;
let isDeleting = false;
let xCorrect = 0;
let yCorrect = 0;
let draggable = {
  caption : undefined,
  X : undefined,
  Y : undefined
};

function onMoveDraw(rectX, rectY) {
  if(state.tileType) {
    state.gameBoard.renderBoard(ctx, tileWidth, canvasElement.width);
    ctx.drawImage(imageObj, draggable.X * 225, draggable.Y * 225, 225, 225, rectX, rectY, tileWidth, tileWidth);
    ctx.strokeRect((rectX), (rectY), tileWidth, tileWidth);
    ctx.fillStyle = 'black';
    ctx.fillText(draggable.caption, (rectX + (tileWidth / 2)),
      (rectY + (tileWidth / 2)));
  } else {
    state.gameBoard.renderBoard(ctx, tileWidth, canvasElement.width);
    ctx.fillStyle = 'rgb(113,161,255)';
    ctx.fillRect((rectX + 5), (rectY + 5),
      tileWidth - 10, tileWidth - 10);
    ctx.strokeRect((rectX + 5), (rectY + 5),
      tileWidth - 10, tileWidth - 10);
    ctx.fillStyle = 'black';
    ctx.fillText(draggable.caption, (rectX + (tileWidth / 2)),
      (rectY + (tileWidth / 2)));
  }
}

canvasElement.addEventListener('mousedown', e => {
  e.preventDefault();
  draggable.X = Math.floor(e.offsetX / tileWidth);
  draggable.Y = Math.floor(e.offsetY / tileWidth);
  mouseDownXY.X = e.offsetX;
  mouseDownXY.Y = e.offsetY;
  xCorrect = e.offsetX - (draggable.X * tileWidth);
  yCorrect = e.offsetY - (draggable.Y * tileWidth);
  isMoving = true;
  isDeleting = true;
  draggable.caption = state.gameBoard.boardGrid[draggable.Y][draggable.X].caption;
});

canvasElement.addEventListener('mousemove', e => {
  e.preventDefault();
  if(Math.abs(mouseDownXY.X - e.offsetX) > 10 || Math.abs(mouseDownXY.Y - e.offsetY) > 10) {
    if(isDeleting === true) {
      state.gameBoard.boardGrid[draggable.Y][draggable.X].caption = 0;
      isDeleting = false;
    }
    if(isMoving === true) {
      onMoveDraw(e.offsetX - xCorrect, e.offsetY - yCorrect);
      wasMoving = true;
    }
  }
});

function reRenderTile(j, i) {
  const tempTile = state.gameBoard.boardGrid[i][j];
  state.gameBoard.boardGrid[i][j] = state.gameBoard.boardGrid[draggable.Y][draggable.X];
  state.gameBoard.boardGrid[draggable.Y][draggable.X] = tempTile;
  state.gameBoard.boardGrid[i][j].renderAnimation(ctx, tileWidth, j, i);
  state.gameBoard.boardGrid[draggable.Y][draggable.X].renderAnimation(ctx, tileWidth, draggable.X, draggable.Y);  
  state.moveCounter.countMoves();
}

function clearDate() {
  isMoving = false;
  wasMoving = false;
  isDeleting = false;
  targetTile.clear();
  mouseDownXY.clear();
}

document.addEventListener('mouseup', e => {
  e.preventDefault();
  if(wasMoving && e.target.tagName != 'Canvas') {
    state.gameBoard.boardGrid[draggable.Y][draggable.X].caption = draggable.caption;
    state.gameBoard.renderBoard(ctx, tileWidth, canvasElement.width);

    audioPlay();
    clearDate();
  }
});

function audioPlay() {
  if(soundToggle.classList.contains('sound-toggleOn')) {
    sound.addEventListener('canplaythrough', e => {
      e.preventDefault();
      sound.play();
    });

    sound.pause();
    sound.currentTime = 0;
    sound.play();
  }
}

canvasElement.addEventListener('mouseup', e => {
  e.preventDefault();
  if((draggable.Y > 0) && (state.gameBoard.boardGrid[draggable.Y - 1][draggable.X].caption === 0)) {
    targetTile.X = draggable.X;
    targetTile.Y = draggable.Y - 1;
  } else if((draggable.X > 0) && (state.gameBoard.boardGrid[draggable.Y][draggable.X - 1].caption === 0)) {
    targetTile.X = draggable.X - 1;
    targetTile.Y = draggable.Y;
  } else if((draggable.Y < state.gameBoard.boardSize - 1) && (state.gameBoard.boardGrid[draggable.Y + 1][draggable.X].caption === 0)) {
    targetTile.X = draggable.X;
    targetTile.Y = draggable.Y + 1;
  } else if((draggable.X < state.gameBoard.boardSize - 1) && (state.gameBoard.boardGrid[draggable.Y][draggable.X + 1].caption === 0)) {
    targetTile.X = draggable.X + 1;
    targetTile.Y = draggable.Y;
  }

  const tempTile = state.gameBoard.boardGrid[draggable.Y][draggable.X];
  tempTile.caption = draggable.caption;
  if(wasMoving) {
    if(e.offsetX > (targetTile.X * tileWidth) &&
      e.offsetX < ((targetTile.X + 1) * tileWidth) &&
      e.offsetY > (targetTile.Y * tileWidth) &&
      e.offsetY < ((targetTile.Y + 1) * tileWidth)) {
      state.gameBoard.boardGrid[draggable.Y][draggable.X] = state.gameBoard.boardGrid[targetTile.Y][targetTile.X];
      state.gameBoard.boardGrid[targetTile.Y][targetTile.X] = tempTile;
      state.gameBoard.renderBoard(ctx, tileWidth, canvasElement.width);
      state.moveCounter.countMoves();
      audioPlay();
    } else {
      state.gameBoard.boardGrid[draggable.Y][draggable.X].caption = draggable.caption;
      state.gameBoard.renderBoard(ctx, tileWidth, canvasElement.width);
      audioPlay();
    }
  } else {
    if(targetTile.X !== undefined && targetTile.Y !== undefined) {
      reRenderTile(targetTile.X, targetTile.Y);
      audioPlay();
    }
  }
  
  clearDate();

  if(checkGame(state.gameBoard.boardGrid, state.gameBoard.boardSize)) {
    state.timer.pause();
    alert(`You WIN with ${Math.floor(state.timer.sec / 60)}:${Math.floor(state.timer.sec % 60)} time & ${state.moveCounter.move} moves.`);
  }
});
  
// end of the game start
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
  addScore();
  return true;
}
// end of the game end
   