let bubbleTexture;

function createBubbleTexture() {
  // Build the transparent texture once.
  bubbleTexture = createGraphics(900, 900);
  bubbleTexture.pixelDensity(1);
  bubbleTexture.loadPixels();

  randomSeed(41);
  noiseSeed(41);

  for (let y = 0; y < 900; y++) {
    for (let x = 0; x < 900; x++) {
      let dx = (x - 450) / 430;
      let dy = (y - 450) / 430;
      let distance = sqrt(dx * dx + dy * dy);

      if (distance <= 1) {
        // A soft light ring with Perlin noise for cloudy variation.
        let ring = exp(-pow((distance - 0.87) / 0.12, 2));
        let cloud = noise(x * 0.012, y * 0.012);
        let light = 0.94 - dx * 0.12 - dy * 0.10;
        let frost = constrain((distance - 0.92) / 0.08, 0, 1);
        let grain = random(-1, 1);

        let alpha = 116 + 112 * ring * light;
        alpha += (cloud - 0.5) * 16;
        alpha += grain * (2 + frost * 110);

        // Fixed random grain gives the edge a frosted texture.
        if (distance > 0.95 && random() < frost * 0.28) {
          alpha *= 0.25;
        }

        alpha *= constrain((1 - distance) * 150, 0, 1);

        // Each pixel stores red, green, blue and alpha.
        let index = (x + y * 900) * 4;
        bubbleTexture.pixels[index] = 212 + ring * 12;
        bubbleTexture.pixels[index + 1] = 217 + ring * 16;
        bubbleTexture.pixels[index + 2] = 225 + ring * 20;
        bubbleTexture.pixels[index + 3] = constrain(alpha, 0, 245);
      }
    }
  }

  bubbleTexture.updatePixels();
}

function drawBubble(x, y, size) {
  // Time-based Perlin noise creates smooth, irregular breathing.
  let breath = 1 + (noise(10, bubbleTime * breathingSpeed) - 0.5) * 2 * breathingAmount;
  let widthChange = 1 + (noise(30, bubbleTime * 0.37) - 0.5) * 0.016;
  let heightChange = 1 + (noise(50, bubbleTime * 0.41) - 0.5) * 0.016;

  push();
  translate(x, y);
  imageMode(CENTER);
  tint(255, bubbleOpacity);
  image(bubbleTexture, 0, 0, size * breath * widthChange, size * breath * heightChange);
  pop();
}
