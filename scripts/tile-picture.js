import {Tile} from "./tile.js";
import {imageObj} from "./script.js";

export class TilePic extends Tile {
  render(canvasContext, tileWidth, gridX, gridY) {
    if(this.caption === 0) {
      canvasContext.clearRect((gridX * tileWidth), (gridY * tileWidth),
        tileWidth, tileWidth);
    } else {
      let destX = gridX * tileWidth;
      let destY = gridY * tileWidth;
      canvasContext.drawImage(imageObj, this.X * 225, this.Y * 225, 225, 225, destX, destY, tileWidth, tileWidth);

      canvasContext.strokeRect(destX, destY, tileWidth, tileWidth);
      canvasContext.fillStyle = 'black';
      canvasContext.fillText(this.caption,
        (destX + (tileWidth / 2)),
        (destY + (tileWidth / 2)));
    }
  }
}