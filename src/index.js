import './css/styles.css';
import $ from "jquery";
import { takeInput, waltDisney, player1 } from "./js/overworldState.js";
import {assignPlayer, enterBattle} from "./js/battleState.js";
import AudioManager from "./js/AudioManager.js";

//new code S (and a change to gamestate)
import { BattleScreen } from './js/battleInterface.js';

let bs = new BattleScreen();
export let gameState = "titleScreen";

//new code A
document.addEventListener('click', function(){
  console.log('this ran');
  bs.checkForSelect();});
//end new code A


export function loopA(){
  takeInput();
  waltDisney.clear();
  player1.drawSelf();
  if(gameState ==="overWorld") {
    setTimeout(()=>{requestAnimationFrame(loopA);} , 1000/12);
  }else{
    setTimeout(()=>{requestAnimationFrame(loopB);} , 1000/12);
  }
}

//new code B
export function loopB(){
  waltDisney.clear();
  bs.drawBackground();
  bs.drawBoxes();
  bs.drawFlavor();
  bs.drawOptionBoxes();
  if(gameState !="overWorld") {
    setTimeout(()=>{requestAnimationFrame(loopB);} , 1000/12);
  }else{
    setTimeout(()=>{requestAnimationFrame(loopA);} , 1000/12);
  }
}
//end new code B

$('#combat').click(()=>{
  changeGameState("battleState");
});
$('#character-create-form').submit((event) => {
  event.preventDefault();
  $("#gameDiv").show();
  $("#titleScreen").hide();
  const name = $('#charName').val();
  assignPlayer(name);
  changeGameState('overWorld');
});

export function changeGameState(string){
  gameState = string;
  if (gameState === "overWorld") {
    loopA();
    $('.character-create').hide();
    $('.battle-action').hide();
    AudioManager.makeSomeNoise();
  } else if (gameState === "battleState") {
    $('.battle-action').show();
    enterBattle();
  }
}