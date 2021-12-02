export default class Entity{
  constructor(name, health, mana, attackDamage, armor){
    this.name = name;
    this.cpu = health;
    this.maxCpu = health;
    this.ram = mana;
    this.maxRam = mana;
    this.disk = attackDamage;
    this.fanUsage = armor;
    this.baseArmor = armor;
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
    this.fanUsage *= 3;
    this.ram -= 5;
    if(this.cpu >= this.maxCpu -5){
      this.cpu = this.maxCpu;
    } else {
      this.cpu += 5;
    }
  }
  resetGuard(){
    this.fanUsage = this.baseArmor;
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
      "You insult the " + enemy.name +". " + enemy.name + " cCPU reduced to " + enemy.cpu,
    ];
    this.deathText = [
      "You suck", 
    ];
    this.guardText = [
      "You brace yourself. Defense x3!"
    ];
    this.randomMissIndex = Math.floor( Math.random() * this.missText.length);
    this.randomAttackIndex = Math.floor( Math.random() * this.attackText.length);
    this.randomDeathIndex = Math.floor( Math.random() * this.deathText.length);
    this.randomGuardIndex = Math.floor( Math.random() * this.guardText.length);
  }
  restore(){
    this.cpu = this.maxCpu;
    this.ram = this.maxRam;
  }
  debugCode(enemy){
    const damage = this.disk * 3 - enemy.fanUsage;
    if(this.ram < 5){
      return false;
    } else {
      this.ram -= 5;
      if (damage <= 0) {
        return 0;
      } else {
        return damage;
      }
    }
    
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
    case "unknownError":
      super("Unknown Error", 10, 0, 8, 2);
      break;
    case "bug":
      super("Bug", 5, 0, 5, 1);
      break;
    case "typo":
      super("Typo", 7, 3, 7, 2);
      break;
    case "imposterSyndrome":
      super("Imposter Syndrome", 15, 3, 10, 3);
      break;        
    default:
      super();
    }
  }
  setBattleText(player){
    this.missText = [
      "The " + this.name + "'s aim is bad",
      "The " + this.name + " thought you could use a break!",
      "The " + this.name + " must have been looking somewhere else and missed you!",
      "The " + this.name + " didn't break your project! You take no damage"
    ];
    this.attackText = [
      "The " + this.name + " annoyed " + player.name +". " + player.name + "'s health reduced to " + player.cpu,
      "The " + this.name + " is draining your will to live. " + player.name + "'s health reduced to " + player.cpu,
      "The " + this.name + " makes you think you won't be able to complete coding bootcamp. " + player.name + "'s health reduced to " + player.cpu,
    ];
    this.deathText = [
      "You fixed the bug!",
      "This bug was an easy fix",
      "Problem solved!",
      "You got this.  No issue will stop you!"
    ];
    this.blockedText = [
      "100% of damage blocked!",
      "The " + this.name + " was not strong enough to break your guard."
    ];
    this.randomMissIndex = Math.floor( Math.random() * this.missText.length);
    this.randomAttackIndex = Math.floor( Math.random() * this.attackText.length);
    this.randomDeathIndex = Math.floor( Math.random() * this.deathText.length);
    this.randomBlockedIndex = Math.floor( Math.random() * this.blockedText.length);
  }
  wait(){

  }
}