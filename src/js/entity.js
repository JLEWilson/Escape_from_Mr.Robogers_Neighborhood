import { thisTypeAnnotation } from "@babel/types";

export default class Entity{
  constructor(name, health, mana, attackDamage, armor){
    name = this.name;
    cpu = this.health;
    ram = this.mana;
    disk = this.attackDamage;
    fanUsage = this.armor;
    isAlive = true;
  }
  attack(target){
    const damage = this.attackDamage - target.fanUsage;
    if (damage <= 0) {
    } else {
      target.cpu -= damage;
      if(target.cpu <=0 ){
        target.die();
      }
    }
  }
  guard(){
    //Halves damage taken for 1 turn
  }
  takeDamage(damage){
    //random number in a range
  }
  die(){
    this.isAlive = false;
  }
}
//Default player stats are (Name, 30, 30, 5, 3)
export class Player extends Entity{
  constructor(name, health, mana, attackDamage, armor){
    super(name, health, mana, attackDamage, armor);
    devices = {};
    equippedDevice = {};
  }
  setBattleText(enemy){
    this.missText = [
    "Your aim is bad",
    target.name + " is too cute to hurt",
    "The " + target.name + " is hit for 0 damage!"
  ];
  this.attackText = [
    "You insult the " + target.name +". " + target.name + " health reduced to " + target.cpu,
  ];
  this.deathText = [
    //what it says when you die
  ];
  }
  restore(stat){

  }
  debugCode(){
    //attack with mana
  }
  useItem(item){

  }
  flee(){

  }
}
export class Enemy extends Entity{
  constructor(name){
    switch (name){
      case "unknown error":
        super(name, 15, 0, 9, 4);
        skills = [
          {
            skillDamage: 10,
            skillText: "You bang your head on the closest hard object in frustration",
          }
        ]
        break;
      case "bug":
        super(name, 5, 0, 3, 0 );
        skills = [
          {
            skillDamage: 5,
            skillText: "Stops you from running correctly"
          }
        ]
        break;
      case "typo":
        super(name, 7, 3, 5, 2);
        skills = [
          {
            skillDamage: 8,
            skillText: "The typo moves too fast for you to see it"            
          }
        ]
        break;        
      default:
        super();
    }
  }
  setBattleText(player){
    this.missText = [
     "Your aim is bad",
     player.name + " is too cute to hurt",
     "The " + player.name + " is hit for 0 damage!"
   ];
   this.attackText = [
     "You insult the " + player.name +". " + player.name + " health reduced to " + player.cpu,
   ];
   this.deathText = [
     "You fixed the bug!",
     "This bug was an easy fix",
   ];
   }
   wait(){

  }
}
  
let player = new Player();
let enemy = new Enemy("bug");
player.setBattleText(enemy);
enemy.setBattleText(player);