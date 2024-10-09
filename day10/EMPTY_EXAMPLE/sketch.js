// let gif;

// function preload(){
//     gif = loadImage("../images/pokeball.gif");
// }

// function setup(){
//     createCanvas(300, 300);
//     background(0);
// }

// function draw(){
//     background(0);
//     image(gif, 0, 0, 100, 100);
//     image(gif, 100, 0, 100, 100);
//     image(gif, 0, 100, 100, 100);
//     image(gif, 100, 100, 100, 100);

//     fill(100);
//     textSize(30);
//     text(gif.getCurrentFrame(), 200, 200);
// }

// function mousePressed(){
//     gif.pause();
// }

// function keyPressed(){
//     gif.play();
// }




let collection = [];

function setup() {

    createCanvas(300,300);
    background(0);

    for (let i = 0; i < 50; i++) {
        let newWalker = new Walker(150, 150);
        collection.push(newWalker);
    }
}

function draw() {
    background(0);
    for ( let j = 0; j < collection.length; j++) {
        collection[i].moveAndDisplay();
    }
}

class Walker {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.color = color(random(255), random(255), random(255));
        this.framesMoved = 0;
        this.framesToStayInState = int(random(50, 150));
        this.speedX = random(-1, 1);
        this.speedY = random(-1, 1);


    }
    moveAndDisplay(){
        fill(this.color);
        ellipse(this.x, this.y, 10);

        this.x += this.speedX;
        this.y += this.speedY;

        this.framesMoved++;

        if(this.framesMoved % this.framesToStayInState == 0){
            this.speedX = random(-1, 1);
            this.speedY = random(-1, 1);
        }

        if (this.x > width) {
            this.x = 0;
        }
        if (this.y > height) {
            this.y = 0;
        }
        if (this.x < 0) {
            this.x = width;
        }
        if (this.y < 0) {
            this.y = height;
        }
        

    }

}
