let characters;

function preload() {
  characters = loadImage('person A-1.1.png');
}

// Size, opacity and motion settings.
let bubbleSize = 0.35;
let bubbleOpacity = 235;
let breathingAmount = 0.012;
let breathingSpeed = 0.65;
let bubbleTime = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  createBubbleTexture();
}

function draw() {
  // Clear each frame without painting a background.
  clear();

  let scale = min(
    width * 0.4 / characters.width,
    height * 0.9 / characters.height
  );

  // Draw the figures behind the bubble.
  push();
  imageMode(CENTER);

  image(
  characters,
  width / 2,
  height / 2,
  characters.width * scale,
  characters.height * scale
  );

  pop();

  bubbleTime += min(deltaTime / 1000, 0.05);

  let size = min(width, height) * bubbleSize;
  let bubbleY = height / 2 - characters.height * scale * 0.25;
  drawBubble(width / 2, bubbleY, size);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}