import {ctx, state, tileWidth} from "./script.js";
import {canvasElement} from "./init.js";
const imageObj = new Image();

let sourceX;
let sourceY;
let sourceWidth = 100;
let sourceHeight = 100;
let destWidth = sourceWidth;
let destHeight = sourceHeight;
let destX;
let destY;

const amountPic = 900 / destWidth;

imageObj.onload = function() {
  for(let i = 0; i < amountPic; i++) {
    for(let j = 0; j < amountPic; j++) {
      sourceX = j * sourceWidth;
      sourceY = i * sourceHeight;
      destX = (amountPic - j) * sourceWidth;
      destY = (amountPic - i) * sourceWidth;
      ctx.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
    }
  }
};

imageObj.src = '32.jpg';