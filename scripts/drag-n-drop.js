import {ctx, state} from "./script.js";
import {canvasElement} from "./init.js";

let targetTile = {
  X : null,
  Y : null
};
let X;
let Y;
let isMoving = false;
let isDeleting = false;
let xCorrect = 0;
let yCorrect = 0;
let draggable = {
  caption : null,
  X : null,
  Y : null
};

function onMoveDraw(rectX, rectY) {
  state.gameBoard.renderBoard(ctx);
  ctx.fillStyle = 'rgb(113,161,255)';
  ctx.fillRect((rectX + 5), (rectY + 5), 90, 90);
  ctx.strokeRect((rectX + 5), (rectY + 5), 90, 90);
  ctx.fillStyle = 'black';
  ctx.fillText(draggable.caption, (rectX + 50), (rectY + 50));
}

canvasElement.addEventListener('mousedown', e => {
  X = Math.floor(e.offsetX / 100);
  Y = Math.floor(e.offsetY / 100);
  xCorrect = e.offsetX - (state.gameBoard.boardGrid[Y][X].X * 100);
  yCorrect = e.offsetY - (state.gameBoard.boardGrid[Y][X].Y * 100);
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
  }
});

function reRenderTile(i, j) {
  state.gameBoard.boardGrid[j][i].caption = state.gameBoard.boardGrid[Y][X].caption;
  state.gameBoard.boardGrid[j][i].render(ctx);
  state.gameBoard.boardGrid[Y][X].caption = 0;
  state.gameBoard.boardGrid[Y][X].render(ctx);
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

  
    // reRenderTile(targetTile.X, targetTile.Y);
  
  if(e.offsetX > (targetTile.X * 100) &&
    e.offsetX < ((targetTile.X + 1) * 100) &&
    e.offsetY > (targetTile.Y * 100) &&
    e.offsetY < ((targetTile.Y + 1) * 100)) {
    state.gameBoard.boardGrid[targetTile.Y][targetTile.X].caption = draggable.caption;
    state.gameBoard.renderBoard(ctx);
  } else {
    state.gameBoard.boardGrid[Y][X].caption = draggable.caption;
    state.gameBoard.renderBoard(ctx);
  }

  isMoving = false;
  isDeleting = false;
});
  
  
 
  