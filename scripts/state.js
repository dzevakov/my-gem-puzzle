export class State {
  // constructor(score, boardGrid, boardSize, timer, move) {
  //   this.score =[];
  //   this.boardGrid = boardGrid;
  //   this.boardSize = boardSize;
  //   this.timer = timer;
  //   this.move = move;
  // }

  save() {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  load() {
    JSON.parse(localStorage.getItem("state"));
  }
}
