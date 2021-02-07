const body = document.querySelector('body');

// container
const container = document.createElement('div');
container.className = 'container';
body.append(container);

// status bar start
const statusBar = document.createElement('section');
statusBar.className = 'status-bar status-item';
container.append(statusBar);

const timer = document.createElement('div');
timer.className = 'timer status-item';
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
movesBlock.className = 'moves-block status-item';
movesBlock.innerText = 'Moves : ';
statusBar.append(movesBlock);

export const movesAmount = document.createElement('span');
movesAmount.className = 'moves-amount';
movesAmount.innerText = '0';
movesBlock.append(movesAmount);

export const pause = document.createElement('input');
pause.className = 'status-item-button status-item';
pause.type = 'button';
pause.value = 'Pause';
statusBar.append(pause);
//status bar end

// sound toggle start
export const soundToggle = document.createElement('input');
soundToggle.className = 'sound-toggleOff status-item-button';
soundToggle.type = 'button';
statusBar.append(soundToggle);
// sound toggle end

//game feild start
const gameFieldContainer = document.createElement('div');
gameFieldContainer.className = 'game-field-container';
container.append(gameFieldContainer);

export const canvasElement = document.createElement('canvas');
canvasElement.className = 'game-field';
canvasElement.width = '400';
canvasElement.height = '400';
gameFieldContainer.append(canvasElement);
//game feild end

//game menu start
export const gameMenu = document.createElement('div');
gameMenu.className = 'game-menu menu-display';
gameFieldContainer.append(gameMenu);

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

// main menu
export const mainMenuContainer = document.createElement('div');
mainMenuContainer.className = 'main-menu-container menu-display';
gameMenu.append(mainMenuContainer);

export const start = document.createElement('input');
start.className = 'start menu-button';
start.type = 'button';
start.value = 'New game';
mainMenuContainer.append(start);

export const loadGame = document.createElement('input');
loadGame.className = 'load-game menu-button';
loadGame.type = 'button';
loadGame.value = 'Load game';
mainMenuContainer.append(loadGame);

export const scores = document.createElement('input');
scores.className = 'scores menu-button';
scores.type = 'button';
scores.value = 'Scores';
mainMenuContainer.append(scores);

export const settings = document.createElement('input');
settings.className = 'settings menu-button';
settings.type = 'button';
settings.value = 'Settings';
mainMenuContainer.append(settings);

// setting of BoardSize
export const settingsContainer = document.createElement('div');
settingsContainer.className = 'settings-boardSize menu-display';
gameMenu.append(settingsContainer);

export const boardSize3 = document.createElement('input');
boardSize3.className = 'boardSize-settings menu-button';
boardSize3.type = 'button';
boardSize3.value = '3x3';
settingsContainer.append(boardSize3);

export const boardSize4 = document.createElement('input');
boardSize4.className = 'boardSize-settings menu-button';
boardSize4.type = 'button';
boardSize4.value = '4x4';
settingsContainer.append(boardSize4);

export const boardSize5 = document.createElement('input');
boardSize5.className = 'boardSize-settings menu-button';
boardSize5.type = 'button';
boardSize5.value = '5x5';
settingsContainer.append(boardSize5);

export const boardSize6 = document.createElement('input');
boardSize6.className = 'boardSize-settings menu-button';
boardSize6.type = 'button';
boardSize6.value = '6x6';
settingsContainer.append(boardSize6);

export const boardSize7 = document.createElement('input');
boardSize7.className = 'boardSize-settings menu-button';
boardSize7.type = 'button';
boardSize7.value = '7x7';
settingsContainer.append(boardSize7);

export const boardSize8 = document.createElement('input');
boardSize8.className = 'boardSize-settings menu-button';
boardSize8.type = 'button';
boardSize8.value = '8x8';
settingsContainer.append(boardSize8);

export const pictureSettings = document.createElement('input');
pictureSettings.className = 'boardSize-settings menu-button';
pictureSettings.type = 'button';
pictureSettings.value = 'Picture';
settingsContainer.append(pictureSettings);
// setting of BoardSize end

export const scoreTable = document.createElement('div');
scoreTable.className = 'score-table';
gameMenu.append(scoreTable);

export const back = document.createElement('input');
back.className = 'back menu-button';
back.type = 'button';
back.value = 'Back';
gameMenu.append(back);
//game menu end
