import $ from "jquery";
import { createRoom } from "./overworldState.js";
import { changeGameState } from "../index.js";
import { assignEnemy } from "./battleState.js";
import { updatePlayerHealthUI, updatePlayerManaUI, playerEntity} from "./battleState.js";
import Messages from "./messages.js";
import AudioManager from "./AudioManager.js";
import charF from "../assets/img/character-front-zoom.png";
import charB from "../assets/img/character-back-zoom.png";
import charL from "../assets/img/character-left-zoom.png";
import charR from "../assets/img/character-right-zoom.png";

let cf = new Image();
let cb = new Image();
let cl = new Image();
let cr = new Image();
cf.src = charF;
cb.src = charB;
cl.src = charL;
cr.src = charR;

let fReady = false;
let bReady = false;
let lReady = false;
let rReady = false;

cf.onload = function(){
  fReady = true;
};
cb.onload = function(){
  bReady = true;
};
cl.onload = function(){
  lReady = true;
};
cr.onload = function(){
  rReady = true;
};

const messages = new Messages;

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
    this.x = 5;
    this.y = 7;
    this.z = 0;
    this.animator = ani;
    this.width = .75*this.animator.q;
    this.height = 1*this.animator.q;
    this.texture = cf;
    this.levelSet = levelSet;
  }
  drawSelf(){
    this.animator.brush.drawImage(this.texture,(this.x*this.animator.q)+ this.animator.q*(0.125),this.y*this.animator.q,this.width, this.height);
  }
  move(direction){
    if(direction === 'N'){
      if (bReady){
        this.texture = cb;
      }
      if(this.levelSet.Rooms[this.z][this.x][this.y-1].transparent){
        this.y = this.y-1;
      }
    }
    if(direction === 'S'){
      if (fReady){
        this.texture = cf;
      }
      if(this.levelSet.Rooms[this.z][this.x][this.y+1].transparent){
        this.y = this.y+1;
      }
    }
    if(direction === 'E'){
      if (rReady){
        this.texture = cr;
      }
      if(this.levelSet.Rooms[this.z][this.x+1][this.y].transparent){
        this.x = this.x+1;
      }
    }
    if(direction === 'W'){
      if (lReady){
        this.texture = cl;
      }
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
        [new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'black'), new Door(true,'door',2,8,1), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new BattleTile(true,'white','bug'), new MessageTile(true,'white',messages.rmMes[0]), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')]
      ], 
      [
        [new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Tile(true, 'white'), new Key(true,'key',7,0,1,messages.kMes[0]), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new MessageTile(true,'white','You enter this room and realize this place is very strange, almost as if it were a land of make believe or ... something'), new Tile(true, 'white'), new Door(true,'door',5,2,0)],
        [new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black')],
        [new LockedDoor(false,'lockedDoor',8,8,2), new MessageTile(true,'white',messages.lkDrMes[0]), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black')]
      ],
      [
        [new Tile(false, 'black'), new Door(true,'door',9,5,3), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'black'), new MessageTile(true,'white',messages.rmMes[2]), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'black'), new Conveyer(true,'white','E'), new Conveyer(true,'white','N'), new Conveyer(true,'white','N'), new Conveyer(true,'white','N'), new Conveyer(true,'white','N'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Conveyer(true,'white','E'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Conveyer(true,'white','W'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'black'), new Conveyer(true,'white','E'), new Tile(true, 'white'), new Conveyer(true,'white','E'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'black'), new Conveyer(true,'white','E'), new Tile(true, 'white'), new Conveyer(true,'white','E'), new Conveyer(true,'white','E'), new Conveyer(true,'white','E'), new Conveyer(true,'white','E'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'black'), new Conveyer(true,'white','E'), new Tile(true, 'white'), new Conveyer(true,'white','E'), new Conveyer(true,'white','E'), new Conveyer(true,'white','E'), new Conveyer(true,'white','E'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new MessageTile(true,'white',messages.rmMes[1]), new Tile(true, 'white'), new Door(true,'door',3,1,1)],
        [new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black')]
      ],
      [
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new LockedDoor(false,'lockedDoor',8,5,5), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Key(true,'key',0,5,3,messages.kMes[1]), new Tile(true, 'white'), new Tile(true, 'white'), new MessageTile(true, 'white',messages.lkDrMes[1]), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new MessageTile(true,'white',messages.rmMes[5]), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new TrapDoor(true,'white',3,5,4), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new MessageTile(true,'white',messages.rmMes[4]), new Tile(false, 'black'), new Door(true,'door',7,6,4), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Door(true,'door',0,1,2), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void')]
      ],
      [
        [new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new GateSwitch(true,'switch',5,2,4), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new MessageTile(true,'white',messages.rmMes[3]), new Tile(true,'white',), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'gate'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Door(true,'door',6,7,3), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')]
      ],
      [
        [new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(true, 'white'), new BattleTile(true,'white','typo'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black')],
        [new Door(true,'door',4,9,6), new Tile(true, 'white'), new BattleTile(true,'white','unknownError'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new BattleTile(true,'white','bug'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new BattleTile(true,'white','typo'), new Tile(true, 'white'), new Tile(true, 'white'), new BattleTile(true,'white','bug'), new Tile(false, 'black'), new Conveyer(true,'white','W'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Conveyer(true,'white','W'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void'), new Conveyer(true,'white','W'), new Conveyer(true,'white','N')],
        [new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'black'), new MessageTile(true,'white',messages.rmMes[6]), new Conveyer(true,'white','S'), new Conveyer(true,'white','E'), new Tile(false, 'void'), new Conveyer(true,'white','W')],
        [new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new Conveyer(true,'white','S'), new Conveyer(true,'white','S'), new Conveyer(true,'white','W')],
        [new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'black'), new Door(true,'door',5,5,0), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')]
      ],
      [
        [new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(true, 'white'), new Conveyer(true,'white','S'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Key(true,'key',9,2,6,messages.kMes[2]), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new BattleTile(true,'white','unknownError'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new ConveyerButton(true,'white',4,5,6), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Conveyer(true,'white','W'), new Tile(false, 'black'), new MessageTile(true,'white',messages.rmMes[8]), new Tile(true, 'white'), new Door(true,'door',3,1,5)],
        [new Tile(false, 'black'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new ConveyerButton(true,'white',1,6,6), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Tile(true, 'white'), new MessageTile(true,'white',messages.lkDrMes[2]), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Tile(false, 'black'), new LockedDoor(false,'lockedDoor',1,2,7), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black')],      
      ],
      [
        [new Tile(false, 'void'), new Tile(false, 'black'), new Door(true,'door',5,5,0), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(true, 'white'), new MessageTile(true, 'white',messages.rmMes[9]), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'black')],
        [new Door(true,'door',5,8,8), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new HealTile(true, 'heal'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void'), new Tile(false, 'void')]
      ],
      [
        [new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'black'), new Tile(false, 'void')],
        [new Tile(false, 'void'), new Tile(false, 'black'), new BossTile(true, 'unknownError', 'unknownError'), new BossTile(true, 'typo', 'typo'), new BossTile(true, 'unknownError', 'unknownError'), new BossTile(true, 'bug', 'bug'), new BossTile(true, 'typo', 'typo'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'black'), new BossTile(true, 'unknownError', 'unknownError'), new BossTile(true, 'typo', 'typo'), new BossTile(true, 'unknownError', 'unknownError'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'black'), new Tile(false, 'black')], 
        [new Tile(true, 'heal'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'black'), new BossTile(true, 'bug', 'bug'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false,'black'), new GateSwitch(true, 'switch', 5,7,8), new Tile(false, 'black')],
        [new Tile(true, 'heal'), new Tile(true, 'heal'), new Tile(false, 'black'), new Tile(false, 'void'), new LockedDoor(false,'lockedDoor',5,5,0), new Tile(false, 'void'), new Tile(false,'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black')],
        [new WinTile(true,'door'), new Tile(true, 'heal'), new Tile(true, 'heal'), new BossTile(true, 'imposterSyndrome', 'imposterSyndrome'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'gate'), new Tile(false, 'gate'), new Tile(true, 'white'), new Door(true,'door',5,1,7)],
        [new Tile(true, 'heal'), new Tile(true, 'heal'), new Tile(false, 'black'), new Tile(false, 'void'), new LockedDoor(false,'lockedDoor',5,5,0), new Tile(false, 'void'), new Tile(false,'black'), new Tile(true, 'white'), new Tile(true, 'white'), new Tile(false, 'black')],
        [new Tile(true, 'heal'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'black'), new BossTile(true, 'unknownError', 'unknownError'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false,'black'), new GateSwitch(true, 'switch', 5,6,8), new Tile(false, 'black')],
        [new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'black'), new BossTile(true, 'typo', 'typo'), new BossTile(true, 'bug', 'bug'), new BossTile(true, 'typo', 'typo'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'black'),  new Tile(false, 'black')], 
        [new Tile(false, 'void'), new Tile(false, 'black'), new BossTile(true, 'bug', 'bug'), new BossTile(true, 'unknownError', 'unknownError'), new BossTile(true, 'typo', 'typo'), new BossTile(true, 'bug', 'bug'), new BossTile(true, 'unknownError', 'unknownError'), new Tile(false, 'black'), new Tile(false, 'void'), new Tile(false, 'black')]
      ]
    ];
  }
}



export class Tile{
  constructor(transparency, texture){
    this.transparent = transparency;
    this.texture = texture;
  }
  action(){
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
    this.texture = "hole";
    createRoom();
  }
}

export class Conveyer extends Tile{
  constructor(trans,text,direction){
    super(trans, text); 
    this.direction = direction;
  }
  action(player){
    setTimeout(()=>{
      player.move(this.direction);    
      this.texture = this.direction;
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
    this.texture = "hole";
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
  constructor(trans, text, x, y, z, message){
    super(trans, text);
    this.doorToUnlockX = x;
    this.doorToUnlockY = y;
    this.doorToUnlockZ = z;
    this.message = message;
    this.active = true;
  }
  action(player){    
    player.levelSet.Rooms[this.doorToUnlockZ][this.doorToUnlockX][this.doorToUnlockY].transparent = true;
    player.levelSet.Rooms[this.doorToUnlockZ][this.doorToUnlockX][this.doorToUnlockY].texture = "door";
    this.texture = "white";
    createRoom();
    if (this.active) {  
      AudioManager.pauseAudio('over-world-audio');
      AudioManager.startAudio("item-audio");
      setTimeout(()=>{
        AudioManager.pauseAudio("item-audio");
        AudioManager.continueAudio('over-world-audio');
      }, 1000);
      $('.story-area').prepend("<p>"+ this.message + "</p>");
      this.active = false;
    }        
  }
}

export class ConveyerButton extends Tile{
  constructor(trans, text, x, y, z){
    super(trans, text);
    this.convToDisableX = x;
    this.convToDisableY = y;
    this.convToDisableZ = z;
    this.active = true;
  }
  action(player){
    player.levelSet.Rooms[this.convToDisableZ][this.convToDisableX][this.convToDisableY] = new Tile(true, 'white');
    createRoom();
    if (this.active) {  
      AudioManager.pauseAudio('over-world-audio');
      AudioManager.startAudio("item-audio");
      setTimeout(()=>{
        AudioManager.pauseAudio("item-audio");
        AudioManager.continueAudio('over-world-audio');
      }, 1000);
      this.active = false;
    }
  }
}

export class BattleTile extends Tile{  
  constructor(trans, text, enemyName){
    super(trans, text);
    this.texture = "white";
    this.enemyName = enemyName;    
  }
  action(){    
    assignEnemy(this.enemyName);
    changeGameState("battleState");
    this.texture = this.enemyName;
    createRoom();
  }
}

export class BossTile extends Tile{  
  constructor(trans, text, enemyName){
    super(trans, text);
    this.enemyName = enemyName;    
  }
  action(){    
    assignEnemy(this.enemyName);
    changeGameState("bossFight");    
    createRoom();
  }
}

export class MessageTile extends Tile{
  constructor(trans, text, message){
    super(trans, text);
    this.texture = "white";
    this.message = message;
    this.active = true;
  }
  action(){  
    if (this.active) {  
      $('.story-area').prepend("<p>"+ this.message + "</p>");
      this.active = false;
    }
  }
}

export class HealTile extends Tile{
  constructor(trans, text){
    super(trans, text);
    this.message = "~All CPU and RAM restored!!!~";
    this.active = true;
  }
  action(){
    playerEntity.restore();
    $('.story-area').prepend("<p>"+ this.message + "</p>");
    updatePlayerHealthUI();
    updatePlayerManaUI();
    if (this.active) {  
      AudioManager.pauseAudio('over-world-audio');
      AudioManager.startAudio("item-audio");
      setTimeout(()=>{
        AudioManager.pauseAudio("item-audio");
        AudioManager.continueAudio('over-world-audio');
      }, 1000);
      this.active = false;
    }
  }
}

export class GateSwitch extends Tile {
  constructor(trans, text, x, y, z){
    super(trans, text);
    this.gateToggleX = x;
    this.gateToggleY = y;
    this.gateToggleZ = z;
    this.texture = 'switch';
  }
  action(player){
    if (player.levelSet.Rooms[this.gateToggleZ][this.gateToggleX][this.gateToggleY].transparent) {
      player.levelSet.Rooms[this.gateToggleZ][this.gateToggleX][this.gateToggleY].transparent = false;
      player.levelSet.Rooms[this.gateToggleZ][this.gateToggleX][this.gateToggleY].texture = 'gate';
      createRoom();
    } else {
      player.levelSet.Rooms[this.gateToggleZ][this.gateToggleX][this.gateToggleY].transparent = true;
      player.levelSet.Rooms[this.gateToggleZ][this.gateToggleX][this.gateToggleY].texture = 'white';
      createRoom();
    }
  }
}

export class WinTile extends Tile {
  constructor(trans, text){
    super(trans, text);    
  }  
  action(){
    changeGameState("charlieSheen");
  }
}  