// create a let iable to hold our world object
let world;

// create let iables to hold our markers
let markerHiro;

// where our player is current hanging out at
let playerX, playerY;

// artwork for our player
let playerArtwork;

// a bunch of coins
let coins = [];

// points
let points = 0;

function preload() {
    playerArtwork = loadImage("../images/player.png");
}

function setup() {
    // create our world (this also creates a p5 canvas for us)
    world = new AFrameP5AR.World('ARScene');

    // grab a reference to our two markers that we set up on the HTML side (connect to it using its 'id')
    markerHiro = world.getMarker('hiro');

    // place the player in the middle of the screen
    playerX = width / 2;
    playerY = height / 2;

    // create a lot of coins
    for (let i = 0; i < 100; i++) {
        coins.push(new Coin());
    }
}


function draw() {
    // erase the background
    world.clearDrawingCanvas();

    // use the markers as positional controllers
    if (markerHiro.isVisible() == true) {
        // get the position of this marker
        let hiroPosition = markerHiro.getScreenPosition();

        // update the player position
        playerX = hiroPosition.x;
        playerY = hiroPosition.y;
    }

    // draw all coins
    for (let i = 0; i < coins.length; i++) {
        coins[i].moveAndDisplay();
    }

    // draw the player
    imageMode(CENTER);
    image(playerArtwork, playerX, playerY);
}

function Coin() {
    // all coins keep track of position
    this.x = random(width);
    this.y = random(-500, 0);

    // all coins have a speed
    this.speed = random(0.5, 5);

    // all coins move and display
    this.moveAndDisplay = function () {
        this.y += this.speed;
        if (dist(this.x, this.y, playerX, playerY) < 100) {
            points++;

            // update our points display (in HTML)
            document.getElementById('points_span').innerHTML = points;

            this.y = random(-500, 0);
            this.x = random(width);
        }
        if (this.y > height) {
            this.y = random(-500, 0);
            this.x = random(width);
        }
        fill(0, 255, 0);
        ellipse(this.x, this.y, 25, 25);
    }
}
