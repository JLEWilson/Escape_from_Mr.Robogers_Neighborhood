export default class AudioManager{
  static setVolumeLevels(){
    const audio1 = document.getElementById('over-world-audio');
    const audio2 = document.getElementById('item-audio');
    const audio3 = document.getElementById('fight-audio');
    const audio4 = document.getElementById('death-audio');
    const audio5 = document.getElementById('creepy-rogers-audio');
    audio1.volume = 0.2;
    audio2.volume = 0.4;
    audio3.volume = 0.2;
    audio4.volume = 0.2;
    audio5.volume = 0.2;
  }
  static startAudio(string, bool){
    let audio = document.getElementById(string);
    audio.loop = bool;
    audio.currentTime = 0;
    if(audio.paused){
      audio.play();
    }
  }
  static pauseAudio(string){
    const audio = document.getElementById(string);
    if(!audio.paused){
      audio.pause();
    }
  }
  static continueAudio(string){
    const audio = document.getElementById(string);
    if(audio.paused){
      audio.play();
    }
  }
}
