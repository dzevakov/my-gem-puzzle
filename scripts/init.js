const body = document.querySelector('body');

// status bar start
const statusBar = document.createElement('section');
statusBar.className = 'status-bar';
body.append(statusBar);

const timer = document.createElement('div');
timer.className = 'timer';
statusBar.append(timer);

const timerBlock = document.createElement('div');
timerBlock.className = 'timer-block';
timerBlock.innerText = 'Time ';
timer.append(timerBlock);

const timeMinutes = document.createElement('span');
timeMinutes.className = 'time-minutes';
timeMinutes.innerHTML = '00';
timerBlock.append(timeMinutes);

timerBlock.append(' : ');

const timeSeconds = document.createElement('span');
timeSeconds.className = 'time-seconds';
timeSeconds.innerHTML = '00';
timerBlock.append(timeSeconds);

const movesBlock = document.createElement('div');
movesBlock.className = 'moves-block';
movesBlock.innerText = 'Moves : ';
statusBar.append(movesBlock);

export const movesAmount = document.createElement('span');
movesAmount.className = 'moves-amount';
movesAmount.innerText = '0';
movesBlock.append(movesAmount);

export const pause = document.createElement('input');
pause.className = 'pause';
pause.type = 'button';
pause.value = 'Pause';
statusBar.append(pause);
//status bar end

//game feild start
const container = document.createElement('div');
container.className = 'container';
statusBar.after(container);

export const canvasElement = document.createElement('canvas');
canvasElement.className = 'game-field';
canvasElement.width = '400';
canvasElement.height = '400';
container.append(canvasElement);
//game feild end

//game menu start
export const gameMenu = document.createElement('div');
gameMenu.className = 'game-menu menu-display';
container.append(gameMenu);

// pause menu start
export const pauseMenu = document.createElement('div');
pauseMenu.className = 'pause-menu menu-display';
pauseMenu.style.display = 'none';
gameMenu.append(pauseMenu);

export const resume = document.createElement('input');
resume.className = 'resume menu-button';
resume.type = 'button';
resume.value = 'Resume game';
pauseMenu.append(resume);

export const save = document.createElement('input');
save.className = 'save menu-button';
save.type = 'button';
save.value = 'Save';
pauseMenu.append(save);
// pause menu end

export const start = document.createElement('input');
start.className = 'start menu-button';
start.type = 'button';
start.value = 'New game';
gameMenu.append(start);

export const loadGame = document.createElement('input');
loadGame.className = 'load-game menu-button';
loadGame.type = 'button';
loadGame.value = 'Load game';
gameMenu.append(loadGame);

const scores = document.createElement('input');
scores.className = 'scores menu-button';
scores.type = 'button';
scores.value = 'Scores';
gameMenu.append(scores);

const settings = document.createElement('input');
settings.className = 'settings menu-button';
settings.type = 'button';
settings.value = 'Settings';
gameMenu.append(settings);
//game menu end