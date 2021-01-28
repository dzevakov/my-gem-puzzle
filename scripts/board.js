import {Tile} from "./tile.js";

export class Board {
  constructor(boardSize = 3) {
    this.boardSize = boardSize;
    this.boardGrid = [];
  }

  randomCaption() {
    let nums = Array.from(Array(this.boardSize * this.boardSize).keys());
    const result = [];
    let i = nums.length;
    let j = 0;
  
    while (i > 0) {
      i--;
      j = Math.floor(Math.random() * (i + 1));
      result.push(nums[j]);
      nums.splice(j, 1);
    }
    return result;
  }
  
  init() {
    for(let i = 0; i < this.boardSize; i++) {
      this.boardGrid[i] = new Array(this.boardSize);
    }
    
    const tilesCaptions = this.randomCaption(this.boardSize);
    for(let i = 0; i < this.boardSize; i ++) {
      for(let j = 0; j < this.boardSize; j ++) {
        this.boardGrid[i][j] = new Tile(tilesCaptions.shift(), i, j);
      }
    }
  }

  renderBoard(canvasContext, tileRectungleWidth, canvasWidth) {
    canvasContext.clearRect(0, 0, canvasWidth, canvasWidth);
    for(let i = 0; i < this.boardSize; i++) {
      for(let j = 0; j < this.boardSize; j++) {
        this.boardGrid[i][j].render(canvasContext, tileRectungleWidth);
      }
    }
  }
}
