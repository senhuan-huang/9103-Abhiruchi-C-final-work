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

function createBubble(seed, red, green, blue) {
}

function updateBubble(bubble, speed, amount) {
}

function drawOutline(bubble, radius, scale) {
}

function drawBubble(bubble, x, y, size) {
}