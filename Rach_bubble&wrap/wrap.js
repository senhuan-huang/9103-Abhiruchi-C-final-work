let wrapTurns = 2.3; 
let wrapTime = 0;     
let wrapOffset = 0;    
let wrapPoints = [];   
let wrapSamples = [];  

function setupWrap(seed, turns) {
  if (seed === undefined) {
    seed = 41;
  }
  if (turns === undefined) {
    turns = 3.4;
  }

  wrapTurns = turns;
  wrapTime = 0;
  wrapPoints = [];
  wrapSamples = [];

  randomSeed(seed);
  noiseSeed(seed);
  noiseDetail(3, 0.5);
  wrapOffset = random(10, 900);

  for (let u = 0; u <= 1; u += random(0.0032, 0.0054)) {
    if (random() < 0.08) {
      continue;
    }

    let point = {
      u: u,
      size: random(1.5, 3.1),
      bright: random(0.88, 1),
      phase: random(0, 100),
      large: random() < 0.045
    };
    wrapPoints.push(point);
  }
}

function updateWrap(dt, cx, cy, bodyHeight, radius, rotationSpeed, noiseAmount) {
  if (rotationSpeed === undefined) {
    rotationSpeed = 0.19;
  }
  if (noiseAmount === undefined) {
    noiseAmount = 0.075;
  }

  let frameTime = Math.min(Math.max(dt, 0), 0.05);
  wrapTime += frameTime;

  let breathNoise = noise(wrapOffset, wrapTime * 0.15);
  let breath = 0.97 + 0.075 * breathNoise;
  let light = 0.88 + 0.12 * noise(wrapOffset + 53, wrapTime * 0.22);
  let scale = bodyHeight / 490;

  wrapSamples = [];
  for (let i = 0; i < wrapPoints.length; i++) {
    let point = wrapPoints[i];

    let theta = point.u * wrapTurns * TWO_PI + wrapTime * rotationSpeed;

    let profile = 0.58 + 0.43 * Math.sin(Math.PI * point.u)
      + 0.06 * Math.sin(3 * Math.PI * point.u);

    let deformation = (noise(wrapOffset + point.u * 3.4, wrapTime * 0.18) - 0.5)
      * 2 * noiseAmount;
    let r = radius * profile * breath * (1 + deformation);

    let x = Math.cos(theta) * r;
    let z = Math.sin(theta) * r;

    let verticalNoise = (noise(wrapOffset + 100 + point.u * 3, wrapTime * 0.14) - 0.5)
      * bodyHeight * 0.025;
    let y = (point.u - 0.5) * bodyHeight + z * 0.25 + verticalNoise;

    let depth = (Math.sin(theta) + 1) / 2;
    let localLight = 0.9 + 0.1 * noise(point.phase, wrapTime * 0.2);

    let endFade = Math.min(1, point.u / 0.035, (1 - point.u) / 0.035);

    let largeScale = 1;
    if (point.large) {
      largeScale = 1.65;
    }

    let size = point.size * 1.35 * largeScale * scale * (0.8 + 0.3 * depth);
    let alpha = 255 * light * point.bright * localLight
      * (0.72 + 0.28 * depth) * Math.max(0, endFade);

    let sample = {
      x: cx + x,
      y: cy + y,
      z: z,
      size: size,
      alpha: alpha
    };
    wrapSamples.push(sample);
  }

  wrapSamples.sort(compareWrapDepth);
}

function compareWrapDepth(a, b) {
  return a.z - b.z;
}

function drawWrapLayer(side) {
  push();
  noStroke();

  for (let i = 0; i < wrapSamples.length; i++) {
    let point = wrapSamples[i];

    if (side === 'back' && point.z >= 0) {
      continue;
    }
    if (side === 'front' && point.z < 0) {
      continue;
    }

    fill(255, 55, 85, point.alpha * 0.14);
    circle(point.x, point.y, point.size * 5.6);

    fill(255, 72, 98, point.alpha * 0.32);
    circle(point.x, point.y, point.size * 3);

    fill(255, 92, 112, point.alpha);
    circle(point.x, point.y, point.size);

    if (point.size > 3.2) {
      fill(255, 195, 183, point.alpha * 0.85);
      circle(point.x, point.y, point.size * 0.4);
    }
  }

  pop();
}