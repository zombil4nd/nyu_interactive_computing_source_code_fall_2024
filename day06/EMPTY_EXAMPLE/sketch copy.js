function setup() {

    let cnv = createCanvas(500, 500);

    cnv.parent('#container');
    cnv.elt.style.border = '10px dashed red';
    background(0);
}

function draw() {

    ellipse(random(width), random(height), 10);

}
