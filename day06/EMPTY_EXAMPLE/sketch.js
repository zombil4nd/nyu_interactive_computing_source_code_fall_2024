function setup() {

    let cnv = createCanvas(500, 500);

    background(0);


    let saveCanvas = document.getElementById('saveCanvas');
    saveCanvas.onclick  = saveCanvasFunction;
}

function draw() {

    let currentText = document.getElementById('myTextBox').value;
    if(mouseIsPressed){
        noStroke();
        fill(155);
        let currentSize = document.getElementById('brushSize').value;
        ellipse(mouseX, mouseY, currentSize);

    }

}

function clearCanvas(){
    background(0);

}

function saveCanvasFunction() {
    save("masterpiece.png");
}