import { Tile } from "./tile";

export class Board {
  randomCaption(boardSize) {
    let nums = Array.from(Array(boardSize * boardSize).keys());
    const result = [];
    let i = nums.length;
    let j = 0;
  
    //лучше явно писать условие остановки. И чисто теоретически в твоем варианте мы можем проскачить 0 если внутри цикла еще раз уменьшим i
    // т.е. цикл не остановиться т.к. 0 не наступит
    while (i>0) {
        i--
        j = Math.floor(Math.random() * (i + 1));
        result.push(nums[j]);
        nums.splice(j,1);
    }
    return result;
  }
  
  
  init(boardSize = 4) {
    const boardGrid = [];

    for(let i = 0; i < boardSize; i++) {
      boardGrid[i] = new Array(boardSize);
    }
    
    const tilesCaptions = this.randomCaption(boardSize);
    //никогда не пиши +=1 или -=1 если с 1 то это ++ или --
    for(let i = 0; i < boardSize; i++) {
      for(let j = 0; j < boardSize; j++) {
        //лучше хранить двумерный массив таилов, и у каждого таила свой кэпшн.
        //а не отдельно массив кэпшнов и массив тайлов, если я правильно понял что ты отел сделать
        boardGrid[i][j] = new Tile(tilesCaptions.shift(), i, j);
      }
    }
  }

  //так будет выглядеть рендщер если у нас массив тайлов
  renderBoard(boardGrid) {
    for(let i = 0; i < boardSize; i++) {
      for(let j = 0; j < boardSize; j++) {
        boardGrid[i][j].render()
      }
    }
  }
 

  //Это работает? тут же i это будет row а не индекс.
  //i,j,k это переменные которые обычно используют только для индексов, я не уверен что у тебя тут будут индексы
  renderBoard(boardGrid) {
    boardGrid.forEach(i => {
      i.forEach(j => {
        Tile.render(boardGrid[i][j]);
      });
    });
  }
}
