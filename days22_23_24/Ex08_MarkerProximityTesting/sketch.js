// create a variable to hold our world object
let world;

// create variables to hold our markers
let markerHiro, markerKanji;

// geometry
let cube, sphere;

function setup() {
    // create our world (this also creates a p5 canvas for us)
    world = new AFrameP5AR.World('ARScene');

    // grab a reference to our two markers that we set up on the HTML side (connect to it using its 'id')
    markerHiro = world.getMarker('hiro');
    markerKanji = world.getMarker('kanji');

    // create some geometry to add to our marker
    // the marker is 1 meter x 1 meter, with the origin at the center
    // the x-axis runs left and right
    // -0.5, 0, -0.5 is the top left corner
    cube = new AFrameP5AR.Box({
        x: 0, y: 0.25, z: 0,
        red: 255, green: 0, blue: 0,
        width: 0.5, height: 0.5, depth: 0.5,
        asset: 'stonebrick'
    });
    markerHiro.addChild(cube);

    sphere = new AFrameP5AR.Box({
        x: 0, y: 0.5, z: 0,
        width: 0.5, height: 0.5, depth: 0.5,
        red: 0, green: 255, blue: 0
    });
    markerKanji.addChild(sphere);
}


function draw() {
    // get the position of both markers
    let hiroPosition = markerHiro.getScreenPosition();
    let kanjiPosition = markerKanji.getScreenPosition();

    // are they close?
    if (dist(hiroPosition.x, hiroPosition.y, kanjiPosition.x, kanjiPosition.y) < 250) {
        cube.spinX(1);
        sphere.spinY(1);
    }


}
