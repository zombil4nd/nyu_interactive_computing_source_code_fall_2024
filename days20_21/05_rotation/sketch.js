// variable to hold a reference to our A-Frame world
let world;

// some boxes that need to be global (so we can access them in 'draw')
let b4, b5, b6;

function setup() {
    // no canvas needed
    noCanvas();

    // construct the A-Frame world
    // this function requires a reference to the ID of the 'a-scene' tag in our HTML document
    world = new AFrameP5.World('VRScene');

    // set a background color for the world using RGB values
    world.setBackground(173, 216, 230);

    // you can rotate an item about each axis (x, y and z)
    let b1 = new AFrameP5.Box({
        x: -5, y: 1, z: 0,
        rotationX: 45,
        red: random(255), green: random(255), blue: random(255)
    });
    world.add(b1);

    let b2 = new AFrameP5.Box({
        x: -3, y: 1, z: 0,
        rotationY: 45,
        red: random(255), green: random(255), blue: random(255)
    });
    world.add(b2);

    let b3 = new AFrameP5.Box({
        x: -1, y: 1, z: 0,
        rotationZ: 45,
        red: random(255), green: random(255), blue: random(255)
    });
    world.add(b3);






    // you can also progressively update the rotation of an item using the "spin" method
    // (see the 'draw' function below)
    b4 = new AFrameP5.Box({
        x: 1, y: 1, z: 0,
        rotationX: 45,
        red: random(255), green: random(255), blue: random(255)
    });
    world.add(b4);

    b5 = new AFrameP5.Box({
        x: 3, y: 1, z: 0,
        rotationY: 45,
        red: random(255), green: random(255), blue: random(255)
    });
    world.add(b5);

    b6 = new AFrameP5.Box({
        x: 5, y: 1, z: 0,
        rotationZ: 45,
        red: random(255), green: random(255), blue: random(255)
    });
    world.add(b6);


    // create a plane to serve as our "ground"
    let g = new AFrameP5.Plane({
        x: 0, y: 0, z: 0,
        width: 100, height: 100,
        asset: 'stone',
        repeatX: 100,
        repeatY: 100,
        rotationX: -90, metalness: 0.25
    });

    // add the plane to our world
    world.add(g);
}

function draw() {

    // spin each box in one of the axes
    b4.spinX(0.5);
    b5.spinY(0.5);
    b6.spinZ(0.5);

}

function mousePressed() {
    // you can also force an object to a specfic rotation
    b4.setRotation(0, 0, 0);
    b5.setRotation(0, 0, 0);
    b6.setRotation(0, 0, 0);
}
