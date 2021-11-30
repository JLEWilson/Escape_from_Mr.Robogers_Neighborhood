export default class Entity{
  constructor(name, health, mana, attackDamage, armor){
    this.name = name;
    this.cpu = health;
    this.ram = mana;
    this.disk = attackDamage;
    this.fanUsage = armor;
    this.isAlive = true;
  }
  attack(target){
    const damage = this.disk - target.fanUsage;
    if (damage <= 0) {
      return 0;
    } else {
      return damage;
    }
  }
  takeDamage(damage){
    this.cpu -= damage;
    if(this.cpu <= 0 ){
      this.die();
    }
  }
  guard(){
    //Halves damage taken for 1 turn
  }
  die(){
    this.isAlive = false;
  }
}
//Default player stats are (Name, 30, 30, 5, 3)
export class PlayerEntity extends Entity{
  constructor(name, health, mana, attackDamage, armor){
    super(name, health, mana, attackDamage, armor);
    this.devices = {};
    this.equippedDevice = {};
  }
  setBattleText(enemy){
    this.missText = [
    "Your aim is bad",
    enemy.name + " is too cute to hurt",
    "The " + enemy.name + " is hit for 0 damage!"
  ];
  this.attackText = [
    "You insult the " + enemy.name +". " + enemy.name + " health reduced to " + enemy.cpu,
  ];
  this.deathText = [
    "You defeated the " + enemy.name + "!!!!", 
  ];
  this.randomMissIndex = Math.floor( Math.random() * this.missText.length);
  this.randomAttackIndex = Math.floor( Math.random() * this.attackText.length);
  this.randomDeathIndex = Math.floor( Math.random() * this.deathText.length);
  }
  restore(stat){
    console.log(stat);
  }
  debugCode(){
    //attack with mana
  }
  useItem(item){
    console.log(item);
  }
  flee(){

  }
}
export class EnemyEntity extends Entity{
  constructor(name){
    switch (name){
      case "unknown error":
        super(name, 15, 0, 9, 4);
        this.skills = [
          {
            skillDamage: 10,
            skillText: "You bang your head on the closest hard object in frustration",
          }
        ];
        break;
      case "bug":
        super(name, 5, 0, 3, 1);
        this.skills = [
          {
            skillDamage: 5,
            skillText: "Stops you from running correctly"
          }
        ];
        break;
      case "typo":
        super(name, 7, 3, 5, 2);
        this.skills = [
          {
            skillDamage: 8,
            skillText: "The typo moves too fast for you to see it"            
          }
        ];
        break;        
      default:
        super();
    }
  }
  setBattleText(player){
    this.missText = [
      "The " + this.name + "'s aim is bad",
      "The " + this.name + " thought you could use a break!"
    ];
    this.attackText = [
      "The " + this.name + " annoyed " + player.name +". " + player.name + " health reduced to " + player.cpu,
    ];
    this.deathText = [
      "You fixed the bug!",
      "This bug was an easy fix",
    ];
    this.randomMissIndex = Math.floor( Math.random() * this.missText.length);
    this.randomAttackIndex = Math.floor( Math.random() * this.attackText.length);
    this.randomDeathIndex = Math.floor( Math.random() * this.deathText.length);
    }
    wait(){

  }
}