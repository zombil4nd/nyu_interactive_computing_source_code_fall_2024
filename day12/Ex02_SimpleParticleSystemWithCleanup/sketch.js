// create an array to hold our particles
let theParticles = [];

function setup() {
    createCanvas(500, 500);
}

function draw() {
    background(255);
    fill(0);
    text("Particles in array: " + theParticles.length, 25, 25);
    text("Frame rate: " + frameRate(), 25, 50);

    // if the mouse is pressed we should create 50 particles
    if (mouseIsPressed) {
        for (let i = 0; i < 50; i++) {
            theParticles.push(new Particle(mouseX, mouseY));
        }
    }

    // every frame we have to draw all particles
    for (let i = 0; i < theParticles.length; i++) {
        // display the particle and ask it if it is small enough to be removed
        let result = theParticles[i].moveAndDisplay();

        // if it is super small we have to remove it from the array
        if (result == true) {
            // remove it from the array using the 'splice' function
            // this takes two arguments - the element to begin removing from the list
            // and how many elements to remove (generally we only remove 1 at a time)
            theParticles.splice(i, 1);

            // very important!  The list is now 1 element smaller!
            // so if we were on position #10 and we removed it, the Particle in position #11
            // would now be in position #10.
            // however, our 'for' loop wants to move on to position #11 since the variable i
            // is being increased by 1 each time.  We are going to nudge i down by 1 in order
            // to not miss the element in the slot that just shifted downward
            i = i - 1;
        }

    }
}

class Particle {

    constructor(startX, startY) {
        // all particles should store their initial starting position
        this.x = startX;
        this.y = startY;

        // all particles should pick a random color for themselves
        this.red = random(255);
        this.green = random(255);
        this.blue = random(255);

        // all particles need a size
        this.size = 25;

        // all particles should pick a random speed
        this.xSpeed = random(-3, 3);
        this.ySpeed = random(-3, 3);
    }

    // all particles need to be able to move and display themselves
    moveAndDisplay() {
        // move
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        // adjust size down a little bit
        this.size -= 0.2;
        this.size = constrain(this.size, 0, 25);

        // draw our particles
        fill(this.red, this.green, this.blue);
        noStroke();
        ellipse(this.x, this.y, this.size, this.size);

        // have the function return true if the particle is so small that it can be safely removed
        if (this.size <= 0) {
            return true;
        }
        else {
            return false;
        }
    }
}
