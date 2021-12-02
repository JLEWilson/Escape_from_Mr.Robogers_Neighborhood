import { waltDisney } from "./overworldState.js";
import NightCity from "../assets/images/NightCity.gif";
import characterfront  from "../assets/img/character-front-zoom.png";
import { gameState } from "../index.js";
import { attack, guard, magic} from "./battleState.js";
let event = [];
let img = new Image();
let playerBattleImg = new Image();
let imgReady = false;
let pbImg = false;
img.src = NightCity;
playerBattleImg.src = characterfront;

img.onload = function(){
  imgReady = true;
};
playerBattleImg.onload = function(){
  pbImg = true;
};

document.addEventListener('click', function(e){
  event = e;
});


export class BattleScreen{
  constructor(){
    this.unit = (waltDisney.screen.height*(1/3))/20;
    this.attack = [this.unit, waltDisney.screen.height*(2/3)+(4*this.unit), waltDisney.screen.width-this.unit, this.unit*4,"attack"];
    this.guard = [this.unit, waltDisney.screen.height*(2/3)+(9*this.unit), waltDisney.screen.width-this.unit, this.unit*9, "guard"];
    this.magic = [this.unit, waltDisney.screen.height*(2/3)+(14*this.unit), waltDisney.screen.width-this.unit, this.unit*14, "debug"];
  }
  drawEnemy(test){
    waltDisney.brush.fillStyle = 'red';
    waltDisney.brush.textAlign = 'center';
    waltDisney.brush.fillText(test,waltDisney.screen.width*(2/3),waltDisney.screen.height*(1/6));
    waltDisney.brush.textAlign = 'left';
  }
  drawPlayer(){
    if(pbImg){
      waltDisney.brush.drawImage(playerBattleImg,0,waltDisney.screen.height*(1/3),waltDisney.screen.width*(1/3),waltDisney.screen.height*(2/3));
    }
  }
  drawBackground(){
    waltDisney.brush.fillStyle = 'black';
    waltDisney.brush.fillRect(0,0,waltDisney.screen.width,waltDisney.screen.height);
  }
  drawBoxes(){
    waltDisney.brush.fillStyle = 'rgb(157, 171, 224)';
    waltDisney.brush.fillRect(0,waltDisney.screen.height*(2/3),waltDisney.screen.width,waltDisney.screen.height*(1/3));
  }
  drawFlavor(){
    if(imgReady){
      waltDisney.brush.drawImage(img,0,0,waltDisney.screen.width,waltDisney.screen.height*(2/3));
    }
  }
  drawOptionBoxes(){
    waltDisney.brush.font = '30px Arial';
    waltDisney.brush.fillStyle = 'rgb(57, 62, 82)';
    waltDisney.brush.fillText(this.attack[4],this.attack[0],this.attack[1]);
    waltDisney.brush.fillText(this.guard[4],this.guard[0],this.guard[1]);
    waltDisney.brush.fillText(this.magic[4],this.magic[0],this.magic[1]);
  }
  getMousePos(e){
    let screenPos = waltDisney.screen.getBoundingClientRect();
    return [e.clientX - screenPos.left, e.clientY-screenPos.top];
  }
  checkForSelect(){
    let mousePosition = this.getMousePos(event);
    if(gameState ==='battleState'){
      if(mousePosition[0]>this.attack[0] && mousePosition[0]<(this.attack[0]+waltDisney.screen.width/3) && mousePosition[1]>(this.attack[1]-30) && mousePosition[1]<this.attack[1]){
        attack();
      }
      if(mousePosition[0]>this.guard[0] && mousePosition[0]<(this.guard[0]+waltDisney.screen.width/3) && mousePosition[1]>(this.guard[1]-30) && mousePosition[1]<this.guard[1]){
        guard();
      }
      if(mousePosition[0]>this.magic[0] && mousePosition[0]<(this.magic[0]+waltDisney.screen.width/3) && mousePosition[1]>(this.magic[1]-30) && mousePosition[1]<this.magic[1]){
        magic();
      }

    } 
  }
}