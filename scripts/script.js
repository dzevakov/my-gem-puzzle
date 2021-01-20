import {Board} from "./board.js";

const body = document.querySelector("body");
const canvasElement = document.createElement("canvas");

canvasElement.className = "gameField";
canvasElement.width = "400";
canvasElement.height = "400";

body.append(canvasElement);

const gameBoard = new Board();
const boardGrid = gameBoard.init();

const ctx = canvasElement.getContext('2d');
ctx.font = '48px sanserif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

gameBoard.renderBoard(boardGrid, ctx);

