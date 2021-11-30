import $ from "jquery";
import { PlayerEntity, EnemyEntity } from './js/entity';

//make an instance of each object
let playerEntity;
let enemy;

export function assignPlayer(name){
  playerEntity = new PlayerEntity(name, 30, 30, 5, 3);

  $('.story-area').append("<p>Greetings " + playerEntity.name + "!!!</p>");
}
export function assignEnemy(name){
  enemy = new EnemyEntity(name);
  playerEntity.setBattleText(enemy);
  enemy.setBattleText(playerEntity);
  $('.story-area').append("<p>You have encountered a " + enemy.name + "!!!</p>");
}

//buttons

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
