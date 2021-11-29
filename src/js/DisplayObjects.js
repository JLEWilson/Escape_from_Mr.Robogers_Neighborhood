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
  }
}

export class LevelMap{
  constructor(){
    this.Rooms = [
      [
        [new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(true,'white'),new Tile(false,'black')],
        [new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black'),new Tile(false,'black')]
      ]
    ];
  }
}

export class Tile{
  constructor(transparency, texture){
    this.transparent = transparency;
    this.texture = texture;
  }
}