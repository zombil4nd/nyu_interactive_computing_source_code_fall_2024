// this will be a vector object that keeps track of the character's position
// it will have two components - x & y
let characterPosition;

// current rotation of the character (radians)
let characterAngle = 0;

// the position of the sensor (green box) in front of the character
let sensorDistance = 30;

// artwork for our background
let artLevel, artHitMap, artCurrent;;

// load our graphics
function preload() {
    artLevel = loadImage('images/level.png');
    artHitMap = loadImage('images/level_hitmap.png');
    artCurrent = artHitMap;
}

function setup() {
    createCanvas(500, 500);

    // draw all rectangles from their center point
    rectMode(CENTER);

    // define the character's initial position using a vector
    characterPosition = createVector(250, 250);

    // we can now access the character's position using:
    // characterPosition.x
    // characterPosition.y
}

function draw() {
    // draw our background artwork
    image(artCurrent, 0, 0);

    // rotate the character by manipulating the angle variable
    if (keyIsDown(LEFT_ARROW)) {
        characterAngle -= 0.05;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        characterAngle += 0.05;
    }

    // move the character forward in the direction it's facing
    if (keyIsDown(UP_ARROW)) {

        // compute the sensor's position using vector math
        // here we are creating a new vector that matches the character's
        // angle. We then multiply it by the sensor distance (30)
        // finally, we add that vector to the character position
        // to arrive at the actual position of the sensor
        let sensorPosition = p5.Vector.fromAngle(characterAngle).mult(sensorDistance);
        sensorPosition.add(characterPosition);

        // now we can grab the color on the hitmap at this position
        let sensorColor = artHitMap.get(sensorPosition.x, sensorPosition.y); 
        
        // examine this color to see if we can proceed in this direction
        if (red(sensorColor) == 255) {
            // first we need to create a new vector that points in the
            // direction of the current angle of rotation
            let direction = p5.Vector.fromAngle(characterAngle);

            // now we can multiply this vector by our speed (2) and
            // move the charater 2 pixels in this direction
            direction.mult(2);

            // finally, we can add this direction to the character's
            // position to move them
            characterPosition.add(direction);
        }        



    }

    // this logic will draw the character in its current position
    push();
    translate(characterPosition.x, characterPosition.y);
    rotate(characterAngle);

    // main body of character
    fill(255);
    rect(0, 0, 30, 30);
    
    // draw the front of the character
    translate(30, 0);
    fill(0,255,0);
    rect(0,0,10,10);

    pop();
}


function keyPressed() {
    if (key == 'H' || key == 'h') {
        artCurrent = artHitMap;
    }
    if (key == 'L' || key == 'l') {
        artCurrent = artLevel;
    }
}