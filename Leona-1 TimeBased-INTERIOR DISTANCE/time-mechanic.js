/*
  LEONA — TIME-BASED ICON MECHANIC

  0–1 seconds    OUTLINE ACTIVATION
  1–4 seconds    COLOUR AWAKENING
  4–7 seconds    THOUGHT EXPANSION
  7–10 seconds   CORE THOUGHT FOCUS
  10–13 seconds  DISSOLVE TO SILENCE

  The icon colours imitate a soft airbrushed gradient by layering basic
  translucent p5.js circles and repeated strokes. No image assets are required.
  The bubbles use a small fixed list. There are no random particles.
*/

const FPS = 60;
const TOTAL_TIME = 13;

const STAGE = {
  IDLE: "QUIET",
  OUTLINE: "OUTLINE ACTIVATION",
  COLOUR: "COLOUR AWAKENING",
  EXPANSION: "THOUGHT EXPANSION",
  FOCUS: "CORE THOUGHT FOCUS",
  DISSOLVE: "DISSOLVE TO SILENCE"
};

const iconDataA = [
  makeIcon("clock",     0,   -185, 1.25, "primary", true,  0.2, 0.017, 8, [[255,102,143],[255,184,68],[88,179,255]]),
  makeIcon("phone",   -78,  -105, 0.82, "primary", false, 1.0, 0.014, 7, [[255,91,168],[255,157,75],[85,161,255]]),
  makeIcon("file",     82,  -102, 0.82, "primary", false, 2.0, 0.016, 6, [[255,126,93],[255,203,84],[187,104,255]]),
  makeIcon("calendar",-92,   -15, 0.72, "second",  false, 2.8, 0.013, 5, [[188,96,255],[255,102,180],[85,177,255]]),
  makeIcon("message",  0,     4, 0.70, "second",  false, 3.6, 0.015, 4, [[68,215,181],[84,174,255],[255,116,184]]),
  makeIcon("clock",    95,    -5, 0.66, "second",  false, 4.2, 0.018, 3, [[255,123,91],[255,201,74],[213,93,255]]),
  makeIcon("phone",   -66,    80, 0.62, "second",  false, 4.9, 0.014, 2, [[75,168,255],[188,93,255],[255,113,162]]),
  makeIcon("file",     68,    83, 0.66, "second",  false, 5.5, 0.016, 1, [[255,151,67],[255,99,151],[192,105,255]]),
  makeIcon("clock",     0,   145, 0.55, "second",  false, 5.9, 0.012, 0, [[255,185,70],[255,106,157],[99,167,255]])
];

const iconDataB = [
  makeIcon("house",     0,   -185, 1.24, "primary", true,  0.5, 0.013, 8, [[64,202,245],[115,232,164],[194,95,255]]),
  makeIcon("plant",   -80,  -102, 0.86, "primary", false, 1.3, 0.012, 7, [[70,220,166],[53,177,238],[190,101,255]]),
  makeIcon("star",     82,  -105, 0.78, "primary", false, 2.2, 0.014, 6, [[255,196,65],[255,107,170],[111,159,255]]),
  makeIcon("fish",    -92,   -10, 0.68, "second",  false, 3.0, 0.011, 5, [[56,191,244],[181,96,255],[255,123,162]]),
  makeIcon("boat",      0,     2, 0.78, "second",  false, 3.8, 0.013, 4, [[72,185,255],[116,227,174],[255,167,74]]),
  makeIcon("moon",     94,    -8, 0.68, "second",  false, 4.4, 0.011, 3, [[132,132,255],[202,100,255],[255,200,83]]),
  makeIcon("plant",   -68,    78, 0.63, "second",  false, 5.0, 0.012, 2, [[62,208,169],[66,172,244],[220,95,255]]),
  makeIcon("fish",     68,    84, 0.58, "second",  false, 5.5, 0.014, 1, [[255,118,164],[88,172,255],[89,218,176]]),
  makeIcon("star",      0,   145, 0.53, "second",  false, 5.9, 0.010, 0, [[255,193,68],[190,91,255],[63,193,236]])
];

const bubbleDataA = [
  { x: -115, y: -160, size: 23, colours: [[255,112,163],[255,191,73]] },
  { x: 118,  y: -155, size: 34, colours: [[255,186,67],[201,104,255]] },
  { x: -112, y: 45,   size: 17, colours: [[87,174,255],[255,111,172]] },
  { x: 114,  y: 55,   size: 25, colours: [[255,121,92],[255,210,90]] }
];

const bubbleDataB = [
  { x: -115, y: -155, size: 27, colours: [[77,190,250],[104,230,169]] },
  { x: 115,  y: -155, size: 20, colours: [[192,98,255],[255,113,177]] },
  { x: -112, y: 50,   size: 22, colours: [[68,210,190],[76,168,255]] },
  { x: 114,  y: 55,   size: 31, colours: [[114,147,255],[204,100,255]] }
];

function makeIcon(type, x, y, size, group, core, phase, speed, fadeOrder, palette) {
  return { type, x, y, size, group, core, phase, speed, fadeOrder, palette };
}

function setupTimeMechanic() {
  characterA = new CharacterWorld("A", "PRESSURE / RESPONSIBILITY", [150,143,174], iconDataA, bubbleDataA);
  characterB = new CharacterWorld("B", "MEMORY / CONNECTION", [146,151,184], iconDataB, bubbleDataB);
  positionCharacters();
}

function positionCharacters() {
  let s = getSceneScale();
  characterA.setPosition(width * 0.30, height * 0.58, s);
  characterB.setPosition(width * 0.70, height * 0.58, s);
}

function activateCharacter(id) {
  if (id === "A") characterA.activate();
  if (id === "B") characterB.activate();
}

function resetTimeMechanic() {
  characterA.reset();
  characterB.reset();
}

function updateTimeMechanic() {
  characterA.update();
  characterB.update();
}

function drawTimeMechanic() {
  characterA.display();
  characterB.display();
}

function stageFromTime(seconds) {
  if (seconds < 1) return STAGE.OUTLINE;
  if (seconds < 4) return STAGE.COLOUR;
  if (seconds < 7) return STAGE.EXPANSION;
  if (seconds < 10) return STAGE.FOCUS;
  if (seconds < 13) return STAGE.DISSOLVE;
  return STAGE.IDLE;
}

class CharacterWorld {
  constructor(id, description, figureColour, iconData, bubbleData) {
    this.id = id;
    this.description = description;
    this.figureColour = figureColour;
    this.bubbleData = bubbleData;
    this.icons = [];
    this.x = 0;
    this.y = 0;
    this.s = 1;
    this.active = false;
    this.startFrame = 0;
    this.elapsed = 0;
    this.stage = STAGE.IDLE;

    for (let i = 0; i < iconData.length; i++) {
      this.icons.push(new ThoughtIcon(iconData[i], i));
    }
  }

  setPosition(x, y, sceneScale) {
    this.x = x;
    this.y = y;
    this.s = sceneScale;
    for (let i = 0; i < this.icons.length; i++) this.icons[i].setOwner(this);
  }

  activate() {
    this.active = true;
    this.startFrame = frameCount;
    this.elapsed = 0;
    this.stage = STAGE.OUTLINE;
    for (let i = 0; i < this.icons.length; i++) this.icons[i].reset();
  }

  reset() {
    this.active = false;
    this.elapsed = 0;
    this.stage = STAGE.IDLE;
    for (let i = 0; i < this.icons.length; i++) this.icons[i].reset();
  }

  update() {
    if (!this.active) return;
    this.elapsed = (frameCount - this.startFrame) / FPS;
    this.stage = stageFromTime(this.elapsed);

    for (let i = 0; i < this.icons.length; i++) {
      this.icons[i].update(this.elapsed, this.stage);
    }

    if (this.elapsed >= TOTAL_TIME) this.reset();
  }

  display() {
    this.drawGeometricFigure();
    this.drawFixedBubbles();
    for (let i = 0; i < this.icons.length; i++) this.icons[i].display();
    this.drawStatus();
  }

  drawGeometricFigure() {
    let hovered = this.isMouseOver();
    let figureImage = this.id === "A" ? characterAImage : characterBImage;
    let figureAlpha = hovered || this.active ? 255 : 205;
    let figureWidth = 310 * this.s;
    let figureHeight = figureWidth * (figureImage.height / figureImage.width);

    push();
    imageMode(CENTER);
    tint(255, figureAlpha);
    image(figureImage, this.x, this.y - 25 * this.s, figureWidth, figureHeight);
    noTint();

    if (hovered && !this.active) {
      noFill();
      stroke(232, 218, 255, 135);
      strokeWeight(2 * this.s);
      ellipse(this.x, this.y - 25 * this.s, 340 * this.s, 500 * this.s);
    }
    pop();
  }

  drawFixedBubbles() {
    if (!this.active || this.elapsed < 1) return;

    let bubbleAlpha = 0;
    if (this.stage === STAGE.COLOUR) bubbleAlpha = 70 * constrain((this.elapsed - 1) / 3, 0, 1);
    if (this.stage === STAGE.EXPANSION) bubbleAlpha = 95;
    if (this.stage === STAGE.FOCUS) bubbleAlpha = 50;
    if (this.stage === STAGE.DISSOLVE) bubbleAlpha = 65 * (1 - constrain((this.elapsed - 10) / 1.5, 0, 1));

    for (let i = 0; i < this.bubbleData.length; i++) {
      let bubble = this.bubbleData[i];
      let driftX = sin(frameCount * 0.012 + i) * 4 * this.s;
      let driftY = cos(frameCount * 0.010 + i * 1.7) * 3 * this.s;
      drawSoftBubble(
        this.x + bubble.x * this.s + driftX,
        this.y - 90 * this.s + bubble.y * this.s + driftY,
        bubble.size * this.s,
        bubble.colours,
        bubbleAlpha
      );
    }
  }

  getCoreIcon() {
    for (let i = 0; i < this.icons.length; i++) {
      if (this.icons[i].data.core) return this.icons[i];
    }
    return null;
  }

  drawStatus() {
    let barY = this.y + 245 * this.s;
    let barWidth = 300 * this.s;

    noStroke();
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(13 * this.s);
    fill(250, 247, 255);
    text("PERSON " + this.id, this.x, barY);

    textStyle(NORMAL);
    textSize(10 * this.s);
    fill(225, 218, 244);
    text(this.description, this.x, barY + 20 * this.s);

    fill(225, 218, 244, 125);
    rectMode(CORNER);
    rect(this.x - barWidth / 2, barY + 44 * this.s, barWidth, 4 * this.s, 2 * this.s);

    if (this.active) {
      let progress = constrain(this.elapsed / TOTAL_TIME, 0, 1);
      let barColour = this.id === "A" ? [255,115,157] : [87,177,239];
      fill(barColour[0], barColour[1], barColour[2], 210);
      rect(this.x - barWidth / 2, barY + 44 * this.s, barWidth * progress, 4 * this.s, 2 * this.s);
    }

    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(10 * this.s);
    fill(244, 239, 255);
    text(this.stage, this.x, barY + 57 * this.s);

    textStyle(NORMAL);
    textSize(9 * this.s);
    fill(215, 210, 236);
    let timeLabel = this.active ? this.elapsed.toFixed(1) + " / 13.0 s" : "CLICK FIGURE";
    text(timeLabel, this.x, barY + 74 * this.s);
  }

  isMouseOver() {
    return (
      mouseX > this.x - 165 * this.s &&
      mouseX < this.x + 165 * this.s &&
      mouseY > this.y - 270 * this.s &&
      mouseY < this.y + 220 * this.s
    );
  }
}

class ThoughtIcon {
  constructor(data, index) {
    this.data = data;
    this.index = index;
    this.owner = null;
    this.currentX = 0;
    this.currentY = 0;
    this.alpha = 0;
    this.colourAmount = 0;
    this.glowAmount = 0;
    this.motionAmount = 0;
    this.displayScale = 0.72;
  }

  setOwner(owner) {
    this.owner = owner;
    let anchor = this.anchorPosition();
    this.currentX = anchor.x;
    this.currentY = anchor.y;
  }

  reset() {
    let anchor = this.anchorPosition();
    this.currentX = anchor.x;
    this.currentY = anchor.y;
    this.alpha = 0;
    this.colourAmount = 0;
    this.glowAmount = 0;
    this.motionAmount = 0;
    this.displayScale = 0.72;
  }

  update(seconds, stage) {
    let targetAlpha = 0;
    let targetColour = 0;
    let targetGlow = 0;
    let targetMotion = 0;
    let targetScale = this.data.size * 0.8;
    let visible = this.data.group === "primary";

    if (stage === STAGE.OUTLINE) {
      if (visible) targetAlpha = 225;
    }

    if (stage === STAGE.COLOUR) {
      let progress = constrain((seconds - 1) / 3, 0, 1);
      if (visible) {
        targetAlpha = 255;
        targetColour = progress;
        targetGlow = progress * 0.65;
        targetMotion = lerp(2, 5, progress);
        targetScale = this.data.size;
      }
    }

    if (stage === STAGE.EXPANSION) {
      let progress = constrain((seconds - 4) / 3, 0, 1);
      targetAlpha = 255;
      targetColour = 1;
      targetGlow = 0.72;
      targetMotion = lerp(5, 14, progress);
      targetScale = this.data.size;
    }

    if (stage === STAGE.FOCUS) {
      targetAlpha = this.data.core ? 255 : 155;
      targetColour = 1;
      targetGlow = this.data.core ? 1 : 0.22;
      targetMotion = this.data.core ? 3 : 1.5;
      targetScale = this.data.core ? this.data.size * 1.38 : this.data.size * 0.88;
    }

    if (stage === STAGE.DISSOLVE) {
      let stopProgress = constrain((seconds - 10) / 1, 0, 1);
      let colourProgress = constrain((seconds - 11) / 1, 0, 1);
      let fadeStart = 11.55 + this.data.fadeOrder * 0.12;
      let fadeProgress = constrain((seconds - fadeStart) / 0.72, 0, 1);

      targetAlpha = 255 * (1 - fadeProgress);
      targetColour = 1 - colourProgress;
      targetGlow = 0;
      targetMotion = lerp(10, 0, stopProgress);
      targetScale = lerp(this.data.size, this.data.size * 0.78, fadeProgress);
    }

    let target = this.movingPosition(targetMotion);

    if (stage === STAGE.FOCUS && !this.data.core) {
      let core = this.owner.getCoreIcon();
      target.x = lerp(target.x, core.currentX, 0.10);
      target.y = lerp(target.y, core.currentY, 0.10);
    }

    this.currentX = lerp(this.currentX, target.x, 0.10);
    this.currentY = lerp(this.currentY, target.y, 0.10);
    this.alpha = lerp(this.alpha, targetAlpha, 0.13);
    this.colourAmount = lerp(this.colourAmount, targetColour, 0.10);
    this.glowAmount = lerp(this.glowAmount, targetGlow, 0.09);
    this.motionAmount = lerp(this.motionAmount, targetMotion, 0.08);
    this.displayScale = lerp(this.displayScale, targetScale, 0.09);
  }

  anchorPosition() {
    if (!this.owner) return { x: 0, y: 0 };
    return {
      x: this.owner.x + this.data.x * this.owner.s,
      y: this.owner.y - 65 * this.owner.s + this.data.y * this.owner.s
    };
  }

  movingPosition(amount) {
    let anchor = this.anchorPosition();
    let s = this.owner.s;
    return {
      x: anchor.x + sin(frameCount * this.data.speed + this.data.phase) * amount * s,
      y: anchor.y + cos(frameCount * this.data.speed * 0.78 + this.data.phase) * amount * 0.65 * s
    };
  }

  display() {
    if (this.alpha < 1) return;

    push();
    translate(this.currentX, this.currentY);
    scale(this.displayScale * this.owner.s);

    this.drawLiquidContainer();

    let outlineAlpha = this.alpha * (1 - this.colourAmount);
    this.drawSymbol([151,148,177], outlineAlpha, 0, 3.0);

    if (this.colourAmount > 0.02) {
      drawSolidIconSymbol(
        this.data.type,
        this.data.palette,
        this.alpha * this.colourAmount
      );
    }
    pop();
  }

  drawLiquidContainer() {
    let colours = this.data.palette;
    let phase = this.data.phase + this.index * 0.37;
    let bodyAlpha = this.alpha * this.colourAmount;

    // The first stage remains a quiet warped outline.
    if (this.colourAmount < 0.02) {
      noFill();
      stroke(211, 206, 230, this.alpha * 0.82);
      strokeWeight(2.4);
      drawBlobPath(47, phase, 4.5);
      return;
    }

    // A few fixed glow layers replace the old circular aura.
    if (this.glowAmount > 0.02) {
      noFill();
      for (let layer = 3; layer > 0; layer--) {
        stroke(
          colours[0][0],
          colours[0][1],
          colours[0][2],
          11 * layer * this.glowAmount * this.colourAmount
        );
        strokeWeight(3 + layer * 1.8);
        drawBlobPath(49 + layer * 4, phase + layer * 0.18, 5.5 + layer);
      }
    }

    // Solid asymmetrical body.
    noStroke();
    fill(colours[0][0], colours[0][1], colours[0][2], bodyAlpha * 0.93);
    drawBlobPath(49, phase, 7.5);

    // Offset gel layers create an internal colour drift.
    push();
    translate(-8, -7);
    fill(colours[1][0], colours[1][1], colours[1][2], bodyAlpha * 0.58);
    drawBlobPath(39, phase + 1.1, 6.2);
    pop();

    push();
    translate(9, 8);
    fill(colours[2][0], colours[2][1], colours[2][2], bodyAlpha * 0.45);
    drawBlobPath(34, phase + 2.2, 5.2);
    pop();

    // One imperfect luminous rim keeps the silhouette clear.
    noFill();
    stroke(255, 247, 255, bodyAlpha * 0.76);
    strokeWeight(2.3);
    drawBlobPath(48, phase + 0.22, 7.2);

    // Small fixed highlights make the shape feel translucent, not flat.
    noStroke();
    fill(255, 255, 255, bodyAlpha * 0.48);
    ellipse(-18, -18, 13, 8);
    fill(255, 255, 255, bodyAlpha * 0.25);
    ellipse(20, 18, 9, 6);
  }

  drawSymbol(colour, lineAlpha, fillAlpha, weightValue) {
    if (lineAlpha < 1) return;
    stroke(colour[0], colour[1], colour[2], lineAlpha);
    strokeWeight(weightValue);
    fill(colour[0], colour[1], colour[2], fillAlpha);

    if (this.data.type === "clock") drawClockSymbol();
    else if (this.data.type === "phone") drawPhoneSymbol();
    else if (this.data.type === "file") drawFileSymbol();
    else if (this.data.type === "calendar") drawCalendarSymbol();
    else if (this.data.type === "message") drawMessageSymbol();
    else if (this.data.type === "house") drawHouseSymbol();
    else if (this.data.type === "plant") drawPlantSymbol();
    else if (this.data.type === "star") drawStarSymbol();
    else if (this.data.type === "fish") drawFishSymbol();
    else if (this.data.type === "boat") drawBoatSymbol();
    else if (this.data.type === "moon") drawMoonSymbol();
  }
}

function drawBlobPath(radius, phase, wobbleAmount) {
  let points = [];
  let pointCount = 12;
  let time = frameCount * 0.012;

  for (let i = 0; i < pointCount; i++) {
    let angle = map(i, 0, pointCount, 0, TWO_PI);
    let wobble =
      sin(angle * 3 + phase + time) * wobbleAmount +
      cos(angle * 5 - phase * 0.7 + time * 0.72) * wobbleAmount * 0.42;
    let currentRadius = radius + wobble;
    points.push({
      x: cos(angle) * currentRadius,
      y: sin(angle) * currentRadius
    });
  }

  beginShape();
  curveVertex(points[pointCount - 1].x, points[pointCount - 1].y);
  for (let i = 0; i < pointCount; i++) {
    curveVertex(points[i].x, points[i].y);
  }
  curveVertex(points[0].x, points[0].y);
  curveVertex(points[1].x, points[1].y);
  endShape(CLOSE);
}

function drawSolidIconSymbol(type, palette, alphaValue) {
  let detail = palette[2];
  let detailAlpha = alphaValue * 0.9;

  push();
  strokeCap(ROUND);
  strokeJoin(ROUND);

  if (type === "clock") {
    noFill();
    stroke(255, 255, 255, alphaValue);
    strokeWeight(9);
    line(0, 5, 0, -21);
    line(0, 5, 20, 17);
    noStroke();
    fill(255, 255, 255, alphaValue);
    circle(0, 5, 9);
  } else if (type === "phone") {
    noStroke();
    fill(255, 255, 255, alphaValue);
    rectMode(CENTER);
    rect(0, 0, 35, 58, 8);
    fill(detail[0], detail[1], detail[2], detailAlpha);
    rect(0, -4, 25, 38, 4);
    circle(0, 23, 4);
  } else if (type === "file") {
    noStroke();
    fill(255, 255, 255, alphaValue);
    rectMode(CENTER);
    rect(0, 0, 48, 57, 8);
    stroke(detail[0], detail[1], detail[2], detailAlpha);
    strokeWeight(4.5);
    line(-13, -13, 13, -13);
    line(-13, 0, 13, 0);
    line(-13, 13, 6, 13);
  } else if (type === "calendar") {
    noStroke();
    fill(255, 255, 255, alphaValue);
    rectMode(CENTER);
    rect(0, 3, 58, 51, 8);
    fill(detail[0], detail[1], detail[2], detailAlpha);
    rect(0, -12, 58, 8, 5);
    for (let row = 0; row < 2; row++) {
      for (let column = 0; column < 3; column++) {
        circle(-14 + column * 14, 5 + row * 13, 6);
      }
    }
  } else if (type === "message") {
    noStroke();
    fill(255, 255, 255, alphaValue);
    beginShape();
    vertex(-30, -21); vertex(30, -21); vertex(30, 16);
    vertex(8, 16); vertex(-8, 29); vertex(-8, 16); vertex(-30, 16);
    endShape(CLOSE);
    stroke(detail[0], detail[1], detail[2], detailAlpha);
    strokeWeight(4.5);
    line(-15, -7, 15, -7);
    line(-15, 6, 8, 6);
  } else if (type === "house") {
    noStroke();
    fill(255, 255, 255, alphaValue);
    beginShape();
    vertex(-31, -5); vertex(0, -33); vertex(31, -5);
    vertex(31, 29); vertex(-31, 29);
    endShape(CLOSE);
    fill(detail[0], detail[1], detail[2], detailAlpha);
    rectMode(CENTER);
    rect(0, 15, 13, 28, 3);
  } else if (type === "plant") {
    stroke(255, 255, 255, alphaValue);
    strokeWeight(6);
    line(0, 30, 0, -20);
    noStroke();
    fill(255, 255, 255, alphaValue);
    ellipse(-13, -4, 28, 17);
    ellipse(13, -17, 28, 17);
    arc(0, 31, 50, 27, 0, PI);
  } else if (type === "star") {
    noStroke();
    fill(255, 255, 255, alphaValue);
    beginShape();
    for (let i = 0; i < 10; i++) {
      let angle = -HALF_PI + i * PI / 5;
      let radius = i % 2 === 0 ? 34 : 15;
      vertex(cos(angle) * radius, sin(angle) * radius);
    }
    endShape(CLOSE);
  } else if (type === "fish") {
    noStroke();
    fill(255, 255, 255, alphaValue);
    ellipse(-5, 0, 52, 31);
    triangle(19, 0, 38, -16, 38, 16);
    fill(detail[0], detail[1], detail[2], detailAlpha);
    circle(-15, -3, 5);
  } else if (type === "boat") {
    noStroke();
    fill(255, 255, 255, alphaValue);
    triangle(0, -29, 0, 10, 29, 10);
    beginShape();
    vertex(-32, 18); vertex(32, 18); vertex(21, 31); vertex(-21, 31);
    endShape(CLOSE);
    stroke(detail[0], detail[1], detail[2], detailAlpha);
    strokeWeight(4);
    line(0, -31, 0, 17);
  } else if (type === "moon") {
    noStroke();
    fill(255, 255, 255, alphaValue);
    circle(0, 0, 59);
    fill(detail[0], detail[1], detail[2], detailAlpha);
    circle(15, -5, 49);
  }

  pop();
}

function drawSoftBubble(x, y, size, colours, alphaValue) {
  noStroke();
  fill(colours[0][0], colours[0][1], colours[0][2], alphaValue * 0.55);
  circle(x - size * 0.10, y - size * 0.08, size);
  fill(colours[1][0], colours[1][1], colours[1][2], alphaValue * 0.65);
  circle(x + size * 0.12, y + size * 0.10, size * 0.75);
  fill(255, 255, 255, alphaValue * 0.7);
  circle(x - size * 0.18, y - size * 0.19, size * 0.18);
}

function drawClockSymbol() {
  circle(0, 0, 60);
  line(0, 0, 0, -18);
  line(0, 0, 15, 9);
}

function drawPhoneSymbol() {
  rectMode(CENTER);
  rect(0, 0, 34, 61, 8);
  line(-7, 22, 7, 22);
}

function drawFileSymbol() {
  rectMode(CENTER);
  rect(0, 0, 48, 60, 5);
  line(-13, -13, 13, -13);
  line(-13, 0, 13, 0);
  line(-13, 13, 6, 13);
}

function drawCalendarSymbol() {
  rectMode(CENTER);
  rect(0, 3, 58, 52, 6);
  line(-29, -10, 29, -10);
  line(-16, -30, -16, -19);
  line(16, -30, 16, -19);
  for (let row = 0; row < 2; row++) {
    for (let column = 0; column < 3; column++) {
      circle(-14 + column * 14, 3 + row * 13, 4);
    }
  }
}

function drawMessageSymbol() {
  beginShape();
  vertex(-30, -20); vertex(30, -20); vertex(30, 16);
  vertex(8, 16); vertex(-8, 29); vertex(-8, 16); vertex(-30, 16);
  endShape(CLOSE);
  line(-16, -6, 16, -6);
  line(-16, 6, 8, 6);
}

function drawHouseSymbol() {
  beginShape();
  vertex(-30, -7); vertex(0, -33); vertex(30, -7);
  vertex(30, 29); vertex(-30, 29);
  endShape(CLOSE);
  rectMode(CENTER);
  rect(0, 15, 13, 28, 3);
}

function drawPlantSymbol() {
  line(0, 30, 0, -20);
  ellipse(-13, -4, 25, 14);
  ellipse(13, -17, 25, 14);
  arc(0, 30, 49, 25, 0, PI);
}

function drawStarSymbol() {
  beginShape();
  for (let i = 0; i < 10; i++) {
    let angle = -HALF_PI + i * PI / 5;
    let radius = i % 2 === 0 ? 33 : 14;
    vertex(cos(angle) * radius, sin(angle) * radius);
  }
  endShape(CLOSE);
}

function drawFishSymbol() {
  ellipse(-4, 0, 51, 30);
  triangle(21, 0, 38, -15, 38, 15);
  circle(-15, -3, 3);
}

function drawBoatSymbol() {
  line(0, -31, 0, 18);
  triangle(0, -27, 0, 10, 28, 10);
  beginShape();
  vertex(-32, 18); vertex(32, 18); vertex(21, 31); vertex(-21, 31);
  endShape(CLOSE);
}

function drawMoonSymbol() {
  arc(0, 0, 60, 60, HALF_PI, PI + HALF_PI);
  arc(13, 0, 45, 45, HALF_PI, PI + HALF_PI);
  line(0, -30, 13, -22);
  line(0, 30, 13, 22);
}
