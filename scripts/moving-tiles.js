import {ctx, state, tileRectungleWidth} from "./script.js";
import {canvasElement} from "./init.js";

let targetTile = {
  X : null,
  Y : null,
  clear : function() {
    this.X = null;
    this.Y = null;
  }
};
let X;
let Y;
let isMoving = false;
let wasMoving = false;
let isDeleting = false;
let xCorrect = 0;
let yCorrect = 0;
let draggable = {
  caption : null,
  X : null,
  Y : null
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
  X = Math.floor(e.offsetX / tileRectungleWidth);
  Y = Math.floor(e.offsetY / tileRectungleWidth);
  xCorrect = e.offsetX - (state.gameBoard.boardGrid[Y][X].X * tileRectungleWidth);
  yCorrect = e.offsetY - (state.gameBoard.boardGrid[Y][X].Y * tileRectungleWidth);
  isMoving = true;
  isDeleting = true;
  draggable.caption = state.gameBoard.boardGrid[Y][X].caption;
  draggable.X = X;
  draggable.Y = Y;
});

canvasElement.addEventListener('mousemove', e => {
  if(isDeleting === true) {
    state.gameBoard.boardGrid[Y][X].caption = 0;
    isDeleting = false;
  }
  if(isMoving === true) {
    onMoveDraw(e.offsetX - xCorrect, e.offsetY - yCorrect);
    wasMoving = true;
  }
});

function reRenderTile(i, j) {
  state.gameBoard.boardGrid[j][i].caption = state.gameBoard.boardGrid[Y][X].caption;
  state.gameBoard.boardGrid[j][i].render(ctx, tileRectungleWidth);
  state.gameBoard.boardGrid[Y][X].caption = 0;
  state.gameBoard.boardGrid[Y][X].render(ctx, tileRectungleWidth);
  state.moveCounter.countMoves();
}

canvasElement.addEventListener('mouseup', e => {
  if((Y > 0) && (state.gameBoard.boardGrid[Y - 1][X].caption === 0)) {
    targetTile.X = X;
    targetTile.Y = Y - 1;
  } else if((X > 0) && (state.gameBoard.boardGrid[Y][X - 1].caption === 0)) {
    targetTile.X = X - 1;
    targetTile.Y = Y;
  } else if((Y < state.gameBoard.boardSize - 1) && (state.gameBoard.boardGrid[Y + 1][X].caption === 0)) {
    targetTile.X = X;
    targetTile.Y = Y + 1;
  } else if((X < state.gameBoard.boardSize - 1) && (state.gameBoard.boardGrid[Y][X + 1].caption === 0)) {
    targetTile.X = X + 1;
    targetTile.Y = Y;
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
      state.gameBoard.boardGrid[Y][X].caption = draggable.caption;
      state.gameBoard.renderBoard(ctx, tileRectungleWidth, canvasElement.width);
    }
  } else {
    if(targetTile.X && targetTile.Y) {
      reRenderTile(targetTile.X, targetTile.Y);
    }
  }
  
  isMoving = false;
  wasMoving = false;
  isDeleting = false;
  targetTile.clear();
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
 
  