export class Tile {
  constructor(caption, j, i) {
    this.caption = caption;
    this.X = j;
    this.Y = i;
  }

  render(canvasContext, tileWidth, gridX, gridY) {
    if(this.caption === 0) {
      canvasContext.clearRect((gridX * tileWidth), (gridY * tileWidth),
        tileWidth, tileWidth);
    } else {
      canvasContext.fillStyle = 'rgb(113,161,255)';
      canvasContext.fillRect((gridX * tileWidth + 5), (gridY * tileWidth + 5),
        tileWidth - 10, tileWidth - 10);
      canvasContext.strokeRect((gridX * tileWidth + 5), (gridY * tileWidth + 5),
        tileWidth - 10, tileWidth - 10);
      canvasContext.fillStyle = 'black';
      canvasContext.fillText(this.caption,
        (gridX * tileWidth + (tileWidth / 2)),
        (gridY * tileWidth + (tileWidth / 2)));
    }
  }
}
