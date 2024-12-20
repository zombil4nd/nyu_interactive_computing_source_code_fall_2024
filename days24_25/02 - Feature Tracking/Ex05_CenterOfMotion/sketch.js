// our video object
let capture;

// an image object to "memorize" the previous frame of video
let compareFrame;

// an image object to display the result of the background removal algorithm
let mergedFrame;

// threshold to see how tolerant we should be
let threshold = 20;

// keep track of "motion" pixels
let motionLocationTotalX = 0;
let motionLocationTotalY = 0;
let motionNumPixels = 0;

// our center point
let centerX = 0;
let centerY = 0;

function setup() {
    pixelDensity(1);
    createCanvas(320, 240);

    // start up our web cam
    capture = createCapture({
        video: {
            mandatory: {
                minWidth: 320,
                minHeight: 240,
                maxWidth: 320,
                maxHeight: 240
            }
        },
        audio: false
    });
    capture.hide();

    // create an empty image that will hold a previous frame of video
    compareFrame = createGraphics(320, 240);
    compareFrame.pixelDensity(1);

    // create an empty image that will hold the result of our motion detection algorithm
    mergedFrame = createGraphics(320, 240);
    mergedFrame.pixelDensity(1);
}

function draw() {
    // adjust threshold based on the mouse position
    threshold = map(mouseX, 0, width, 0, 100);

    // expose the pixels of each of our image objects
    capture.loadPixels();
    compareFrame.loadPixels();
    mergedFrame.loadPixels();

    // keep track of how many different pixels we have
    let diff = 0;

    // if we have a frame of video and we have a comparison frame we can attempt
    // to perform the background removal algorithm
    if (capture.pixels.length > 0 && compareFrame.pixels.length > 0) {
        // assume that we have no motion pixels
        motionLocationTotalX = 0;
        motionLocationTotalY = 0;
        motionNumPixels = 0;

        // examine all pixels in the video
        for (let i = 0; i < capture.pixels.length; i += 4) {
            // compare these pixels to the compareFrame pixels
            // we can use the distance formula for this
            if (dist(capture.pixels[i], capture.pixels[i + 1], capture.pixels[i + 2], compareFrame.pixels[i], compareFrame.pixels[i + 1], compareFrame.pixels[i + 2]) < threshold) {
                // this pixel is very similar - do nothing with it
                mergedFrame.pixels[i] = capture.pixels[i];
                mergedFrame.pixels[i + 1] = capture.pixels[i + 1];
                mergedFrame.pixels[i + 2] = capture.pixels[i + 2];
                mergedFrame.pixels[i + 3] = 255;
            }
            else {
                // this pixel is very different - make it green to mark it as a "motion" pixel
                mergedFrame.pixels[i] = 0;
                mergedFrame.pixels[i + 1] = 255;
                mergedFrame.pixels[i + 2] = 0;
                mergedFrame.pixels[i + 3] = 255;

                // keep track of this position
                motionLocationTotalX += (i / 4) % 320;
                motionLocationTotalY += (i / 4) / 320;
                motionNumPixels++;
                diff++;
            }
        }

        // update pixels and draw our merged frame
        mergedFrame.updatePixels();
        image(mergedFrame, 0, 0);

        // compute the center of motion if we have enough pixels
        if (motionNumPixels > 1000) {
            centerX = (motionLocationTotalX / motionNumPixels);
            centerY = (motionLocationTotalY / motionNumPixels);
        }
        fill(255);
        ellipse(centerX, centerY, 25, 25);

        // important - this frame of video becomes our comparision frame for the next iteration of 'draw'
        if (diff !== 0) {
            compareFrame.image(capture, 0, 0, 320, 240);
        }
    }

    // display threshold
    noStroke();
    fill(255);
    rect(0, 0, 100, 30);
    fill(0);
    text("Threshold:" + int(threshold), 10, 20);
}
