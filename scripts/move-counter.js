export class MoveCounter {
    constructor(movesAmount) {
        this.move = 0;
        this.movesAmount = document.querySelector('.moves-amount');
    }

    get moves() {
        return this.move;
    }

    countMoves() {
        this.move++;
        this.movesAmount.innerHTML = this.move;
    }

    reset() {
        this.move = 0;
        this.movesAmount.innerHTML = this.move;
    }
}