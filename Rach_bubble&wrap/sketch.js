let characters;
let leftBubble;
let rightBubble;

let settings = {
  figureOpacity: 158,
  turns: 3.4,
  rotationSpeed: 0.19,
  noiseAmount: 0.075
};

async function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(Math.min(window.devicePixelRatio || 1, 2));

  noLoop();

  characters = await loadImage('characters-transparent.png');

  setupWrap(41, settings.turns);
  leftBubble = createBubble(97, true);
  rightBubble = createBubble();

  loop();
}

function draw() {
  clear();

  if (!characters || !leftBubble || !rightBubble) {
    return;
  }

  let scale = Math.min(
    width / characters.width,
    height / characters.height
  );

  let w = characters.width * scale;
  let h = characters.height * scale;
  let x = (width - w) / 2;
  let y = (height - h) / 2;
  let dt = Math.min(deltaTime / 1000, 0.05);

  updateWrap(
    dt,
    x + w * 0.363,
    y + h * 0.35,
    h * 0.49,
    w * 0.092,
    settings.rotationSpeed,
    settings.noiseAmount
  );

  drawBubble(
    leftBubble,
    x + w * 0.363,
    y + h * 0.35,
    w * 0.114 * 1.06,
    dt
  );

  drawWrapLayer('back');

  push();
  tint(255, settings.figureOpacity);
  image(characters, x, y, w, h);
  pop();

  drawWrapLayer('front');

  drawBubble(
    rightBubble,
    x + w * 0.651,
    y + h * 0.365,
    w * 0.114 * 1.06,
    dt
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}