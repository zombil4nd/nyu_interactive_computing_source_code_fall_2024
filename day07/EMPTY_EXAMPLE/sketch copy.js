function setup() {

    let canvas = createCanvas(1000,1000);
    canvas.elt.style.width = "";
    canvas.elt.style.height = "";


    

}

function draw() {
    background(255, 40);
    noStroke();
    fill(random(0,255), random(0,255), random(0,255), 70);
    ellipse(random(0,width), random(0,height), 50);
  
}
