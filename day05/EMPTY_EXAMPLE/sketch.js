let ballX = 0;
let ballY = 150;
let ballR = 255;
let ballG = 255;
let ballB = 255;

let song;

function preload() {
    song = loadSound("../sounds/boing.mp3");
}

function setup() {
    createCanvas(600, 300);
    background(0);
    noStroke();

}

function mousePressed() {
    song.play();
}

function draw() {
    background(0,0,0,10);

    fill(255);
    rectMode(CENTER);

    let boxSize;

    if (ballX <= width/2) {
        boxSize = map(ballX, 0, width/2, 10, 100);
    } else {
        boxSize = map(ballX, width/2, width, 100, 10);
    }

    rect(width/2, height/2, boxSize);

    ballG = map(ballX, 0, width, 0, 255);

    fill(ballR, ballG, ballB);
    ellipse(ballX, ballY, 50);
    ballX += 5;

    if (ballX >= width) {
        ballX = 0;
        ballY = random(10, 290);
        ballR = random(255);
        ballB = random(255);
    }


}