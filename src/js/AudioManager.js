export default class AudioManager{
  constructor(){

  }
  static startAudio(string, bool){
    //let audioContext = new AudioContext();
    let audio = document.getElementById(string);
    audio.loop = bool;
    audio.currentTime = 0;
    if(audio.paused){
      audio.play();
    }
  }
  static pauseAudio(string){
    let audio = document.getElementById(string);
    if(!audio.paused){
      audio.pause();
    }
  }
  static continueAudio(string){
    let audio = document.getElementById(string);
    if(audio.paused){
      audio.play();
    }
  }
  //continue
}

// const music = new Audio('adf.wav');
// music.play();
// music.loop =true;
// music.playbackRate = 2;
// music.pause();