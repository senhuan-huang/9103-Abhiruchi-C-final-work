//我这边的代码里设定的-1是没有点击或开启任何交互，0是点左边的，1是点右边的
let mousehover=-1;
//当前鼠标悬浮没有在任何人身上
let clicking=-1;
//当前鼠标点击没有在任何人身上
let openmind = false;
//某个人没有打开内心，出现内容
let audioopen=-1;
//管理是否有音乐，我的预想是点击任务角色出现音乐，所以-1是没有点击，0是左边，1是右边
//这块地方我只设定了一下音乐的存在，function要自己写一下，名字就是audioopen
let characterAneutral;
let characterAcolour;
let characterBneutral;
let characterBcolour;
let background1;
//暂定以后用于贴图片（image文件夹）
let leftimagetransparency=0;
let rightimagetransparency=0;
let fadespeed=5;
//暂定以后用于控制图片透明度

function preload(){
  background1 = loadImage("images/background1.png");
  characterAneutral = loadImage("images/characterAneutral.png");
  characterAcolour = loadImage("images/characterAcolour.png");
  characterBneutral = loadImage("images/characterBneutral.png");
  characterBcolour = loadImage("images/characterBcolour.png");
}
function setup() {
  createCanvas(1220, 600);
}

function draw() {
  background(20);
  changeimagetransparency();
  imageMode(CORNER);
  tint(255,100);
  image(background1,0,0,1220,600);

  imageMode(CENTER);
  tint(255,255);
  image(characterAneutral,350,300,350,550);
  image(characterBneutral,870,300,350,550);

  tint(255,leftimagetransparency);
  image(characterAcolour,350,300,350,550);
  tint(255,rightimagetransparency);
  image(characterBcolour,870,300,350,550);
  
  //这部分是借time-base的条件代码，要完成openmind=true和不点击空白处时，time-bace的代码启动
  if (openmind === true||clicking !== -1){
}
}


//鼠标悬浮为0时，在左边的人身上,为1时，在右边的人身上
function mouseMoved() {
  mousehover = -1;
  if (mouseX > 240 && mouseX <460 &&
    mouseY >50 && mouseY <550)
    {
  mousehover = 0;
    }
  else if (mouseX >740 && mouseX <960 &&
    mouseY > 50 && mouseY <550)
    {
      mousehover = 1;
    }
    //下面这一块是鼠标点击后，但移到空白处，交互效果关掉，包括光圈和渐变色和物体冒出
  if (clicking !== -1 && mousehover !== clicking) {
    clicking = -1;
    openmind = false;
  }
}

//控制图片透明度变化的function
function changeimagetransparency() {
  if (mousehover === 0){
    leftimagetransparency += fadespeed;
  }else{leftimagetransparency -= fadespeed;}
  if (mousehover === 1){
    rightimagetransparency += fadespeed;
  }else{rightimagetransparency -= fadespeed;}
leftimagetransparency = constrain(leftimagetransparency,0,255);
rightimagetransparency = constrain(rightimagetransparency,0,255);
}

//鼠标点击-openmind，连接time-base的部分，openmind是开关
function mousePressed(){
  if (mousehover === 0 || mousehover === 1){
    clicking = mousehover;
    openmind = true;
  }
}