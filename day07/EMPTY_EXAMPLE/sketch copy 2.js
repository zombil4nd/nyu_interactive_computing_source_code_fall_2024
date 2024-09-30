let x = 250;
let y = 250;

function setup() {

    let canvas = createCanvas(500,500);
    background(0);

    //see if we know where character is

    if (window.localStorage.getItem('x') != null){
        x = window.localStorage.getItem('x');
        y = window.localStorage.getItem('y');
    }
}

function draw() {
   
    background(0);
    fill(255);
    ellipse(x, y, 100, 100);
}

function mousePressed(){
    x = mouseX;
    y = mouseY;

    //store pos in local storage
    window.localStorage.setItem('x', x);
    window.localStorage.setItem('y', y);

}
