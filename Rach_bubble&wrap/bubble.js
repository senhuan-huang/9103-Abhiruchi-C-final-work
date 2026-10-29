function createBubble(seed, red, green, blue) {
  randomSeed(seed);

  let bubble = {
    red: red,
    green: green,
    blue: blue,
    offset: random(20, 800),
    step: 0,
    edge: [],
    edgeX: [],
    edgeY: [],
    grains: []
  };

  // Generate fixed random grains once, so they do not flicker.
  for (let i = 0; i < 2200; i++) {
    let grain = {
      angle: random(TWO_PI),
      distance: random(0.93, 1.015),
      size: random(0.6, 1.8),
      alpha: random(45, 180)
    };
    bubble.grains.push(grain);
  }

  return bubble;
}

function updateBubble(bubble, speed, amount) {
  // Advance through Perlin noise to move the outline smoothly.
  bubble.step += min(deltaTime / 1000, 0.05) * speed;

  for (let i = 0; i < 96; i++) {
    let angle = i / 96 * TWO_PI;

    // Sample a closed circle in the noise field to avoid a seam.
    let value = noise(
      bubble.offset + cos(angle) * 1.3,
      bubble.offset + sin(angle) * 1.3,
      bubble.step
    );

    bubble.edge[i] = 1 + (value - 0.5) * amount;
    bubble.edgeX[i] = cos(angle) * bubble.edge[i];
    bubble.edgeY[i] = sin(angle) * bubble.edge[i];
  }
}

function drawOutline(bubble, radius, scale) {
  beginShape();

  // Reuse the same outline for every soft light layer.
  for (let i = 0; i < 96; i++) {
    vertex(bubble.edgeX[i] * radius * scale, bubble.edgeY[i] * radius * scale);
  }

  endShape(CLOSE);
}

function drawBubble(bubble, x, y, size) {
  let radius = size / 2;

  push();
  translate(x, y);

  // A translucent white interior.
  noStroke();
  fill(235, 237, 242, 105);
  drawOutline(bubble, radius, 1);

  // Closely spaced outlines make a soft frosted rim.
  noFill();
  strokeWeight(radius * 0.048);

  for (let layer = 0; layer < 64; layer++) {
    let scale = 0.61 + layer * 0.006;
    let glow = exp(-pow((scale - 0.87) / 0.105, 2));
    stroke(bubble.red, bubble.green, bubble.blue, glow * 38);
    drawOutline(bubble, radius, scale);
  }

  // Random grains follow the same moving outline.
  noStroke();
  for (let i = 0; i < bubble.grains.length; i++) {
    let grain = bubble.grains[i];
    let position = grain.angle / TWO_PI * 96;
    let index = floor(position);
    let next = (index + 1) % 96;
    let edge = lerp(bubble.edge[index], bubble.edge[next], position - index);
    let r = radius * edge * grain.distance;
    let dotSize = grain.size * size / 430;

    fill(bubble.red, bubble.green, bubble.blue, grain.alpha);
    circle(cos(grain.angle) * r, sin(grain.angle) * r, dotSize);
  }

  pop();
}
