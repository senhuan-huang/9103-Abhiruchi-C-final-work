function preload() {
  preloadInput();
  preloadtime();
  preloadAudio();
}

function setup() {
  createCanvas(1220, 600);
  setuptime();
  setupperlin();
  setupAudio();
}

function draw() {
  drawInput();
  if (audioopen !== -1 && song.isPlaying()) drawAudio();
  drawperlin();
  drawInput2();
  drawtime();
  
}

function mouseMoved() {
  mouseMovedInput();
}

function mousePressed() {
  mouseMovedInput();
  //Ignore clicks outside both characters.
  if (mousehover === -1) return;
  //Remember which character was clicked: 0 = left, 1 = right.
   audioopen = mousehover;
   //browser audio after the click, then loop the song.
  userStartAudio().then(() => {
    if (!song.isPlaying()) song.loop();
  });
}

