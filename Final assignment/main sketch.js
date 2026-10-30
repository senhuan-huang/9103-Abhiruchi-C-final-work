function preload() {
  preloadInput();
  preloadtime();
}

function setup() {
  createCanvas(1220, 600);
  setuptime();
  setupperlin();
}

function draw() {
  drawInput();
  drawtime();
  drawperlin();
}

function mouseMoved() {
  mouseMovedInput();
}

function mousePressed() {
}

function windowResized() {
}