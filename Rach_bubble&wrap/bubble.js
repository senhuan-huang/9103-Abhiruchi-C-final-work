function createBubble(seed, warm) {
  if (seed === undefined) {
    seed = 83;
  }
  if (warm === undefined) {
    warm = false;
  }

  randomSeed(seed);

  let bubble = {
    warm: warm,
    time: 0,
    offset: random(200, 800),
    particles: []
  };

  for (let i = 0; i < 22; i++) {
    let particle = {
      angle: random(TWO_PI),
      radius: random(0.55, 1.1),
      size: random(0.7, 2.3),
      offset: random(20, 400),
      speed: random(0.12, 0.26),
      drift: random(0.14, 0.26)
    };
    bubble.particles.push(particle);
  }

  return bubble;
}

function bubbleContour(bubble, angle, layer) {
  let offset = bubble.offset;
  let z = bubble.time * 0.38 + layer * 0.07;

  let broadNoise = noise(
    offset + Math.cos(angle),
    offset + Math.sin(angle),
    z
  );

  let fineNoise = noise(
    offset + 20 + Math.cos(angle) * 2,
    offset + 20 + Math.sin(angle) * 2,
    z * 0.8
  );

  return (broadNoise - 0.5) * 3.3 + (fineNoise - 0.5) * 0.5;
}

function drawBubble(bubble, x, y, radius, dt) {
  bubble.time += Math.min(Math.max(dt, 0), 0.05);

  let time = bubble.time;
  let r = radius * (1 + 0.055 * Math.sin(time * 1.5));
  let unit = Math.max(0.4, Math.min(1.7, radius / 150));

  push();
  translate(x, y);

  let driftX = Math.sin(time * 0.72) * r * 0.025
    + (noise(bubble.offset, time * 0.3) - 0.5) * r * 0.07;
  let driftY = Math.sin(time * 1.05) * r * 0.045
    + (noise(bubble.offset + 40, time * 0.3) - 0.5) * r * 0.07;

  translate(driftX, driftY);
  rotate(time * 0.18 + 0.08 * Math.sin(time * 0.8));

  for (let layer = 2; layer >= 0; layer--) {
    if (layer === 0) {
      if (bubble.warm) {
        fill(255, 110, 135, 7);
      } else {
        fill(130, 190, 235, 7);
      }
    } else {
      noFill();
    }

    let alpha = 105;
    if (layer === 0) {
      alpha = 220;
    }

    if (bubble.warm) {
      if (layer === 1) {
        stroke(255, 145, 180, alpha);
      } else {
        stroke(255, 110, 140, alpha);
      }
    } else {
      if (layer === 0) {
        alpha = 235;
      } else {
        alpha = 115;
      }

      if (layer === 1) {
        stroke(195, 154, 255, alpha);
      } else {
        stroke(110, 216, 229, alpha);
      }
    }

    if (layer === 0) {
      strokeWeight(1.9 * unit);
    } else {
      strokeWeight(1.05 * unit);
    }

    if (bubble.warm) {
      drawingContext.shadowColor = '#ff718c';
    } else {
      drawingContext.shadowColor = '#72d8e2';
    }
    drawingContext.shadowBlur = 14 * unit;

    beginShape();
    for (let i = 0; i < 180; i++) {
      let angle = i / 180 * TWO_PI;
      let outline = bubbleContour(bubble, angle, layer);
      let pointRadius = r * (1 + 0.17 * outline + layer * 0.04);
      let pointX = Math.cos(angle) * pointRadius;
      let pointY = Math.sin(angle) * pointRadius * 1.22;
      vertex(pointX, pointY);
    }
    endShape(CLOSE);
  }

  noStroke();
  for (let i = 0; i < bubble.particles.length; i++) {
    let particle = bubble.particles[i];
    let z = time * particle.speed;
    let pointX = Math.cos(particle.angle) * r * particle.radius
      + (noise(particle.offset, 7, z) - 0.5) * 2 * r * particle.drift;
    let pointY = Math.sin(particle.angle) * r * particle.radius * 1.22
      + (noise(11, particle.offset, z) - 0.5) * 2 * r * particle.drift * 1.22;

    if (bubble.warm) {
      fill(255, 160, 180, 165);
    } else {
      fill(150, 209, 246, 165);
    }
    circle(pointX, pointY, particle.size * 2 * unit);
  }

  pop();
}