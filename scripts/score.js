import {state, score} from "./script.js";

function addNewScore(newScore) {
  newScore.time = state.timer.sec;
  newScore.moves = state.moveCounter.move;
  if(state.tileType) {
    newScore.size = 'picture';
  } else {
    newScore.size = state.gameBoard.boardSize;
  }
  return newScore;
}

export function addScore() {
  let result = [];
  const newScore = {};
  let j = 0;
  let compare = true;

  if(localStorage.score) {
    const scoreDate = JSON.parse(localStorage.getItem("score"));

    for(let i = 0; i < 10 && j < scoreDate.length; i++) {
      if(state.timer.sec < scoreDate[j].time && compare) {
        addNewScore(newScore);
        result.push(newScore);
        compare = false;
      }
      result.push(scoreDate[j]);
      j++;
    }
    if(compare && result.length < 9) {
      addNewScore(newScore);
      result.push(newScore);
    }
  } else {
    addNewScore(newScore);
    result.push(newScore);
  }
  localStorage.setItem("score", JSON.stringify(result));
}