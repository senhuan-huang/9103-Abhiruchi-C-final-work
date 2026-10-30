//my code setting -1 is close，0 is left，1 is right
let mousehover=-1;
//when mouse not hover on any character
let clicking=-1;
//manage whether music, so -1 is not，0 is left，1 is right
let audioopen=-1;
//setting name of character and background
let C1;
let C2;
let CH1;
let CH2;
let backgroundImage;
//setting for funciton of transparency
let leftimagetransparency=0;
let rightimagetransparency=0;
let fadespeed=5;
//setting another requirement that determine whether 
//the mouse has ever hovered over the character.
let leftHoverOnce = false;
let rightHoverOnce = false;

//preload images
function preloadInput(){
  backgroundImage = loadImage("assets/BGfinal.png");
  C1 = loadImage("images/C1.png");
  C2 = loadImage("images/C2.png");
  CH1 = loadImage("images/CH1.png");
  CH2 = loadImage("images/CH2.png");
}


function drawInput() {
  background(20);
  changeimagetransparency();

  //background positioning Method
  imageMode(CORNER);
  tint(255,255);
  image(backgroundImage, 0, 0, 1220, 600);

  //resetting characters positioning Method
  imageMode(CENTER);
  tint(255,255);
  image(C1, 480, 300, 255, 400);
  image(CH1, 725, 300, 255, 400);

  //resetting two layer characters transparency
  tint(255, leftimagetransparency);
  image(C2, 480, 300, 255, 400);
  tint(255, rightimagetransparency);
  image(CH2, 725, 300, 255, 400);
}

//setting where are mouse hover(rectangle)
function mouseMovedInput() {
  mousehover = -1;
  if (mouseX > 405 && mouseX <555 &&
    mouseY >100 && mouseY <500)
    {
  mousehover = 0;
    }
  else if (mouseX >650 && mouseX <800 &&
    mouseY > 100 && mouseY <500)
    {
      mousehover = 1;
    }
}

//senhuan huang(input)
//control color character layer transparency change
function changeimagetransparency() {
  //4s finishing 1 time changing(50%-100%)
  const gradient=(sin(millis()*TWO_PI/4000)+1)/2;
  const fadeAlpha=255*(0.5+0.5*gradient);
  //mouse first time over the character--becoming colorful(0-100%)
  if (mousehover === 0){
    leftHoverOnce=true;
    leftimagetransparency=min(255,leftimagetransparency+fadespeed);
  }
  //mouse already hover character once--HoverOnce,fadeAlpha
  //is continuing change depend on gradient(sin)
  else if (leftHoverOnce){ 
    leftimagetransparency=lerp(leftimagetransparency,fadeAlpha,0.1);
  }
  if (mousehover === 1){
    rightHoverOnce=true;
    rightimagetransparency=min(255,rightimagetransparency+fadespeed);
  }else if (rightHoverOnce){ 
    rightimagetransparency=lerp(rightimagetransparency,fadeAlpha,0.1);
  }
}

