export default class AudioManager{
  constructor(){

  }
  // static playAudio2(){
  //   let audio = new Audio();
  //   audio.src = 'https://docs.google.com/uc?export=download&id=1sbTDsZ--XS_ktYMx2KGM_DYBjb-_s2WT';
  //   audio.play();
  // }
  static playAudio(){
    //let audioContext = new AudioContext();
    let audio = document.getElementById('over-world-audio');
    if(audio.paused){
      audio.play();
    }
    //audio.setAttribute('autoplay');
    //const track = audioContext.createMediaElementSource(audio);
    //track.connect(audioContext.destination);
  }
}

// const music = new Audio('adf.wav');
// music.play();
// music.loop =true;
// music.playbackRate = 2;
// music.pause();