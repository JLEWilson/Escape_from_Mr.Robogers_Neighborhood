import './css/styles.css';
import $ from "jquery";
import { takeInput, waltDisney, player1 } from "./js/overworldState.js";
import {assignPlayer} from "./js/battleState.js";
import { beepBoop } from "./js/intro";
import AudioManager from "./js/AudioManager.js";
import { BattleScreen } from './js/battleInterface.js';

export let gameState = "intro";
let numberClicked = 0;
$("#number-form").submit(function(event) {
  event.preventDefault();
  numberClicked += 1;
  const input = parseInt($("#number-input").val());
  $("#output").text(beepBoop(input));
  switch(numberClicked) {
  case 1:
    $("#intro-response-div").show();
    $("#response").text("Hello, weary aspiring programmer. I see you've been working very hard on this project for your programming class.");
    break;
  case 2:
    $("#response").text("When you first saw the assignment you thought it would be simple. Just change the numbers with 1's into beeps, 2's to boops, and 3's to 'would you be my neighbor.' The Mr.Rogers twist makes you chuckle a bit as you get to work on the assignment.");
    break;
  case 3:
    $("#response").text("You quickly learn this assignment is more difficult than you thought. Code begins to merge together in your head and errors begin to pile up. There's beeps where there should be 'would you be my neighbor' and the boops just wont show up at all!");
    break;
  case 4:
    $("#response").text("As you stare at your code you begin to feel tired. You should have gotten to sleep earlier. You're not used to waking up this early. Your eyelids feel heavy and the screen full of code begins to fade.....");
    AudioManager.startAudio("creepy-rogers-audio", false);
    break;
  case 5:
    $("#response").text("...");
    break;
  case 6:
    $("#response").text("...well little programmer");
    break;
  case 7:
    $("#intro-normal-img").hide();
    $("#intro-angry-img").show();
    $("#response").text("...");
    break;
  case 8:
    $("#intro").hide();
    $("#before-title").show();
    $("#before-title-text").fadeIn(10000);
    break;
  }
});


//new code S (and a change to gamestate)

let bs = new BattleScreen();


//new code A
document.addEventListener('click', function(){
  bs.checkForSelect();});
//end new code A

// We might want to change this to not show up during other screens
export function loopA(){
  takeInput();
  waltDisney.clear();
  player1.drawSelf();
  if(gameState ==="overWorld") {
    setTimeout(()=>{requestAnimationFrame(loopA);} , 1000/10);
  }else{
    setTimeout(()=>{requestAnimationFrame(loopB);} , 1000/12);
  }
}

//new code B
export function loopB(){
  waltDisney.clear();
  bs.drawBackground();
  bs.drawFlavor();
  bs.drawEnemy(player1.levelSet.Rooms[player1.z][player1.x][player1.y].enemyName);
  bs.drawPlayer();
  bs.drawBoxes();
  bs.drawOptionBoxes();
  if(gameState !="overWorld") {
    setTimeout(()=>{requestAnimationFrame(loopB);} , 1000/12);
  }
}
//end new code B

$("#intro-skip").click(function() {
  $("#intro").hide();
  changeGameState("titleScreen");
});

$("#before-title-btn").click(function() {
  changeGameState("titleScreen");
});

$('#character-create-form').submit((event) => {
  event.preventDefault();
  $("#gameDiv").show();
  $("#titleScreen").hide();
  AudioManager.pauseAudio('creepy-rogers-audio');
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
    AudioManager.pauseAudio('fight-audio');
    AudioManager.pauseAudio('boss-fight-audio');
    AudioManager.startAudio('over-world-audio', true); 
  } else if (gameState === "battleState") {
    AudioManager.pauseAudio('over-world-audio');
    AudioManager.startAudio('fight-audio', true); 
  } else if (gameState === "titleScreen") {
    $("#before-title").hide();
    $("#titleScreen").show();
  } else if (gameState === "gameOver") {
    AudioManager.pauseAudio('over-world-audio');
    AudioManager.pauseAudio('fight-audio');
    AudioManager.startAudio('death-audio', true);
    $('#gameDiv').hide();
    $('#death-screen').show();    
  } else if (gameState === "charlieSheen") {
    AudioManager.pauseAudio('fight-audio');
    AudioManager.pauseAudio('over-world-audio');
    AudioManager.startAudio('win-game-audio', true);
    $("#gameDiv").hide();
    $("#charlie-sheen").show();
  } else if (gameState === "bossFight") {
    AudioManager.pauseAudio('over-world-audio');
    AudioManager.startAudio('boss-fight-audio', true);
  }
}

$('#death-btn').click(function() {
  window.location.reload();
});


AudioManager.setVolumeLevels();