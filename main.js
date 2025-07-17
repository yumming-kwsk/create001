let col_1 = '#8793FF'; // パステルブルー（水色パーツ）
let col_2 = '#E03E74'; // 濃いめピンク（赤み強めではっきり）
let col_3 = '#1FCE9A'; // グリーン
let col_4 = '#FFDD00'; // 鮮やかな黄色（見出し枠）
let col_5 = '#C5A3E6'; // ふんわりラベンダー寄りの紫

let isButtonHovered = false;
let isColorAlt = false;

// ボタンの位置とサイズ（グローバルで記録）
let btnGlobalX = 0;
let btnGlobalY = 0;
let btnW = 0;
let btnH = 0;

//タイマー＋カウントアニメ
let errorTimer, loadTimer;

//メールアニメ
let mailY = 0;  // メールの縦位置
let speed = 1;  // 動くスピード
let maxSlide = 80; // 下に行く最大距離

let canvasW, canvasH;

function setup() {
  if (windowWidth < 768) {
    canvasW = windowWidth;
    canvasH = max(windowHeight * 1.8, 1400);
  } else {
    canvasW = 750;
    canvasH = 1400;
  }
  createCanvas(canvasW, canvasH);
  angleMode(DEGREES);

//タイマー＋カウントアニメ
  errorTimer = makeWindowTimer(5, 20); 
  loadTimer = makeWindowTimer(18, 20);  
}

// function windowResized() {
//   setup();  // 再セットアップでサイズ調整
// }

let bars = [];
let lastMouseMoveFrame = 0;
let activeFrameDuration = 15;
let numBars = 12;

//メインヴィジュアル
let isAlt = false;

// 各パターンに必要な色をまとめる
let colorsA = {
  main: col_1,
  circle: col_4,
  accent: col_3
};

let colorsB = {
  main: '#333333',
  circle: col_4,
  accent: col_5
};


function draw() {
  background('#CDD2FF');
  let size = 50;
  for (let r = 0; r < width/size; r++) {
    for (let c = 0; c < height/size; c++) {
      let x = size*r;
      let y = size*c;
      noFill();
      strokeWeight(1);
      stroke(255);
      rect(x,y,size);
    } 
  }

  drawTwinkleStar(675,70,20);
  drawTwinkleStar(705,110,10);
  drawCloud(150,50,120,35);
  drawCloud(40,80,160,50);
  drawEarth(420,60);

 
  drawWindow(80,120,400,340,'Hello World!',drawMv);
  drawWindow(450,440,190,140,'Heart', drawHearts);  
  drawCloud(600,570,130,35);
  drawSmiley(675,690,80);
  drawTwinkleStar(700,470,15);
  drawTwinkleStar(270,520,25);
  drawTwinkleStar(310,550,15);
  drawwawa(85,520);
  let errorCount = errorTimer();
  for (let i = 0; i < errorCount; i++) {
    drawWindow(170 + i * 12, 600 + i * 12, 380, 120, 'Error', drawError);
  }

  drawMail(580,120+mailY);   


  drawWindow(30,1105,415,90,'Loading...',drawLoad);

  
  drawFolder(580, 300, '★',col_5); 
  drawFrame(460,340,50+mailY,20+mailY/2);


  drawWindow(220,790,500,280,'Music',drawMusic);

 

  drawFolder(600, 1250, '…',col_1); 
  drawwawa(675,1100);

  drawCloud(190,1285,150,45);
  drawEarth(470,1285);
  drawTwinkleStar(520,1135,20);
  drawTwinkleStar(550,1175,10);

  drawMail(90,780+mailY);   
    // アニメーション制御
    mailY += speed;
    if (mailY > maxSlide) {
      mailY = 0;  // 一瞬で戻る
    }
   
  drawSmiley(90,1285,100);

  drawFrame(30,930,60+mailY,90+mailY/2);
 
  
   
}

// 基本のウインドウ
function drawWindow(x,y,w,h,windowText,contentFunction){
  push();
  translate(x,y);
  stroke(33);
  strokeWeight(1);
  fill(255);
  rect(0,0,w,h,5);
  fill(col_1);
  rect(0,0,w,30,5,5,0,0);
  noStroke();
  fill(33);
  textSize(18);
  textAlign(LEFT,BASELINE);
  // textFont("Raleway Dots");
  text(windowText,10,22);
  fill(255);
  stroke(33);
  rect(w-25,5,20,20);
  line(w-20,10,w-10,20);
  line(w-20,20,w-10,10);

  // 📦 中身を表示する関数呼び出し
  if (contentFunction) {
    push();
    translate(10, 40); // 中身の余白分移動
    contentFunction(w - 20, h - 50); // 中身の描画関数にサイズ渡す
    pop();
  }

  pop();
}
// 基本のウインドウここまで

//ハート
function drawHearts(w, h) {
  fill(col_2);
  noStroke();
  let moveS = map(sin(frameCount*3),-1,1,2,2.5);
  drawHeart(w-w/2,h-h/2-4,moveS);
}

//メインヴィジュアル
function drawMv(w, h) {
  let currentColors = isAlt ? colorsB : colorsA;

  fill(currentColors.main);
  rect(0, 0, w, h - 60);
  fill(currentColors.circle);
  circle(w / 2 + 50, 70, 80);

  // 三角
  fill(currentColors.accent);
  beginShape();
  vertex(0, 180);
  vertex(w / 4 + 20, 60);
  vertex(w / 4 * 3, h - 60);
  vertex(0, h - 60);
  endShape(CLOSE);

  beginShape();
  vertex(w / 2, h - 60);
  vertex(w / 5 * 3.8, 140);
  vertex(w, h - 70);
  vertex(w, h - 60);
  endShape(CLOSE);

  // === ENTERボタン ===
  let x = w / 2;
  let y = h - 25;
  btnW = w / 2;
  btnH = 30;


  // ⭐ グローバル座標で記録しておく（この2行を drawWindow の中から渡す値に合わせる！）
btnGlobalX = 80 + 10 + x;
btnGlobalY = 120 + 40 + y;


  let isHover =
    mouseX > btnGlobalX - btnW / 2 &&
    mouseX < btnGlobalX + btnW / 2 &&
    mouseY > btnGlobalY - btnH / 2 &&
    mouseY < btnGlobalY + btnH / 2;

  isButtonHovered = isHover;

  // 描画（hoverでスケール）
  push();
  translate(x, y);
  rectMode(CENTER);
  if (isHover) scale(1.1);
  fill(210);
  rect(0, 0, btnW, btnH);
  fill(33);
  noStroke();
  textAlign(CENTER, CENTER);
  text('ENTER', 0, 0);
  pop();
}

function mousePressed() {
  isAlt = !isAlt;  // クリックで切り替え
}


//エラー画面
function drawError(w, h) {
  push();
  translate(w/2, h/2+12);
  textAlign(CENTER, CENTER);
  fill(33);
  noStroke();
  textSize(28);
  text('Error...', 24, -14);
  fill(col_2);
  circle(-50,-14,40);
  fill(255);
  textSize(28);
  text('!', -50, -14);
  pop();
}

//ダウンロード
function drawLoad(w,h){
  fill(col_3);
  noStroke();
  let infoCount = loadTimer();
  for (let i = 0; i < infoCount; i++) {
    rect(22*i, 4, 18, h*0.8);
  }
}

//MUSIC
function drawMusic(w, h) {
  fill(col_5);
  rect(0, 0, 120, 120);
  fill(255);
  rect(130, 0, w - 140, 120);
 noStroke();
 textAlign(CENTER,CENTER);
 textSize(64);
 fill(255);
 text('♪',60,60);

  // === 音量バーエリア（ランダム変動）===
 
  let numBars = 12;
  let barWidth = (w - 140 - 20) / numBars;
  let spacing = 4;
  let barActualWidth = barWidth - spacing;
  let t = frameCount * 0.08;

  let isActive = frameCount - lastMouseMoveFrame < activeFrameDuration;

  // 初回のみ bars を初期化
  if (bars.length !== numBars) {
    for (let i = 0; i < numBars; i++) {
      bars[i] = 10;
    }
  }
  
  for (let i = 0; i < numBars; i++) {
    if (isActive) {
      // 動いてる間だけ高さを更新
      let offset = frameCount * 0.1 + i * 2;
      let n = noise(offset);
      bars[i] = map(n, 0, 1, 10, 100);
    }
  
    let barHeight = bars[i];
    let x = 140 + i * barWidth;
    let y = 110 - barHeight;
  
    noStroke();
    fill(col_5);
    rect(x, y, barActualWidth, barHeight);
  }
  

  // === ボタン群 ===
  push();
  translate(w / 2, 160);
  noStroke();
  fill(col_2);
  triangle(40, 0, 20, -12, 20, 12);

  fill(155);
  triangle(90, 0, 75, -12, 75, 12);
  triangle(105, 0, 90, -12, 90, 12);

  rect(-20, -12, 10, 25);
  rect(-35, -12, 10, 25);

  triangle(-90, 0, -75, -12, -75, 12);
  triangle(-105, 0, -90, -12, -90, 12);

  triangle(155, 0, 140, -12, 140, 12);
  rect(155, -12, 10, 25);
  triangle(-155, 0, -140, -12, -140, 12);
  rect(-165, -12, 10, 25);
  pop();

  // === スライダー ===
  fill(220);
  stroke(33);
  rect(10, h - 20, w - 20, 5, 5);
  fill(col_1);
  let mx = mouseX - 220 - 10; // translate(80) + 余白(10)
  let x = constrain(mx, 0, w - 20);
  circle(x + 10, h - 18, 18); // +10して戻す
}

function mouseMoved() {
  lastMouseMoveFrame = frameCount;
}
  
function touchMoved() {
  lastMouseMoveFrame = frameCount;
  // return false;
}

//ハート(元図形)
function drawHeart(ox, oy, size) {
  push();
  translate(ox, oy);

  beginShape();
  for (let theta = 0; theta < 360; theta++) {
  let x = size * (16 * sin(theta) * sin(theta) * sin(theta));
  let y = (-1) * size * (13 * cos(theta) - 5 * cos(2 * theta) -
    2 * cos(3 * theta) - cos(4 * theta));

  vertex(x, y);
  }
  endShape(CLOSE);

  pop();
}

//タイマーとカウントの関数
function makeWindowTimer(max, speed) {
  let interval = speed;
  let lastFrame = 0;
  let count = 0;

  return function () {
    if (frameCount - lastFrame > interval) {
      count++;
      if (count > max) {
        count = 1;
      }
      lastFrame = frameCount;
    }
    return count;
  };
}


//フォルダアイコン
function drawFolder(x, y,foldericon,folderCol) {
  push();
  translate(x,y);
    stroke(33);
    strokeWeight(2.5);
    rect(0,0, 120, 80,5);
    rect(0,-16,50,40,5);
    fill(folderCol);
    noStroke();
    rect(0,0, 120, 80,5);
    rect(0,-16.3,50,40,5);
    // stroke(33);
    fill(255);
    textAlign(CENTER,CENTER);
    textSize(48);
    text(foldericon,60,40);
    pop();
 } 


 function drawwawa(x,y){
  push();
  translate(x,y-5);
  // strokeWeight(2);
  stroke(33);
  for (let i = 0; i < 5; i++) {
    let movec = map(sin(frameCount*2),-1,1,5,20);
    ellipse(0,i*movec+20,90,30);
  }
  pop();
 }

 function drawCloud(x,y,w,h){
  push();
  translate(x,y);
  fill(255);
  stroke(33);
  strokeWeight(2);
  rect(0,0,w,h,35);
  circle(w/3.5,h/10,w/3);
  circle(w/2,h-h*1.3,w/3);
  circle(w/1.35,h-h*1.1,w/3.5);
  fill(255);
  noStroke();
  rect(0,0,w,h,35);
  circle(w/3.5,h/10,w/3);
  circle(w/2,h-h*1.3,w/3);
  circle(w/1.35,h-h*1.1,w/3.5);
  pop();
 }

 function drawEarth(x,y){
  push();
   translate(x,y);
   noFill();
   stroke(33);
   ellipse(0,0,160,90);
   arc(0,-45,200,50,16,164);
   arc(0,45,200,50,-164,-16);
   ellipse(0,0,130,90);
   ellipse(0,0,90,90);
   ellipse(0,0,40,90);
   line(-80,0,80,0);
  pop();
 }

  // アステロイド曲線（菱形）
  function drawTwinkleStar(x, y, r) {
		push();
		translate(x, y);
	  stroke(33);
    fill(col_4);
    let moveT = map(sin(frameCount*2),-1,1,r*0.5,r);
		beginShape();
		for (let theta = 0; theta < 360; theta++) {
		  vertex(moveT * pow(cos(theta), 3), moveT * 1.4 * pow(sin(theta), 3));
		}
		endShape(CLOSE);
	  
		pop();
	  }

    function drawMail(x,y){
      push();
      translate(x,y);
      let w = 90;
      let h = 60;
      rectMode(CENTER);
      fill(col_2);
      noStroke();
      rect(0,-110,40,10);
      rect(0,-80,40,40);
      triangle(0,-40,-30,-65,30,-65);
      fill(255);
      stroke(33);
      strokeWeight(1.5);
      rect(0,0,w,h,5);
      noFill();
      line(-w/2+2,-28,-4,5);
      line(w/2-2,-28,4,5);
      arc(0,0,18,12,44,124);
      pop();    
    }

    function drawSmiley(x, y, size) {
      push();
      translate(x, y);
      // noStroke();
      stroke(33);
      
      // 顔
      fill(col_4);
      ellipse(0, 0, size, size);
      
      // 目
      fill(0);
      let eyeOffsetX = size * 0.18;
      let eyeOffsetY = size * -0.15;
      let eyeSize = size * 0.1;
      ellipse(-eyeOffsetX, eyeOffsetY, eyeSize, eyeSize*1.4);
      ellipse(eyeOffsetX, eyeOffsetY, eyeSize, eyeSize*1.4);
      
      // 口（DEGREES使用）
      noFill();
      stroke(33);
      strokeWeight(size * 0.01);
      let mouthW = size * 0.5;
      let mouthH = size * 0.4;
      arc(0, size * 0.05, mouthW, mouthH, 20, 160); // ← 0〜180度でニッコリ口
    
      pop();
    }
    
    function drawFrame(x,y,w,h){
      push();
      translate(x,y);
      noFill();
      stroke(33);
      rect(0,0,w,h);
      noStroke();
      fill(33);
      circle(0,0,8);
      circle(w,0,8);
      circle(0,h,8);
      circle(w,h,8);
      beginShape();
      fill(255);
      stroke(33);
      strokeWeight(1.5);
      vertex(w+2,h+2);
      vertex(w+22,h+10);
      vertex(w+13,h+13);
      vertex(w+10,h+22);
      // vertex(w+30,h+20);
      vertex(w,h);
      endShape(CLOSE);
      pop();
    }