//canvas
//context
//objects to draw
//loop

class Animator{
  constructor(){
    this.screen = window.getElementById('primaryDisplayModule');
    this.brush = this.screen.getContext('2d');
  }
}

class Player{
  constructor(ani,levelSet){
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.width = 1;
    this.height = 1;
    this.texture = 'red';
    this.animator = ani;
    this.levelSet = levelSet;
  }
  drawSelf(){
    this.animator.brush.fillStyle(this.texture);
    this.animator.brush.fillRect(this.x,this.y,this.width, this.height);
  }
  move(direction){
    if(direction === 'N'){
      if(this.levelSet[this.z][this.x][this.y+1].tranparent){
        this.y = this.y+1;
      }
    }
    if(direction === 'S'){
      if(this.levelSet[this.z][this.x][this.y-1].tranparent){
        this.y = this.y-1;
      }
    }
    if(direction === 'E'){
      if(this.levelSet[this.z][this.x+1][this.y].tranparent){
        this.x = this.x+1;
      }
    }
    if(direction === 'W'){
      if(this.levelSet[this.z][this.x-1][this.y].tranparent){
        this.x = this.x-1;
      }
    }
  }
}

class LevelMap{
  constructor(){
    this.Rooms = [
      [new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black')],
      [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
      [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
      [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
      [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
      [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
      [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
      [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
      [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
      [new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black')]];
  }
}

class Tile{
  constructor(transparency, texture){
    this.transparent = transparency;
    this.texture = texture;
  }
}