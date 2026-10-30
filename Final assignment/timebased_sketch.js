/*
 * Independent Inner Worlds — Time-based mechanic
 *
 * AI acknowledgement:
 * This project was developed with help from ChatGPT (OpenAI). ChatGPT helped
 * organise the two offset timelines, structure the CharacterTimeline and
 * ThoughtIcon classes, create the grayscale-to-colour crossfade, and combine
 * The code was reviewed, adapted and visually directed for this project.
 *
 * No external code examples were copied. p5.js reference:
 * https://p5js.org/reference/
 */

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 810;

// The three-second quiet period happens only once when the page first opens.
// After that, both 15-second character timelines loop without another pause.
const A_START_SECONDS = 3;
const B_START_SECONDS = 10.5;
const CHARACTER_DURATION = 15;

const STAGES = Object.freeze({
  HIDDEN: "hidden",
  REVEAL: "reveal",
  ACTIVE: "active",
  FOCUS: "focus",
  SETTLE: "settle",
  DISSOLVE: "dissolve",
  COMPLETE: "complete",
});
//remove extra background imange
//let backgroundImage;
//let characterAImage;
//let characterBImage;
let iconImages = {};
let characterA;
let characterB;
let cycleStartMillis = 0;

function preloadtime() {
  //don't reuse backgrounds or characters
  //backgroundImage = loadImage("assets/background.png");
  //characterAImage = loadImage("assets/people/character-a.png");
  //characterBImage = loadImage("assets/people/character-b.png");

  const iconFiles = [
    "A_calendar",
    "A_clock",
    "A_document",
    "A_message",
    "A_phone",
    "B_fish",
    "B_house",
    "B_plant",
    "B_sailboat",
    "B_star",
  ];

  for (const name of iconFiles) {
    iconImages[name] = loadImage(`assets/icons/${name}.png`);
  }
}

function setuptime() {
  //const canvas = createCanvas(windowWidth, windowHeight);
  //canvas.parent("canvas-container");
  //imageMode(CENTER);
  //pixelDensity(1);

  characterA = new CharacterTimeline({
    id: "A",
    startAt: A_START_SECONDS,
    //personImage: characterAImage,
    personX: 430,
    personBottom: 760,
    personHeight: 650,
    accentColour: [255, 139, 170],
    focusIcon: "A_clock",
    iconData: [
      { name: "A_clock", x: 310, y: 170, size: 178, phase: 0.2 },
      { name: "A_document", x: 565, y: 215, size: 156, phase: 1.4 },
      { name: "A_calendar", x: 270, y: 350, size: 158, phase: 2.5 },
      { name: "A_message", x: 555, y: 365, size: 150, phase: 3.8 },
      { name: "A_phone", x: 425, y: 465, size: 128, phase: 5.1 },
    ],
  });

  characterB = new CharacterTimeline({
    id: "B",
    startAt: B_START_SECONDS,
    //personImage: characterBImage,
    personX: 1010,
    personBottom: 760,
    personHeight: 650,
    accentColour: [115, 229, 255],
    focusIcon: "B_house",
    iconData: [
      { name: "B_plant", x: 860, y: 175, size: 160, phase: 0.8 },
      { name: "B_house", x: 1160, y: 175, size: 184, phase: 2.0 },
      { name: "B_fish", x: 850, y: 345, size: 150, phase: 3.1 },
      { name: "B_sailboat", x: 1160, y: 335, size: 166, phase: 4.4 },
      { name: "B_star", x: 1015, y: 455, size: 136, phase: 5.6 },
    ],
  });

  cycleStartMillis = millis();
}

//this part of drawtime is drawing for icons, and adjusting 
//position of icon to suitable place
function drawtime() {
  const seconds = (millis() - cycleStartMillis) / 1000;

  characterA.update(seconds);
  characterB.update(seconds);

  push();
  imageMode(CENTER);
  translate(480, 300);
  scale(400 / 650);
  translate(-430, -435);
  characterA.displayIcons(seconds);
  pop();

  push();
  imageMode(CENTER);
  translate(725, 300);
  scale(400 / 650);
  translate(-1010, -435);
  characterB.displayIcons(seconds);
  pop();
}

//function drawtime() {
  //const scene = getSceneTransform();
  //const seconds = (millis() - cycleStartMillis) / 1000;

  //drawBackgroundCover(backgroundImage);

  //push();
  //translate(scene.offsetX, scene.offsetY);
  //scale(scene.scale);

  //characterA.update(seconds);
  //characterB.update(seconds);

  // Subtle connector lines and nodes stay behind the figures and icons.
  //characterA.displayAccents(seconds);
  //characterB.displayAccents(seconds);

  //characterA.displayPerson();
  //characterB.displayPerson();

  // Icons are intentionally drawn after the figures, so they may overlap them.
  //characterA.displayIcons(seconds);
  //characterB.displayIcons(seconds);

  //pop();
//}

function keyPressed() {
  if (key === "r" || key === "R") {
    cycleStartMillis = millis();
  }
}

//function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
//}

class CharacterTimeline {
  constructor(config) {
    this.id = config.id;
    this.startAt = config.startAt;
    this.personImage = config.personImage;
    this.personX = config.personX;
    this.personBottom = config.personBottom;
    this.personHeight = config.personHeight;
    this.accentColour = config.accentColour;
    this.focusIconName = config.focusIcon;
    this.localTime = -1;
    this.stage = STAGES.HIDDEN;
    this.presence = 0;

    this.icons = config.iconData.map(
      (data, index) =>
        new ThoughtIcon({
          ...data,
          image: iconImages[data.name],
          index,
          isFocus: data.name === this.focusIconName,
        }),
    );
  }

  update(globalSeconds) {
    const timeSinceStart = globalSeconds - this.startAt;
    // After the one-time opening delay, each character restarts immediately
    // after its own 15-second sequence. B keeps a 7.5-second offset from A.
    this.localTime =
      timeSinceStart < 0 ? -1 : timeSinceStart % CHARACTER_DURATION;
    this.stage = stageFromTime(this.localTime);
    this.presence = characterPresence(this.localTime);

    const focusIcon = this.icons.find((icon) => icon.isFocus);
    const focusPoint = focusIcon
      ? { x: focusIcon.baseX, y: focusIcon.baseY }
      : { x: this.personX, y: this.personBottom - this.personHeight * 0.55 };

    for (const icon of this.icons) {
      icon.update(this.localTime, this.stage, focusPoint);
    }
  }

  displayPerson() {
    const aspect = this.personImage.width / this.personImage.height;
    const personWidth = this.personHeight * aspect;

    push();
    tint(255, 247);
    image(
      this.personImage,
      this.personX,
      this.personBottom - this.personHeight / 2,
      personWidth,
      this.personHeight,
    );
    noTint();
    pop();
  }

  displayAccents(globalSeconds) {
    const [r, g, b] = this.accentColour;
    const direction = this.id === "A" ? -1 : 1;
    const activeAlpha = 20 + 56 * this.presence;
    const slowTime = globalSeconds * 0.45;

    push();
    noFill();
    strokeWeight(1.1);

    // Three loose, incomplete rings frame the upper-body icon cluster.
    for (let ring = 0; ring < 3; ring += 1) {
      stroke(r, g, b, activeAlpha * (0.78 - ring * 0.15));
      beginShape();
      for (let i = 0; i <= 10; i += 1) {
        const angle = map(i, 0, 10, -2.45, 2.2);
        const radiusX = 178 + ring * 30 + sin(slowTime + i * 0.63) * 7;
        const radiusY = 142 + ring * 22 + cos(slowTime * 0.82 + i) * 8;
        const x = this.personX + cos(angle) * radiusX;
        const y = this.personBottom - 455 + sin(angle) * radiusY;
        curveVertex(x, y);
      }
      endShape();
    }

    // A second ribbon threads between the upper icons.
    stroke(r, g, b, activeAlpha * 0.68);
    beginShape();
    for (let i = 0; i <= 8; i += 1) {
      const x =
        this.personX + direction * 235 - direction * i * 58 +
        sin(slowTime + i * 0.75) * 6;
      const y =
        this.personBottom - 610 +
        sin(i * 0.95 + slowTime * 0.72) * 78 +
        i * 17;
      curveVertex(x, y);
    }
    endShape();

    // Small nodes pulse independently but remain less prominent than the icons.
    for (let i = 0; i < 10; i += 1) {
      const phase = i * 1.17 + (this.id === "A" ? 0 : 0.75);
      const angle = i * 0.88 + (this.id === "A" ? 0.2 : 0.55);
      const radiusX = 190 + (i % 3) * 34;
      const radiusY = 150 + (i % 4) * 18;
      const x =
        this.personX +
        cos(angle) * radiusX +
        sin(slowTime + phase) * 7;
      const y =
        this.personBottom - 455 +
        sin(angle) * radiusY +
        cos(slowTime * 0.86 + phase) * 6;
      const pulse = 0.82 + sin(slowTime * 1.7 + phase) * 0.18;
      const diameter = (5 + (i % 4) * 2) * pulse;

      noStroke();
      fill(r, g, b, activeAlpha * 1.35);
      circle(x, y, diameter);

      noFill();
      stroke(r, g, b, activeAlpha * 0.5);
      strokeWeight(0.9);
      circle(x, y, diameter * 2.2);
    }
    pop();
  }

  displayIcons(globalSeconds) {
    for (const icon of this.icons) {
      icon.display(globalSeconds);
    }
  }
}

class ThoughtIcon {
  constructor(config) {
    this.name = config.name;
    this.image = config.image;
    this.grayImage = makeGrayCopy(config.image);
    this.baseX = config.x;
    this.baseY = config.y;
    this.baseSize = config.size;
    this.phase = config.phase;
    this.index = config.index;
    this.isFocus = config.isFocus;

    this.alpha = 0;
    this.colourAmount = 0;
    this.motionAmount = 0;
    this.displayScale = 1;
    this.focusAmount = 0;
    this.currentX = this.baseX;
    this.currentY = this.baseY;
  }

  update(localTime, stage, focusPoint) {
    let targetAlpha = 0;
    let targetColour = 0;
    let targetMotion = 0;
    let targetScale = 0.95;
    let targetFocus = 0;
    let attraction = 0;

    if (stage === STAGES.REVEAL) {
      const delay = this.index * 0.25;
      const progress = smoothStep(0, 2.25, localTime - delay);
      const colourProgress = smoothStep(0.35, 2.75, localTime - delay);
      targetAlpha = 255 * progress;
      targetColour = colourProgress;
      targetMotion = 0.35 * progress;
      targetScale = lerp(0.94, 1, progress);
    } else if (stage === STAGES.ACTIVE) {
      const progress = smoothStep(3, 7, localTime);
      targetAlpha = 255;
      targetColour = 1;
      targetMotion = lerp(0.45, 1, progress);
      targetScale = 1;
    } else if (stage === STAGES.FOCUS) {
      const progress = smoothStep(7, 9.2, localTime);
      targetAlpha = this.isFocus ? 255 : lerp(235, 150, progress);
      targetColour = 1;
      targetMotion = lerp(1, 0.58, progress);
      targetFocus = this.isFocus ? progress : 0;
      targetScale = this.isFocus
        ? lerp(1, 1.38, progress)
        : lerp(1, 0.86 + (this.index % 3) * 0.06, progress);
      attraction = this.isFocus ? 0 : 0.12 * progress;
    } else if (stage === STAGES.SETTLE) {
      const progress = smoothStep(10, 12, localTime);
      targetAlpha = this.isFocus
        ? 255
        : lerp(150, 205, progress);
      targetColour = 1;
      targetMotion = lerp(0.58, 0, progress);
      targetFocus = this.isFocus ? lerp(1, 0.2, progress) : 0;
      targetScale = this.isFocus
        ? lerp(1.38, 1.08, progress)
        : lerp(0.92, 1, progress);
      attraction = this.isFocus ? 0 : lerp(0.12, 0, progress);
    } else if (stage === STAGES.DISSOLVE) {
      const progress = constrain(map(localTime, 12, 15, 0, 1), 0, 1);
      targetAlpha = 255 * (1 - smoothStep(0.24, 1, progress));
      targetColour = 1 - smoothStep(0, 0.58, progress);
      targetMotion = 0;
      targetScale = 1;
      targetFocus = 0;
    }

    // lerp() smooths the transition between the target values of each stage.
    this.alpha = lerp(this.alpha, targetAlpha, 0.12);
    this.colourAmount = lerp(this.colourAmount, targetColour, 0.1);
    this.motionAmount = lerp(this.motionAmount, targetMotion, 0.08);
    this.displayScale = lerp(this.displayScale, targetScale, 0.09);
    this.focusAmount = lerp(this.focusAmount, targetFocus, 0.1);

    this.currentX = lerp(this.baseX, focusPoint.x, attraction);
    this.currentY = lerp(this.baseY, focusPoint.y, attraction);
  }

  display(globalSeconds) {
    if (this.alpha < 0.8) return;

    // Fixed phase offsets keep the motion repeatable: no random() or noise().
    const driftX =
      sin(globalSeconds * 1.05 + this.phase) * 5.5 * this.motionAmount;
    const driftY =
      cos(globalSeconds * 1.27 + this.phase) * 8 * this.motionAmount;
    const pulse =
      1 + sin(globalSeconds * 1.7 + this.phase) * 0.028 * this.motionAmount;
    const stretchX =
      1 + sin(globalSeconds * 1.15 + this.phase) * 0.018 * this.motionAmount;
    const stretchY =
      1 + cos(globalSeconds * 1.33 + this.phase) * 0.024 * this.motionAmount;

    const widthValue =
      this.baseSize * this.displayScale * pulse * stretchX;
    const heightValue =
      this.baseSize * this.displayScale * pulse * stretchY;
    const grayAlpha = this.alpha * (1 - this.colourAmount);
    const colourAlpha = this.alpha * this.colourAmount;

    push();
    translate(this.currentX + driftX, this.currentY + driftY);

    if (this.focusAmount > 0.02) {
      drawingContext.shadowColor = "rgba(255, 245, 220, 0.95)";
      drawingContext.shadowBlur = 30 + 28 * this.focusAmount;
      tint(255, 55 * this.focusAmount);
      image(this.image, 0, 0, widthValue * 1.13, heightValue * 1.13);
    }

    if (grayAlpha > 0.5) {
      drawingContext.shadowBlur = 8;
      tint(238, 244, 255, grayAlpha);
      image(this.grayImage, 0, 0, widthValue, heightValue);
    }

    if (colourAlpha > 0.5) {
      drawingContext.shadowColor = "rgba(180, 220, 255, 0.65)";
      drawingContext.shadowBlur = 12 + 18 * this.focusAmount;
      tint(255, colourAlpha);
      image(this.image, 0, 0, widthValue, heightValue);
    }

    noTint();
    drawingContext.shadowBlur = 0;
    pop();
  }
}

function stageFromTime(localTime) {
  if (localTime < 0) return STAGES.HIDDEN;
  if (localTime < 3) return STAGES.REVEAL;
  if (localTime < 7) return STAGES.ACTIVE;
  if (localTime < 10) return STAGES.FOCUS;
  if (localTime < 12) return STAGES.SETTLE;
  if (localTime < CHARACTER_DURATION) return STAGES.DISSOLVE;
  return STAGES.COMPLETE;
}

function characterPresence(localTime) {
  if (localTime < 0 || localTime > CHARACTER_DURATION) return 0;
  if (localTime < 2) return smoothStep(0, 2, localTime);
  if (localTime < 12) return 1;
  return 1 - smoothStep(12, CHARACTER_DURATION, localTime);
}

function makeGrayCopy(sourceImage) {
  const copyImage = createImage(sourceImage.width, sourceImage.height);
  copyImage.copy(
    sourceImage,
    0,
    0,
    sourceImage.width,
    sourceImage.height,
    0,
    0,
    sourceImage.width,
    sourceImage.height,
  );
  copyImage.filter(GRAY);
  return copyImage;
}

function smoothStep(edge0, edge1, value) {
  const amount = constrain((value - edge0) / (edge1 - edge0), 0, 1);
  return amount * amount * (3 - 2 * amount);
}

function getSceneTransform() {
  const sceneScale = min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT);
  return {
    scale: sceneScale,
    offsetX: (width - DESIGN_WIDTH * sceneScale) / 2,
    offsetY: (height - DESIGN_HEIGHT * sceneScale) / 2,
  };
}

function drawBackgroundCover(img) {
  const imageRatio = img.width / img.height;
  const canvasRatio = width / height;
  let drawWidth;
  let drawHeight;

  if (canvasRatio > imageRatio) {
    drawWidth = width;
    drawHeight = width / imageRatio;
  } else {
    drawHeight = height;
    drawWidth = height * imageRatio;
  }

  push();
  imageMode(CENTER);
  image(img, width / 2, height / 2, drawWidth, drawHeight);
  pop();
}
