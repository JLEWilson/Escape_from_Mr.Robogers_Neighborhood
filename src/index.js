import './css/styles.css';
import $ from "jquery";
import { takeInput, waltDisney, player1 } from "./overworldState.js";

let gameState = "overWorld"

export function loopA(){
  takeInput();
  waltDisney.clear();
  player1.drawSelf();
  if(gameState ==="overWorld") {
  setTimeout(()=>{requestAnimationFrame(loopA);} , 1000/12);
  }
}

if (gameState === "overWorld") {
  loopA();
}