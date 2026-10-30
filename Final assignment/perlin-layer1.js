let leftBubble;
let rightBubble;

// Position is a fraction of the canvas width or height.
//During size and position adjusting to suit the characters
let leftX = 480 / 1220;
let leftY = 0.33;
let rightX = 725 / 1220;
let rightY = 0.33;

// Adjust each bubble separately.
let leftSize = 0.2;
let rightSize = 0.2;
let leftShapeAmount = 0.8;
let rightShapeAmount = 0.8;
let leftSpeed = 0.38;
let rightSpeed = 0.34;

function setupperlin() {
  //createCanvas(windowWidth, windowHeight);
  //pixelDensity(1);
  frameRate(30);
  noiseSeed(41);
  noiseDetail(2, 0.5);

  // White bubbles with a soft red or blue tint.
  leftBubble = createBubble(41, 255, 226, 231);
  rightBubble = createBubble(97, 220, 234, 255);
}

function drawperlin() {
  // Keep the background transparent.
  //clear();

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
