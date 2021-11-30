import './css/styles.css';
import $ from "jquery";
import { PlayerEntity, EnemyEntity } from './js/entity';
import { LevelMap, Player, Animator} from './js/DisplayObjects.js';

//make an instance of each object

let waltDisney = new Animator();
let gameMaps = new LevelMap();
let player1 = new Player(waltDisney, gameMaps);
let playerEntity;
const enemy = new EnemyEntity("unknown error");

export function createRoom() {
  $("#map-background").html("");
  for(let i = 0; i< 10; i++){
    for(let j = 0; j<10;j++){
      $("#map-background").append(`<div class="${gameMaps.Rooms[player1.z][j][i].texture} tile"></div>`);
    }
  }
}

createRoom();

//buttons
$('#character-create-form').submit((event) => {
  event.preventDefault();
  const name = $('#charName').val();
  playerEntity = new PlayerEntity(name, 30, 30, 5, 3);
  playerEntity.setBattleText(enemy);
  enemy.setBattleText(playerEntity);
  $('.story-area').append("<p>Greetings " + playerEntity.name + "!!!</p>");
  $('.character-create').hide();
  $('.battle-action').show();
});

$('#attack').click(() => {
  const attack = playerEntity.attack(enemy);
  if(attack > 0){
    enemy.takeDamage(attack);
    playerEntity.setBattleText(enemy);
    if(enemy.isAlive){ 
      $('.story-area').append("<p>" + playerEntity.attackText[playerEntity.randomAttackIndex] + "</p>");
      console.log(playerEntity.attackText[0]);
      console.log(playerEntity.randomAttackIndex);
      const enemyAttack = enemy.attack(playerEntity);
      if (enemyAttack > 0){
        playerEntity.takeDamage(enemyAttack);
        enemy.setBattleText(playerEntity);
        if(playerEntity.isAlive) {
          $('.story-area').append("<p>" + enemy.attackText[enemy.randomAttackIndex] + "</p>");
        } else {
          $('.story-area').append("<p>" + playerEntity.deathText[playerEntity.randomDeathIndex] + "</p>");
        }
      } else {
        enemy.setBattleText(playerEntity);
        $('.story-area').append("<p>" + enemy.missText[enemy.randomMissIndex] + "</p>");
      }
    } else {
      $('.story-area').append("<p>Your attack put " + enemy.name + " below 0 cpu!</p>");
      $('.story-area').append("<p>" + enemy.deathText[enemy.randomDeathIndex] + "</p>");
    }
  } else {
    playerEntity.setBattleText(enemy);
    $('.story-area').append("<p>" + playerEntity.missText[playerEntity.randomMissText] + "</p>");
  }
})

$('#guard').click(()=>{
  playerEntity.guard();
  $('.story-area').append("<p>" + playerEntity.guardText[playerEntity.randomGuardIndex] + "</p>");
  const enemyAttack = enemy.attack(playerEntity);
    if (enemyAttack > 0){
      playerEntity.takeDamage(enemyAttack);
      enemy.setBattleText(playerEntity);
      if(playerEntity.isAlive) {
        $('.story-area').append("<p>" + enemy.attackText[enemy.randomAttackIndex] + "</p>");
      } else {
        $('.story-area').append("<p>" + playerEntity.deathText[playerEntity.randomDeathIndex] + "</p>");
      }
    } else {
      enemy.setBattleText(playerEntity);
      $('.story-area').append("<p>" + enemy.blockedText[enemy.randomBlockedIndex] + "</p>");
    }
  playerEntity.resetGuard();
});

$('#debug-code').click(()=>{
  const attack = playerEntity.debugCode(enemy);
  if(!attack){
    $('.story-area').append("<p> Not enough Ram! Select a different action.</p>");
  } else if(attack > 0){
    enemy.takeDamage(attack);
    playerEntity.setBattleText(enemy);
    if(enemy.isAlive){ 
      $('.story-area').append("<p>" + playerEntity.attackText[playerEntity.randomAttackIndex] + "</p>");
      console.log(playerEntity.attackText[0]);
      console.log(playerEntity.randomAttackIndex);
      const enemyAttack = enemy.attack(playerEntity);
      if (enemyAttack > 0){
        playerEntity.takeDamage(enemyAttack);
        enemy.setBattleText(playerEntity);
        if(playerEntity.isAlive) {
          $('.story-area').append("<p>" + enemy.attackText[enemy.randomAttackIndex] + "</p>");
        } else {
          $('.story-area').append("<p>" + playerEntity.deathText[playerEntity.randomDeathIndex] + "</p>");
        }
      } else {
        enemy.setBattleText(playerEntity);
        $('.story-area').append("<p>" + enemy.missText[enemy.randomMissIndex] + "</p>");
      }
    } else {
      $('.story-area').append("<p>Your attack put " + enemy.name + " below 0 cpu!</p>");
      $('.story-area').append("<p>" + enemy.deathText[enemy.randomDeathIndex] + "</p>");
    }
  } else {
    playerEntity.setBattleText(enemy);
    $('.story-area').append("<p>" + playerEntity.missText[playerEntity.randomMissText] + "</p>");
  }
});

//make a controller

var keysDown = {};

document.addEventListener("keydown",(e)=>{keysDown[e.keyCode] = true;}, false);
document.addEventListener('keyup',(e)=>{delete keysDown[e.keyCode];}, false);

function takeInput(){
  if (38 in keysDown ) {
    player1.move('N');
  }
  if(40 in keysDown){
    player1.move('S');
  }
  if(39 in keysDown){
    player1.move('E');
  }
  if(37 in keysDown){
    player1.move('W');
  }
}

//misc
let background = document.getElementById('map-background');
background.style.width = waltDisney.screen.width;
background.style.height = waltDisney.screen.height;

//make a loop

function loopA(){
  takeInput();
  waltDisney.clear();
  player1.drawSelf();
  setTimeout(()=>{requestAnimationFrame(loopA);} , 1000/12);
}
loopA();
