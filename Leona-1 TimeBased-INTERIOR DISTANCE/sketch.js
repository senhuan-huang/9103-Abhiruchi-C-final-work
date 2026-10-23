/*
  TIME-BASED ICON GARDEN

  Click either full-body geometric figure to start its own 13-second sequence.
  Press R to reset both figures.

  In the group file, Hansen's User Input code can call:
  activateCharacter("A");
  activateCharacter("B");
*/

let characterA;
let characterB;
let sceneBackground;
let characterAImage;
let characterBImage;

function preload() {
  sceneBackground = loadImage("assets/background.png");
  characterAImage = loadImage("assets/characterA-colour.png");
  characterBImage = loadImage("assets/characterB-colour.png");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-container");

  textFont("Arial");
  strokeCap(ROUND);
  strokeJoin(ROUND);
  setupTimeMechanic();
}

function draw() {
  drawQuietBackground();
  drawPageHeading();
  updateTimeMechanic();
  drawTimeMechanic();
}

function mousePressed() {
  if (characterA.isMouseOver()) {
    activateCharacter("A");
  } else if (characterB.isMouseOver()) {
    activateCharacter("B");
  }
}

function keyPressed() {
  if (key === "r" || key === "R") {
    resetTimeMechanic();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  positionCharacters();
}

function getSceneScale() {
  return min(width / 1440, height / 900);
}

function drawQuietBackground() {
  background(10, 14, 54);

  // Cover the entire canvas while preserving the source image proportions.
  let coverScale = max(width / sceneBackground.width, height / sceneBackground.height);
  let drawWidth = sceneBackground.width * coverScale;
  let drawHeight = sceneBackground.height * coverScale;

  imageMode(CENTER);
  image(sceneBackground, width / 2, height / 2, drawWidth, drawHeight);
  imageMode(CORNER);
}

function drawPageHeading() {
  let s = getSceneScale();
  noStroke();
  textAlign(CENTER, TOP);

  textStyle(BOLD);
  textSize(32 * s);
  fill(250, 247, 255);
  text("TIME-BASED ICON GARDEN", width / 2, 24 * s);

  textStyle(NORMAL);
  textSize(14 * s);
  fill(230, 221, 255);
  text("Click either figure to reveal an independent inner world", width / 2, 69 * s);

  textSize(10 * s);
  fill(216, 211, 239);
  textAlign(CENTER, BOTTOM);
  text("R  RESET", width / 2, height - 16 * s);
}
