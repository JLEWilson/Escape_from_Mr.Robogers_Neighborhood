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