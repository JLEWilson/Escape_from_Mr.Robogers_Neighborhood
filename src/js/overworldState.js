import $ from "jquery";
import { LevelMap, Player, Animator} from './DisplayObjects.js';

//make an instance of each object
export let waltDisney = new Animator();
let gameMaps = new LevelMap();
export let player1 = new Player(waltDisney, gameMaps);

export function createRoom() {
  $("#map-background").html("");
  for(let i = 0; i< 10; i++){
    for(let j = 0; j<10;j++){
      $("#map-background").append(`<div class="${gameMaps.Rooms[player1.z][j][i].texture} tile"></div>`);
    }
  }
}

createRoom();

//make a controller

var keysDown = {};

document.addEventListener("keydown",(e)=>{keysDown[e.keyCode] = true;}, false);
document.addEventListener('keyup',(e)=>{delete keysDown[e.keyCode];}, false);

export function takeInput(){
  if (38 in keysDown ) {
    player1.move('N');
  }
  if(40 in keysDown){
    player1.move('S');
  }
  if(39 in keysDown){
    player1.move('E');
  }
  if(37 in keysDown){
    player1.move('W');
  }
}

//misc
let background = document.getElementById('map-background');
background.style.width = waltDisney.screen.width;
background.style.height = waltDisney.screen.height;