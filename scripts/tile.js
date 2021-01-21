export class Tile {
  constructor(caption, i, j) {
    this.caption = caption;
    this.X = i;
    this.Y = j;
  }

  render(canvasContext) {
    if(this.caption === 0) {
      canvasContext.clearRect((this.X * 100), (this.Y * 100), 100, 100);
    } else {
      canvasContext.strokeStyle = 'black';
      canvasContext.fillStyle = 'rgb(113,161,255)';
      canvasContext.fillRect((this.X * 100 + 5), (this.Y * 100 + 5), 90, 90);
      canvasContext.strokeRect((this.X * 100 + 5), (this.Y * 100 + 5), 90, 90);
      canvasContext.fillStyle = 'black';
      canvasContext.fillText(this.caption, (this.X * 100 + 50), (this.Y * 100 + 50));
    }
  }
}
