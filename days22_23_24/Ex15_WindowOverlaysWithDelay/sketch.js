// create a variable for A-Frame world
let world;

// references to our markers (which are defined in the HTML document)
let hiroMarker, kanjiMarker;

// how long has each marker been visible?
let hiroVisCount = 0;
let kanjiVisCount = 0;

// global flag to keep track of whether we should track new markers
// (we can pause this when there's an overlay visible)
let tracking = true;

function setup() {
    world = new AFrameP5AR.World("ARScene");

    // grab a reference to our marker in the HTML document
    hiroMarker = world.getMarker("hiro");
    kanjiMarker = world.getMarker("kanji");
}

function draw() {

    // if we are in tracking mode
    if (tracking) {

        // see which markers are visible
        // update their visibility counters as needed
        if (kanjiMarker.isVisible()) {
            kanjiVisCount++;
        }
        else {
            kanjiVisCount = 0;
        }
        if (hiroMarker.isVisible()) {
            hiroVisCount++;
        }
        else {
            hiroVisCount = 0;
        }

        // if a marker has been visible for a certain # of consecutive frames we can
        // make it visible - this prevents tracking errors from interfering with your
        // overall experience
        if (kanjiVisCount > 15) {
            tracking = false;
            document.getElementById('kanji_content').style.display = 'block';
        }
        else if (hiroVisCount > 15) {
            tracking = false;
            document.getElementById('hiro_content').style.display = 'block';
        }
    }

}

// see the HTML document - this function is called when the user chooses to
// close the window with the 'close window' button - it restarts tracking
function p5_restartTracking() {
    tracking = true;
    kanjiVisCount = 0;
    hiroVisCount = 0;
}

function mousePressed() {
}
