var cols, rows;
var scl = 100;
var w = 6000;
var h = 5000;

var flying = 0;
var smoothness = 200;

var terrain = [];

var cam;

function setup() {
  createCanvas(windowWidth, windowHeight-25, WEBGL);
  camera(0, -150, (height/1)/tan(PI*30 / 180), 0, -180, 0, 0, 1, 0);
  cols = w / scl;
  rows = h/ scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
  stroke(0);
  strokeWeight(2)
  fill(0, 128, 0, 150);
}

function draw() {
	var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -smoothness, smoothness);
      xoff += 0.2;
    }
    yoff += 0.2;
  }


  background(0);
  rotateX(PI/3);
  translate(0, 50)
  translate(-w/2, -h/2);
  for (var y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
    }
    endShape();
  }

  if (smoothness < 0) {
  	smoothness = 0;
  }

  flying -= 0.1;
}