

let roundbutton = document.getElementById('roundbutton');

roundbutton.addEventListener('click', roundbuttonClicked);

function roundbuttonClicked(){
  let rectElement = document.getElementById('rect');
  rectElement.style.borderRadius = '50px';

}

let i =  0;
i = i + 2;
alert(i);

console.log('My javascript file has loaded');

function say(what) {
  //alert(what);

//step 1: find the element we want to manipulate
  let elem = document.getElementById('lyrics');

  //step 2: create a new element to be added
  let newElem = document.createElement('p');

  //step 2.5: change the element't content
  newElem.innerHTML = what;

  //step: 3: add the new element to our lyrics
  elem.appendChild(newElem);

  elem = document.getElementById('heading');
  //let rectElement = document.getElementById('rect');



  if (what == 'cww'){
    elem.style.backgroundColor = 'red';
    rectElement.style.borderRadius = '0px';
  } else {
    elem.style.backgroundColor = 'blue';
    //rectElement.style.borderRadius = '50px';
  }

}



/*
let slider;


function setup() {
  createCanvas(400, 400);
  slider = document.getElementById('opacity');
}

function draw() {
  background(225);
  let opacity = int(slider.value);
  push();
  noStroke();
  ellipse(200, 400, 500, opacity);
  pop();
  drawMonster(width / 2, height / 2);
}

function drawMonster(x, y) {
  let a = 0;
  let b = -70;
  push();
  translate(x, y);
  strokeWeight(1.5);
  drawHead(0, 0);
  drawHat(0, -118, 3 * sin(frameCount * 0.08));
  drawEye(20, -90);
  drawEye(-20, -90);
  drawMouth(0, -68);
  rotate(a);
  let sinValue = sin(frameCount * 0.05);
  let angle = map(sinValue, 1, 2, 0, 100);
  drawArm(57, 31, true, radians(angle));
  drawArm(-57, 31, false, radians(angle));
  drawBody(0, 62);
  pop();
}

function drawHead(x, y) {
  push();
  translate(x, y);
  fill(255,255,255);
  noStroke();
  ellipse(0, -80, 110, 108);
  pop();
}

function drawHat(x, y, b) {
  push();
  translate(x, y);
  fill(0, 0, 0);
  noStroke();
  triangle(40, 0, 0, b - 70, -40, 0);
  ellipse(0, b, 200, 20);
  pop();
}

function drawArm(x, y, mirror, a) {
  push();
  translate(x, y);
  rotate(a);
  if (mirror == true) {
    scale(-1, 1);
  }

  strokeWeight(3.5);
  line(0, 0, -100, -80);

  pop();
}

function drawEye(x, y) {
  push();
  translate(x, y);
  fill(0, 0, 0);
  ellipse(0, 0, 10, 10);
  pop();
}

function drawMouth(x, y) {
  push();
  translate(x, y);
  fill(255, 100, 100);
  noStroke();
  arc(0, 0, 50, 50, 0, PI);
  pop();
}

function drawBody(x, y) {
  push();
  translate(x, y);
  noStroke();
  ellipse(0, 0, 180, 180);
  fill("black");
  ellipse(0, 0, 12, 12);
  ellipse(0, 40, 12, 12);
  ellipse(0, -40, 12, 12);
}
*/
