export class Tile {
  constructor(caption, i, j) {
    this.caption = caption;
    this.X = j;
    this.Y = i;
  }

  render(canvasContext, tileRectungleWidth) {
    if(this.caption === 0) {
      canvasContext.clearRect((this.X * tileRectungleWidth), (this.Y * tileRectungleWidth),
        tileRectungleWidth, tileRectungleWidth);
    } else {
      canvasContext.fillStyle = 'rgb(113,161,255)';
      canvasContext.fillRect((this.X * tileRectungleWidth + 5),
        (this.Y * tileRectungleWidth + 5),
        tileRectungleWidth - 10, tileRectungleWidth - 10);
      canvasContext.strokeRect((this.X * tileRectungleWidth + 5),
        (this.Y * tileRectungleWidth + 5),
        tileRectungleWidth - 10, tileRectungleWidth - 10);
      canvasContext.fillStyle = 'black';
      canvasContext.fillText(this.caption,
        (this.X * tileRectungleWidth + (tileRectungleWidth / 2)),
        (this.Y * tileRectungleWidth + (tileRectungleWidth / 2)));
    }
  }
}
