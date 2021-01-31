import {Tile} from "./tile.js";
import {TilePic} from "./tile-picture.js";

export class Board {
  constructor(boardSize = 4) {
    this.boardSize = boardSize;
    this.boardGrid = [];
  }

  randomTiles(tileType) {
    let tilesArray = [];
    let captionNumber = 1;
    for(let i = 0; i < this.boardSize; i++) {
      for(let j = 0; j < this.boardSize; j++) {
        if(tileType) {
          tilesArray.push(new TilePic(captionNumber++, j, i));
        } else {
          tilesArray.push(new Tile(captionNumber++, j, i));
        }
      }
    }

    tilesArray[tilesArray.length - 1].caption = 0;

    const result = [];
    let k = tilesArray.length;
    let l = 0;

    while (k > 0) {
      k--;
      l = Math.floor(Math.random() * (k + 1));
      result.push(tilesArray[l]);
      tilesArray.splice(l, 1);
    }
    return result;
  }
  
  init(tileType) {
    for(let i = 0; i < this.boardSize; i++) {
      this.boardGrid[i] = new Array(this.boardSize);
    }
    
    const tiles = this.randomTiles(tileType);
    for(let i = 0; i < this.boardSize; i ++) {
      for(let j = 0; j < this.boardSize; j ++) {
          this.boardGrid[i][j] = tiles.shift();
      }
    }
  }

  renderBoard(canvasContext, tileWidth, canvasWidth) {
    canvasContext.clearRect(0, 0, canvasWidth, canvasWidth);
    for(let i = 0; i < this.boardSize; i++) {
      for(let j = 0; j < this.boardSize; j++) {
        this.boardGrid[i][j].render(canvasContext, tileWidth, j, i);
      }
    }
  }
}
