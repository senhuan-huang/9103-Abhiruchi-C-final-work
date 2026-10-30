let leftBubble;
let rightBubble;

// Position is a fraction of the canvas width or height.
let leftX = 0.25;
let leftY = 0.5;
let rightX = 0.75;
let rightY = 0.5;

// Adjust each bubble separately.
let leftSize = 0.33;
let rightSize = 0.33;
let leftShapeAmount = 0.8;
let rightShapeAmount = 0.8;
let leftSpeed = 0.38;
let rightSpeed = 0.34;

function setupperlin() {
  //createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  frameRate(30);
  noiseSeed(41);
  noiseDetail(2, 0.5);

  // White bubbles with a soft red or blue tint.
  leftBubble = createBubble(41, 255, 226, 231);
  rightBubble = createBubble(97, 220, 234, 255);
}

function drawperlin() {
  // Keep the background transparent.
  clear();

  let leftDiameter = min(width * leftSize, height * 0.62);
  let rightDiameter = min(width * rightSize, height * 0.62);

  updateBubble(leftBubble, leftSpeed, leftShapeAmount);
  updateBubble(rightBubble, rightSpeed, rightShapeAmount);

  drawBubble(leftBubble, width * leftX, height * leftY, leftDiameter);
  drawBubble(rightBubble, width * rightX, height * rightY, rightDiameter);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
