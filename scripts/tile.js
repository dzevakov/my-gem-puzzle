import {state} from "./script.js";

export class Tile {
  constructor(caption, i, j) {
    this.caption = caption;
    this.X = j;
    this.Y = i;
    this.tileMargin = state.tileMargin;
  }

  render(canvasContext, tileWidth, gridY, gridX) {
    if(this.caption === 0) {
      canvasContext.clearRect((gridX * tileWidth), (gridY * tileWidth),
        tileWidth, tileWidth);
    } else {
      canvasContext.fillStyle = 'rgb(113,161,255)';
      canvasContext.fillRect((gridX * tileWidth + (this.tileMargin / 2)),
        (gridY * tileWidth + (this.tileMargin / 2)),
        tileWidth - this.tileMargin, tileWidth - this.tileMargin);
      canvasContext.strokeRect((gridX * tileWidth + (this.tileMargin / 2)),
        (gridY * tileWidth + (this.tileMargin / 2)),
        tileWidth - this.tileMargin, tileWidth - this.tileMargin);
      canvasContext.fillStyle = 'black';
      canvasContext.fillText(this.caption,
        (gridX * tileWidth + (tileWidth / 2)),
        (gridY * tileWidth + (tileWidth / 2)));
    }
  }
}
