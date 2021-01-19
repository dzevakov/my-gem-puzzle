import { Tile } from "./tile";

export class Board {
  constructor(boardSize) {
    this.boardSize = boardSize;
  }

  randomCaption(boardSize) {
    let nums = Array.from(Array(boardSize * boardSize).keys());
    const result = [];
    let i = nums.length;
    let j = 0;
  
    while (i > 0) {
      i--;
      j = Math.floor(Math.random() * (i + 1));
      result.push(nums[j]);
      nums.splice(j,1);
    }
    return result;
  }
  
  init(boardSize = 4) {
    const boardGrid = [];

    for(let i = 0; i < boardSize; i++) {
      boardGrid[i] = new Array(boardSize);
    }
    
    const tilesCaptions = this.randomCaption(boardSize);
    for(let i = 0; i < boardSize; i ++) {
      for(let j = 0; j < boardSize; j ++) {
        boardGrid[i][j] = new Tile(tilesCaptions.shift(), i, j);
      }
    }
  }

  renderBoard(boardGrid) {
    for(let i = 0; i < this.boardSize; i++) {
      for(let j = 0; j < this.boardSize; j++) {
        boardGrid[i][j].render();
      }
    }
  }
}
