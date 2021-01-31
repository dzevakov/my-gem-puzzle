import {Tile} from "./tile.js";

export class State {
  save(item) {
    localStorage.setItem("state", JSON.stringify(item));
  }

  load() {
    const loadItem = JSON.parse(localStorage.getItem("state"));
   
    this.gameBoard.boardSize = loadItem.gameBoard.boardSize;

    this.gameBoard.boardGrid = [];
    for(let i = 0; i < this.gameBoard.boardSize; i++) {
      this.gameBoard.boardGrid[i] = new Array(this.gameBoard.boardSize);
    }
    for(let i = 0; i < this.gameBoard.boardSize; i ++) {
      for(let j = 0; j < this.gameBoard.boardSize; j ++) {
        this.gameBoard.boardGrid[i][j] = new Tile(null, i, j, loadItem.tileMargin);
      }
    }
    
    for(let i = 0; i < this.gameBoard.boardSize; i ++) {
      for(let j = 0; j < this.gameBoard.boardSize; j ++) {
        this.gameBoard.boardGrid[i][j].caption = loadItem.gameBoard.boardGrid[i][j].caption;
        this.gameBoard.boardGrid[i][j].Y = loadItem.gameBoard.boardGrid[i][j].Y;
        this.gameBoard.boardGrid[i][j].X = loadItem.gameBoard.boardGrid[i][j].X;
      }
    }
    this.moveCounter.move = loadItem.moveCounter.move;
    this.timer.sec = loadItem.timer.sec;
    this.score = loadItem.score;
  }
}
