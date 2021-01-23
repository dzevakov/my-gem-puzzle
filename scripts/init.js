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
timerBlock.append(timeMinutes);

timerBlock.append(' : ');

const timeSeconds = document.createElement('span');
timeSeconds.className = 'time-seconds';
timerBlock.append(timeSeconds);

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
gameMenu.className = 'gameMenu';
container.append(gameMenu);

export const start = document.createElement('input');
start.className = 'start menu-button';
start.type = 'button';
start.value = 'New game';
gameMenu.append(start);

const savedGame = document.createElement('input');
savedGame.className = 'saved-game menu-button';
savedGame.type = 'button';
savedGame.value = 'Saved game';
gameMenu.append(savedGame);

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