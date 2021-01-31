import {ctx, state, tileWidth} from "./script.js";
import {canvasElement} from "./init.js";

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

canvasElement.addEventListener('mousedown', e => {
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
  state.gameBoard.boardGrid[i][j].render(ctx, tileWidth, j, i);
  state.gameBoard.boardGrid[draggable.Y][draggable.X] = tempTile;
  state.gameBoard.boardGrid[draggable.Y][draggable.X].render(ctx, tileWidth, draggable.X, draggable.Y);
  state.moveCounter.countMoves();
}

canvasElement.addEventListener('mouseup', e => {
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
    } else {
      state.gameBoard.renderBoard(ctx, tileWidth, canvasElement.width);
    }
  } else {
    if(targetTile.X !== undefined && targetTile.Y !== undefined) {
      reRenderTile(targetTile.X, targetTile.Y);
    }
  }
  
  isMoving = false;
  wasMoving = false;
  isDeleting = false;
  targetTile.clear();
  mouseDownXY.clear();

  if(checkGame(state.gameBoard.boardGrid, state.gameBoard.boardSize)) {
    state.timer.pause();
    alert(`You WIN with ${Math.floor(state.timer.sec / 60)}:${Math.floor(state.timer.sec % 60)} time & ${state.moveCounter.move} moves.`);
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
   