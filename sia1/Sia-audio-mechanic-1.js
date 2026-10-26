let song;
let fft;
let button;

let particles = [];

function preload() {
  // Load the audio file
  song = loadSound("assets/music1.wav");
}

function setup() {
  createCanvas(900, 650);

  // Use degrees for drawing the circular waveform
  angleMode(DEGREES);

  // Use HSB for easier colour changes
  colorMode(HSB, 255);

  // Create the FFT analyser
  fft = new p5.FFT(0.8, 256);

  // Set the song as the FFT input
  fft.setInput(song);

  // Create the play / pause button
  button = createButton("Play/Pause");
  button.position(380, 600);
  button.size(140, 40);
  button.style("font-size", "16px");
  button.mousePressed(playPause);
}

function draw() {
  background(15, 14, 35);

  // Analyse the frequency spectrum
  fft.analyze();

  // Get the current waveform
  let wave = fft.waveform();

  // Get the current audio energy
  let energy = fft.getEnergy(20, 200);

  // Map audio energy to colour
  let circleHue = map(energy, 0, 255, 145, 225);

  // Map audio energy to brightness
  let circleBrightness = map(energy, 0, 255, 200, 255);

  // Move the origin to the centre of the canvas
  translate(width / 2, height / 2 - 20);

  // Draw the circular audio waveform
  drawAudioCircle(wave, circleHue, circleBrightness);

  // Add particles while the music is playing
  if (song.isPlaying() && particles.length < 180) {
    particles.push(new Particle(circleHue));
  }

  // Update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update(energy);
    particles[i].show();

    // Remove particles after they leave the canvas
    if (particles[i].edges()) {
      particles.splice(i, 1);
    }
  }
}

function drawAudioCircle(wave, circleHue, circleBrightness) {
  noFill();

  stroke(circleHue, 170, circleBrightness);
  strokeWeight(3);

  // Draw two mirrored halves of the waveform
  for (let side = -1; side <= 1; side += 2) {
    beginShape();

    for (let i = 0; i <= 180; i += 0.5) {
      // Match the angle with a waveform value
      let index = floor(map(i, 0, 180, 0, wave.length - 1));

      // Use waveform amplitude to change the radius
      let radius = map(wave[index], -1, 1, 175, 285);

      // Convert radius and angle into x and y positions
      let x = radius * sin(i) * side;
      let y = radius * cos(i);

      vertex(x, y);
    }

    endShape();
  }
}

function playPause() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}

class Particle {

  constructor(circleHue) {
    // Start from a random direction around the circle
    this.position = p5.Vector.random2D().mult(random(185, 215));

    // Start with a small outward velocity
    this.velocity = this.position.copy();
    this.velocity.setMag(random(0.3, 1));

    // Acceleration pushes the particle away from the centre
    this.acceleration = this.position.copy();
    this.acceleration.setMag(random(0.002, 0.008));

    // Random particle size
    this.size = random(2, 5);

    // Give each particle a colour close to the circle colour
    this.hue = circleHue + random(-12, 12);

    // Particle transparency
    this.alpha = random(120, 220);
  }

  update(energy) {
    // Update velocity and position
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    // Stronger audio makes particles move faster
    if (energy > 170) {
      this.position.add(this.velocity);
    }

    if (energy > 210) {
      this.position.add(this.velocity);
    }

    // Slowly fade particles out
    this.alpha -= 0.8;
  }

  show() {
    noStroke();

    fill(
      this.hue,
      150,
      255,
      this.alpha
    );

    ellipse(
      this.position.x,
      this.position.y,
      this.size
    );
  }

  edges() {
    if (
      this.position.x < -width / 2 ||
      this.position.x > width / 2 ||
      this.position.y < -height / 2 ||
      this.position.y > height / 2 ||
      this.alpha <= 0
    ) {
      return true;
    }

    return false;
  }
}