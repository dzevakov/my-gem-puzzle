export class Tile {
  constructor(caption, j, i) {
    this.caption = caption;
    this.X = j;
    this.Y = i;
  }

  renderAnimation(canvasContext, tileWidth, gridX, gridY) {
    let i = 0;
    const tileMargin = Math.floor(tileWidth / 20);

    if(this.caption === 0) {
      canvasContext.clearRect((gridX * tileWidth), (gridY * tileWidth),
        tileWidth, tileWidth);
    } else {
      const t = setInterval(() => {
        canvasContext.clearRect((gridX * tileWidth), (gridY * tileWidth),
          tileWidth, tileWidth);
        canvasContext.fillStyle = 'rgb(113,161,255)';
        canvasContext.fillRect(((gridX * tileWidth) + (tileMargin * (10 - i))), ((gridY * tileWidth) + (tileMargin * (10 - i))),
          tileWidth * i / 10, tileWidth * i / 10);
        canvasContext.strokeRect(((gridX * tileWidth) + (tileMargin * (10 - i))), ((gridY * tileWidth) + (tileMargin * (10 - i))),
          tileWidth * i / 10, tileWidth * i / 10);
        canvasContext.fillStyle = 'black';
        canvasContext.fillText(this.caption,
          (gridX * tileWidth + (tileWidth / 2)),
          (gridY * tileWidth + (tileWidth / 2)));
        i++;
        if(i > 9) {
          clearInterval(t);
        }
      }, 15);
    }
  }

  render(canvasContext, tileWidth, gridX, gridY) {
    const tileMargin = Math.floor(tileWidth / 20);

    if(this.caption === 0) {
      canvasContext.clearRect((gridX * tileWidth), (gridY * tileWidth),
        tileWidth, tileWidth);
    } else {
      canvasContext.fillStyle = 'rgb(113,161,255)';
      canvasContext.fillRect((gridX * tileWidth + tileMargin), (gridY * tileWidth + tileMargin),
        tileWidth - 10, tileWidth - 10);
      canvasContext.strokeRect((gridX * tileWidth + tileMargin), (gridY * tileWidth + tileMargin),
        tileWidth - 10, tileWidth - 10);
      canvasContext.fillStyle = 'black';
      canvasContext.fillText(this.caption,
        (gridX * tileWidth + (tileWidth / 2)),
        (gridY * tileWidth + (tileWidth / 2)));
    }
  }
}

