import {Tile} from "./tile.js";
import {imageObj} from "./script.js";

export class TilePic extends Tile {
  renderAnimation(canvasContext, tileWidth, gridX, gridY) {
    let i = 0;

    if(this.caption === 0) {
      canvasContext.clearRect((gridX * tileWidth), (gridY * tileWidth),
        tileWidth, tileWidth);
    } else {
      let destX = gridX * tileWidth;
      let destY = gridY * tileWidth;
      const t = setInterval(() => {
        canvasContext.clearRect((gridX * tileWidth), (gridY * tileWidth),
          tileWidth, tileWidth);
        canvasContext.drawImage(imageObj, this.X * 225, this.Y * 225, 225, 225,
          (destX + (5 * (10 - i))),
          (destY + (5 * (10 - i))),
          tileWidth * i / 10, tileWidth * i / 10);
        canvasContext.strokeRect((destX + (5 * (10 - i))), (destY + (5 * (10 - i))),
          tileWidth * i / 10, tileWidth * i / 10);
        canvasContext.fillStyle = 'black';
        canvasContext.fillText(this.caption,
          (gridX * tileWidth + (tileWidth / 2)),
          (gridY * tileWidth + (tileWidth / 2)));
        i++;
        if(i > 10) {
          clearInterval(t);
        }
      }, 15);
    }
  }

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