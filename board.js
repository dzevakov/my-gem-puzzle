import { Tile } from "./tile";

export class Board {
  randomCaption(boardSize) {
    let nums = Array.from(Array(boardSize * boardSize).keys());
    const result = [];
    let i = nums.length;
    let j = 0;
  
    while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        result.push(nums[j]);
        nums.splice(j,1);
    }
    return result;
  }
  

  init(boardSize = 4) {
    const boardGrid = [];

    for(let i = 0; i < boardSize; i += 1) {
      boardGrid[i] = new Array(boardSize);
    }
    
    const tilesCaptions = this.randomCaption(boardSize);
    for(let i = 0; i < boardSize; i += 1) {
      for(let j = 0; j < boardSize; j += 1) {
        boardGrid[i][j] = tilesCaptions.shift();
      }
    }
  }

  renderBoard(boardGrid) {
    boardGrid.forEach(i => {
      i.forEach(j => {
        Tile.render(boardGrid[i][j]);
      });
    });
  }
}
