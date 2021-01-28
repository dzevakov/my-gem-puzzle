import {ctx, state, tileRectungleWidth} from "./script.js";
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
  state.gameBoard.renderBoard(ctx, tileRectungleWidth, canvasElement.width);
  ctx.fillStyle = 'rgb(113,161,255)';
  ctx.fillRect((rectX + 5), (rectY + 5),
    tileRectungleWidth - 10, tileRectungleWidth - 10);
  ctx.strokeRect((rectX + 5), (rectY + 5),
    tileRectungleWidth - 10, tileRectungleWidth - 10);
  ctx.fillStyle = 'black';
  ctx.fillText(draggable.caption, (rectX + (tileRectungleWidth / 2)),
    (rectY + (tileRectungleWidth / 2)));
}

canvasElement.addEventListener('mousedown', e => {
  draggable.X = Math.floor(e.offsetX / tileRectungleWidth);
  draggable.Y = Math.floor(e.offsetY / tileRectungleWidth);
  mouseDownXY.X = e.offsetX;
  mouseDownXY.Y = e.offsetY;
  xCorrect = e.offsetX - (state.gameBoard.boardGrid[draggable.Y][draggable.X].X * tileRectungleWidth);
  yCorrect = e.offsetY - (state.gameBoard.boardGrid[draggable.Y][draggable.X].Y * tileRectungleWidth);
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

function reRenderTile(i, j) {
  state.gameBoard.boardGrid[j][i].caption = state.gameBoard.boardGrid[draggable.Y][draggable.X].caption;
  state.gameBoard.boardGrid[j][i].render(ctx, tileRectungleWidth);
  state.gameBoard.boardGrid[draggable.Y][draggable.X].caption = 0;
  state.gameBoard.boardGrid[draggable.Y][draggable.X].render(ctx, tileRectungleWidth);
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

  if(wasMoving) {
    if(e.offsetX > (targetTile.X * tileRectungleWidth) &&
      e.offsetX < ((targetTile.X + 1) * tileRectungleWidth) &&
      e.offsetY > (targetTile.Y * tileRectungleWidth) &&
      e.offsetY < ((targetTile.Y + 1) * tileRectungleWidth)) {
      state.gameBoard.boardGrid[targetTile.Y][targetTile.X].caption = draggable.caption;
      state.gameBoard.renderBoard(ctx, tileRectungleWidth, canvasElement.width);
      state.moveCounter.countMoves();
    } else {
      state.gameBoard.boardGrid[draggable.Y][draggable.X].caption = draggable.caption;
      state.gameBoard.renderBoard(ctx, tileRectungleWidth, canvasElement.width);
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
 
  