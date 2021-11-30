import './css/styles.css';
import $ from "jquery";
import { Player, Enemy } from './js/entity';

//make an instance of each object

let waltDisney = new Animator();
let gameMaps = new LevelMap();
let player1 = new Player(waltDisney, gameMaps);
let player;
const enemy = new Enemy("bug");

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
  player = new Player(name, 30, 30, 5, 3);
  player.setBattleText(enemy);
  enemy.setBattleText(player);
  $('.story-area').append("<p>Greetings " + player.name + "!!!</p>");
  $('.character-create').hide();
  $('.battle-action').show();
});

$('#attack').click(() => {
  const attack = player.attack(enemy);
  if(attack > 0){
    enemy.takeDamage(attack);
    player.setBattleText(enemy);
    if(enemy.isAlive){ 
      $('.story-area').append("<p>" + player.attackText[player.randomAttackIndex] + "</p>");
      console.log(player.attackText[0]);
      console.log(player.randomAttackIndex);
      const enemyAttack = enemy.attack(player);
      if (enemyAttack > 0){
        player.takeDamage(enemyAttack);
        enemy.setBattleText(player);
        if(player.isAlive) {
          $('.story-area').append("<p>" + enemy.attackText[enemy.randomAttackIndex] + "</p>");
        } else {
          $('.story-area').append("<p>" + player.deathText[player.randomDeathIndex] + "</p>");
        }
      } else {
        enemy.setBattleText(player);
        $('.story-area').append("<p>" + enemy.missText[enemy.randomMissIndex] + "</p>");
      }
    } else {
      $('.story-area').append("<p>Your attack put " + enemy.name + " below 0 cpu!</p>");
      $('.story-area').append("<p>" + enemy.deathText[enemy.randomDeathIndex] + "</p>");
    }
  } else {
    player.setBattleText(enemy);
    $('.story-area').append("<p>" + player.missText[player.randomMissText] + "</p>");
  }
})


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