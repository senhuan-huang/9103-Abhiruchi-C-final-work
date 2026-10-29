let song;
let img
let fft;
let button
let particles = [];

function preload() {
  // Load the audio file
  song = loadSound("assets/music1.wav");
  img = loadImage("assets/BG1.png")
}

function setup() {
  createCanvas(900, 650);
  
  // Use degrees for drawing the circle
  angleMode(DEGREES);
  imageMode(CENTER)
  rectMode(CENTER)

  // Create the FFT analyser
  fft = new p5.FFT(0.3);
  fft.setInput(song);

  img.filter(BLUR, 1)

  // Create the play/pause button
  button = createButton("Play/Pause");
  button.position(380, 600);
  button.size(140, 40);
  button.style("font-size", "16px");
  button.mousePressed(playPause);
}

function draw() {
  background(0);
  
  // Move the origin to the centre
  translate(width / 2, height / 2 - 20);

  fft.analyze()
  amplitude = fft.getEnergy(20, 200);

  push()
  if (amplitude > 200){
    rotate(random(-0.15,0.15))
  }
  
  image(img,0,0,width + 100,height + 100)
  pop()
  
  let colorAmount = map(amplitude,60,180,0,1)
  colorAmount = constrain(colorAmount,0,1)

  let cyan = color(53,179,199)
  let bluePurple = color(90,130,220)
  let purple = color(146,120,232)
  let pink = color(231,149,197)

  let lineColor

  if(colorAmount < 0.33){
  lineColor = lerpColor(cyan,bluePurple,colorAmount / 0.33)
  }else if(colorAmount < 0.66){
  lineColor = lerpColor(bluePurple,purple,(colorAmount - 0.33) / 0.33)
  }else{
  lineColor = lerpColor(purple,pink,(colorAmount - 0.66) / 0.34)
  }

  stroke(lineColor)
  strokeWeight(2)
  noFill()


  // Get waveform data
  let wave = fft.waveform();

  // Draw two mirrored halves to make a full circle
  for (let t = -1; t <= 1; t += 2) {
    beginShape();

    for (let i = 0; i <= 180; i++) {
      let index = floor(map(i, 0, 180, 0, wave.length - 1));

      let r = map(wave[index], -1, 1, 190, 250);

      let x = r * sin(i) * t;
      let y = r * cos(i);

      vertex(x, y);
    }

    endShape();
  }


// Inner circle colour changes from yellow to red
let innerColorAmount = map(amplitude,60,180,0,1)
innerColorAmount = constrain(innerColorAmount,0,1)

let yellow = color(255,220,100)
let red = color(235,90,90)

let innerColor = lerpColor(yellow,red,innerColorAmount)

stroke(innerColor)
strokeWeight(2)
noFill()

// Draw the inner waveform circle
for(let t = -1; t <= 1; t += 2){
  beginShape()

  for(let i = 0; i <= 180; i++){
    let index = floor(map(i,0,180,0,wave.length - 1))
    let r = map(wave[index],-1,1,85,125)

    let x = r * sin(i) * t
    let y = r * cos(i)

    vertex(x,y)
  }

  endShape()
 }
 
 
  //Add particles
  let p = new Particle()
  particles.push(p)
  
  for(let i = particles.length -1; i >= 0; i--){
    if(!particles[i].edges()){
      particles[i].show()
      particles[i].update(amplitude > 130)
    }else{
      particles.splice(i, 1);
    }
  }
}


function playPause() {
  if (song.isPlaying()) {
    song.pause();
    noLoop();
  } else {
    song.play();
    loop();
  }
}

class Particle {
  constructor(){
    this.pos =p5.Vector.random2D().mult(250)
    this.vel = createVector(0,0)
    this.acc = this.pos.copy().mult(random(0.0001,0.00001))
    
    this.w = random(3,5)
    
    this.color = [random(80,255),random(50,140),random(190,255)];
  }
  update(condition){
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    if (condition){
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
    }
  }
  
  //check if the particle is out of the canvas
  edges(){
    if(this.pos.x < -width/2 || this.pos.x > width/2 || this.pos.y < -height/2 || this.pos.y > height/2){
      return true
    }else{
      return false
    }
  }


  show(){
    noStroke();
    fill(this.color);
    ellipse(this.pos.x,this.pos.y,this.w);
  }
}