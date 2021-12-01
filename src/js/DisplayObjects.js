import { createRoom } from "./overworldState.js";
import { changeGameState } from "../index.js";
import { playerEntity, assignEnemy, updatePlayerHealthUI } from "./battleState.js";

export class Animator{
  constructor(){
    this.screen = document.getElementById('primaryDisplayModule');
    this.screen.height = window.innerHeight*0.7;
    this.screen.width = this.screen.height;

    this.brush = this.screen.getContext('2d');
    this.q = this.screen.height/10;
  }
  clear(){
    this.brush.clearRect(0,0,this.screen.width,this.screen.height);
  }
}

export class Player{
  constructor(ani,levelSet){
    this.x = 3;
    this.y = 3;
    this.z = 0;
    this.animator = ani;
    this.width = 1*this.animator.q;
    this.height = 1*this.animator.q;
    this.texture = 'red';
    this.levelSet = levelSet;
  }
  drawSelf(){
    this.animator.brush.fillStyle = this.texture;
    this.animator.brush.fillRect(this.x*this.animator.q,this.y*this.animator.q,this.width, this.height);
  }
  move(direction){
    if(direction === 'N'){
      if(this.levelSet.Rooms[this.z][this.x][this.y-1].transparent){
        this.y = this.y-1;
      }
    }
    if(direction === 'S'){
      if(this.levelSet.Rooms[this.z][this.x][this.y+1].transparent){
        this.y = this.y+1;
      }
    }
    if(direction === 'E'){
      if(this.levelSet.Rooms[this.z][this.x+1][this.y].transparent){
        this.x = this.x+1;
      }
    }
    if(direction === 'W'){
      if(this.levelSet.Rooms[this.z][this.x-1][this.y].transparent){
        this.x = this.x-1;
      }
    }
    this.levelSet.Rooms[this.z][this.x][this.y].action(this);
  }
}

export class LevelMap{
  constructor(){
    this.Rooms = [
      [
        [new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Door(true,'door',8,4,1),new Tile(false, 'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Conveyer(true,'white','N'),new Conveyer(true,'white','E'),new Conveyer(true,'white','S'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new BattleTile(true,'white','bug'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new ConveyerButton(true,'white',0,1,3),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black')]
      ],
      [
        [new Tile(false,'void'),new Tile(false,'void'),new Tile(false,'black'),new Tile(false, 'black'),new Door(true,'door',8,3,2),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'void'),new Tile(false,'void')],
        [new Tile(false,'void'),new Tile(false,'void'),new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black'),new Tile(false,'void'),new Tile(false,'void')],
        [new Tile(false,'void'),new Tile(false,'void'),new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black'),new Tile(false,'void'),new Tile(false,'void')],
        [new Tile(false,'void'),new Tile(false,'void'),new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black'),new Tile(false,'void'),new Tile(false,'void')],
        [new Tile(false,'void'),new Tile(false,'void'),new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black'),new Tile(false,'void'),new Tile(false,'void')],
        [new Tile(false,'void'),new Tile(false,'void'),new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black'),new Tile(false,'void'),new Tile(false,'void')],
        [new Tile(false,'void'),new Tile(false,'void'),new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black'),new Tile(false,'void'),new Tile(false,'void')],
        [new Tile(false,'void'),new Tile(false,'void'),new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black'),new Tile(false,'void'),new Tile(false,'void')],
        [new Tile(false,'void'),new Tile(false,'void'),new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black'),new Tile(false,'void'),new Tile(false,'void')],
        [new Tile(false,'void'),new Tile(false,'void'),new Tile(false,'black'),new Tile(false,'black'),new Door(true,'door',1,3,0),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'void'),new Tile(false,'void')]
      ],
      [
        [new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false, 'black'),new Tile(false, 'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(false,'table'),new Tile(false,'table'),new Tile(false,'table'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'table'),new Tile(false,'table'),new Tile(false,'table'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Door(true,'door',5,5,3),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black')]
      ],
      [
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Door(true,'door',3,3,0), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Door(true,'door',3,5,0), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void')]
    ]
    ];
  }
}



export class Tile{
  constructor(transparency, texture){
    this.transparent = transparency;
    this.texture = texture;
  }
  action(player){
    return false;
  }
}

export class Door extends Tile{
  constructor(trans,text,x,y,z){
    super(trans, text);
    this.dX = x;
    this.dY = y;
    this.dZ = z;
  }
  action(player){
    player.x = this.dX;
    player.y = this.dY;
    player.z = this.dZ;
    createRoom();
  }
}

export class LockedDoor extends Tile{
  constructor(trans,text,x,y,z){
    super(trans, text);
    this.dX = x;
    this.dY = y;
    this.dZ = z;
  }
  action(player){
    player.x = this.dX;
    player.y = this.dY;
    player.z = this.dZ;
    createRoom();
  }
}

export class TrapDoor extends Tile{
  constructor(trans,text,x,y,z){
    super(trans, text);
    this.dX = x;
    this.dY = y;
    this.dZ = z;
  }
  action(player){
    player.x = this.dX;
    player.y = this.dY;
    player.z = this.dZ;
    this.texture = "void"
    createRoom();
  }
}

export class Conveyer extends Tile{
  constructor(trans,text,direction){
    super(trans, text); 
    this.direction = direction   
  }
  action(player){
    setTimeout(()=>{
    player.move(this.direction);    
    this.texture = "conveyer"
    createRoom() ;} , 1000/12);      
  }
}

export class Hole extends Tile{
  constructor(trans,text){
    super(trans, text);
    
  }
  action(player){
    setTimeout(()=>{if(player.levelSet.Rooms[player.z][player.x][player.y+1].transparent){
    player.move("S");
    }
    this.texture = "hole"
    createRoom() ;} , 1000/12);
      
  }
}

//ice
//spikes
//restore
//mana pool
//items
//wall-in tile
//tunnel
//button reveal tile

export class Key extends Tile{
  constructor(trans, text, x, y, z){
    super(trans, text);
    this.doorToUnlockX = x;
    this.doorToUnlockY = y;
    this.doorToUnlockZ = z;
  }
  action(player){    
    player.levelSet.Rooms[this.doorToUnlockX][this.doorToUnlockY][this.doorToUnlockZ].transparent = true;
    player.levelSet.Rooms[this.doorToUnlockX][this.doorToUnlockY][this.doorToUnlockZ].texture = "door";
    this.texture = "white";    
    createRoom();    
  }
}

export class ConveyerButton extends Tile{
  constructor(trans, text, x, y, z){
    super(trans, text);
    this.convToDisableX = x;
    this.convToDisableY = y;
    this.convToDisableZ = z;
  }
  action(player){
    player.levelSet.Rooms[this.convToDisableX][this.convToDisableY][this.convToDisableZ].direction = ""
  }
}

export class BattleTile extends Tile{  
  constructor(trans, text, enemyName){
    super(trans, text);
    this.texture = "white"
    this.enemyName = enemyName    
  }
  action(player){
    assignEnemy(this.enemyName);
    changeGameState("battleState");
  }
}

