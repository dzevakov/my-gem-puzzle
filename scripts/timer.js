export function setTimer() {
  const minutes = document.querySelector('.time-minutes');
  const seconds = document.querySelector('.time-seconds');
  let timeInterval = setInterval(timerUpdate, 1000);

  let sec = 0;

  function timerUpdate() {
    sec = sec + 1; 
    
    minutes.innerHTML = addZero(Math.floor(sec / 60));
    seconds.innerHTML = addZero(Math.floor(sec % 60));
  }
}

function addZero(num) {
  if (num >= 0 && num < 10) {
      return `0${num}`;
  } else {
      return num;
  }
}