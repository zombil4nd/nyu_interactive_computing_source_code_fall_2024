let xPos = 250;
let yPos = 250;
let cow;
let xCow = 20;
let yCow = 20;
let points = 0;


function preload() {
    cow = loadImage("../images/cow.png");
}

function setup() {

    createCanvas(500, 500);
    background(0);


}

function draw() {

    background(0);

    imageMode(CENTER);
    image(cow, xCos, yCow);

    ellipse(xPos, yPos, 25, 25);
    console.log(key);

    if (keyIsDown(65)) {
        xPos -= 5;
    }
    if (keyIsDown(68)) {
        xPos += 5;
    }
    if (keyIsDown(87)) {
        yPos -= 5;
    }
    
    let d = dist(xPos, yPos, xCow, yCow);
    fill(255);
    stroke(0, 255, 0);
    line(xPos, yPos, xCow, yPos);
    text(d, 20, 20);

    if (d <= 30) {
        points += 1;
        xCow = random(0,width);
        yCow = random(0, height);
    }

    text("Points: " + points, 20, 450)

    
}


function keyPressed() {
    
}