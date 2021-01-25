export class Timer {
  constructor() {
    this.minutes = document.querySelector('.time-minutes');
    this.seconds = document.querySelector('.time-seconds');
    this.sec = 0;
  }

  timerUpdate() {
    function addZero(num) {
      if (num >= 0 && num < 10) {
          return `0${num}`;
      } else {
          return num;
      }
    }

    this.sec = this.sec + 1;
    this.minutes.innerHTML = addZero(Math.floor(this.sec / 60));
    this.seconds.innerHTML = addZero(Math.floor(this.sec % 60));
  }

  setTimer() {
    this.timeInterval = setInterval(() => this.timerUpdate(), 1000);
  }

  reset() {
    this.sec = 0;
  }

  pause() {
    clearInterval(this.timeInterval);
  }
}




// export function setTimer() {
//   const minutes = document.querySelector('.time-minutes');
//   const seconds = document.querySelector('.time-seconds');
//   let timeInterval = setInterval(timerUpdate, 1000);

//   let sec = 0;

//   function timerUpdate() {
//     sec = sec + 1; 
    
//     minutes.innerHTML = addZero(Math.floor(sec / 60));
//     seconds.innerHTML = addZero(Math.floor(sec % 60));
//   }

//   function stop(timeInterval) {
//     clearInterval(timeInterval);
//     sec = 0;
//   }

//   function pause(timeInterval) {
//     clearInterval(timeInterval);
//   }
// }

// function addZero(num) {
//   if (num >= 0 && num < 10) {
//       return `0${num}`;
//   } else {
//       return num;
//   }
// }
