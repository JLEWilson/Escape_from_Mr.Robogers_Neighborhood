import $ from "jquery";
import { PlayerEntity, EnemyEntity } from './js/entity';

//make an instance of each object
let player;
const enemy = new EnemyEntity("bug");


//buttons
$('#character-create-form').submit((event) => {
  event.preventDefault();
  const name = $('#charName').val();
  player = new PlayerEntity(name, 30, 30, 5, 3);
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
