import { waltDisney } from "./overworldState.js";
import NightCity from "../assets/images/NightCity.gif";
import { gameState } from "../index.js";
let event = [];
let img = new Image();
let imgReady = false;
img.src = NightCity;
img.onload = function(){
  imgReady = true;
};
document.addEventListener('click', function(e){
  event = e;
});


export class BattleScreen{
  constructor(){
    this.unit = (waltDisney.screen.height*(1/3))/20;
    this.attack = [this.unit, waltDisney.screen.height*(2/3)+(3*this.unit), waltDisney.screen.width-this.unit, this.unit*3,"attack"];
    this.guard = [this.unit, waltDisney.screen.height*(2/3)+(8*this.unit), waltDisney.screen.width-this.unit, this.unit*8, "guard"];
    this.magic = [this.unit, waltDisney.screen.height*(2/3)+(13*this.unit), waltDisney.screen.width-this.unit, this.unit*13, "debug"];
  }
  drawBackground(){
    waltDisney.brush.fillStyle = 'black';
    waltDisney.brush.fillRect(0,0,waltDisney.screen.width,waltDisney.screen.height);
  }
  drawBoxes(){
    waltDisney.brush.fillStyle = 'blue';
    waltDisney.brush.fillRect(0,waltDisney.screen.height*(2/3),waltDisney.screen.width,waltDisney.screen.height*(1/3));
  }
  drawFlavor(){
    if(imgReady){
      waltDisney.brush.drawImage(img,0,0,waltDisney.screen.width,waltDisney.screen.height*(2/3));
    }
  }
  drawOptionBoxes(){
    waltDisney.brush.font = '30px Arial';
    waltDisney.brush.fillStyle = 'black';
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
      if(mousePosition[0]>this.attack[0] && mousePosition[0]<(this.attack[0]+waltDisney.screen.width/2) && mousePosition[1]>(this.attack[1]-30) && mousePosition[1]<this.attack[1]){
        alert('attack triggered');
      }
      if(mousePosition[0]>this.guard[0] && mousePosition[0]<(this.guard[0]+waltDisney.screen.width/2) && mousePosition[1]>(this.guard[1]-30) && mousePosition[1]<this.guard[1]){
        alert('guard triggered');
      }
      if(mousePosition[0]>this.magic[0] && mousePosition[0]<(this.magic[0]+waltDisney.screen.width/2) && mousePosition[1]>(this.magic[1]-30) && mousePosition[1]<this.magic[1]){
        alert('magic triggered');
      }

    } 
  }
}