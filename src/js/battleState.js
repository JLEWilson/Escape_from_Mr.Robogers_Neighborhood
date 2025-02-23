import $ from "jquery";
import { PlayerEntity, EnemyEntity } from './entity';
import { changeGameState } from '../index.js';

//make an instance of each object
export let playerEntity;
let enemy;

export function assignPlayer(name){
  playerEntity = new PlayerEntity(name, 30, 30, 5, 3);
  updatePlayerHealthUI();
  updatePlayerManaUI();
  $('.story-area').prepend("<p>Greetings " + playerEntity.name + "!!!</p>");
}
export function assignEnemy(name){
  enemy = new EnemyEntity(name);
  playerEntity.setBattleText(enemy);
  enemy.setBattleText(playerEntity);
  $('.story-area').prepend("<p>You have encountered a wild " + enemy.name + "!!!</p>");
}
export function updatePlayerHealthUI(){
  $('#player-health').html(playerEntity.cpu);
}
export function updatePlayerManaUI(){
  $('#player-mana').html(playerEntity.ram);
}

export function attack() {
  const attack = playerEntity.attack(enemy);
  if(attack > 0){
    enemy.takeDamage(attack);
    playerEntity.setBattleText(enemy);
    if(enemy.isAlive){ 
      $('.story-area').prepend("<p>" + playerEntity.attackText[playerEntity.randomAttackIndex] + "</p>");
      console.log(playerEntity.attackText[0]);
      console.log(playerEntity.randomAttackIndex);
      const enemyAttack = enemy.attack(playerEntity);
      if (enemyAttack > 0){
        playerEntity.takeDamage(enemyAttack);
        updatePlayerHealthUI();
        enemy.setBattleText(playerEntity);
        if(playerEntity.isAlive) {
          $('.story-area').prepend("<p>" + enemy.attackText[enemy.randomAttackIndex] + "</p>");
        } else {
          $('.story-area').prepend("<p>" + playerEntity.deathText[playerEntity.randomDeathIndex] + "</p>");
          changeGameState("gameOver");
        }
      } else {
        enemy.setBattleText(playerEntity);
        $('.story-area').prepend("<p>" + enemy.missText[enemy.randomMissIndex] + "</p>");
      }
    } else {
      $('.story-area').prepend("<p>" + enemy.deathText[enemy.randomDeathIndex] + "</p>");
      changeGameState("overWorld");
    }
  } else {
    playerEntity.setBattleText(enemy);
    $('.story-area').prepend("<p>" + playerEntity.missText[playerEntity.randomMissText] + "</p>");
  }
}

export function guard(){
  if(playerEntity.ram < 5){
    $('.story-area').prepend("<p>Not enough RAM, choose another skill!</p>");
  } else {
    playerEntity.guard();
    updatePlayerManaUI();
    $('.story-area').prepend("<p>" + playerEntity.guardText[playerEntity.randomGuardIndex] + "</p>");
    const enemyAttack = enemy.attack(playerEntity);
    if (enemyAttack > 0){
      playerEntity.takeDamage(enemyAttack);
      updatePlayerHealthUI();
      enemy.setBattleText(playerEntity);
      if(playerEntity.isAlive) {
        $('.story-area').prepend("<p>" + enemy.attackText[enemy.randomAttackIndex] + "</p>");
      } else {
        $('.story-area').prepend("<p>" + playerEntity.deathText[playerEntity.randomDeathIndex] + "</p>");
        changeGameState("gameOver");
      }
    } else {
      enemy.setBattleText(playerEntity);
      $('.story-area').prepend("<p>" + enemy.blockedText[enemy.randomBlockedIndex] + "</p>");
    }
    playerEntity.resetGuard();
  }
}

export function magic(){
  const attack = playerEntity.debugCode(enemy);
  if(!attack){
    $('.story-area').prepend("<p> Not enough Ram! Select a different action.</p>");
  } else if(attack > 0){
    enemy.takeDamage(attack);
    updatePlayerManaUI();
    playerEntity.setBattleText(enemy);
    if(enemy.isAlive){ 
      $('.story-area').prepend("<p>" + playerEntity.attackText[playerEntity.randomAttackIndex] + "</p>");
      console.log(playerEntity.attackText[0]);
      console.log(playerEntity.randomAttackIndex);
      const enemyAttack = enemy.attack(playerEntity);
      if (enemyAttack > 0){
        playerEntity.takeDamage(enemyAttack);
        updatePlayerHealthUI();
        enemy.setBattleText(playerEntity);
        if(playerEntity.isAlive) {
          $('.story-area').prepend("<p>" + enemy.attackText[enemy.randomAttackIndex] + "</p>");
        } else {
          $('.story-area').prepend("<p>" + playerEntity.deathText[playerEntity.randomDeathIndex] + "</p>");
          changeGameState("gameOver");
        }
      } else {
        enemy.setBattleText(playerEntity);
        $('.story-area').prepend("<p>" + enemy.missText[enemy.randomMissIndex] + "</p>");
      }
    } else {
      $('.story-area').prepend("<p>" + enemy.deathText[enemy.randomDeathIndex] + "</p>");
      changeGameState("overWorld");
    }
  } else {
    playerEntity.setBattleText(enemy);
    $('.story-area').prepend("<p>" + playerEntity.missText[playerEntity.randomMissText] + "</p>");
  }
}
