export class State {
  constructor () {
    this.score =[];
    this.tilesArragement = [];
    this.boardSize = board.size;
  }

  save() {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  load() {
    JSON.parse(localStorage.getItem("state"));
  }
}
