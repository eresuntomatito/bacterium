let bacteriaList = [];

function setup() {
    createCanvas(800, 600);
    // Populate initial bacteria
    for (let i = 0; i < 10; i++) {
        let x = random(width);
        let y = random(height);
        bacteriaList.push(new Bacteria(x, y));
    }
}

function draw() {
    background(240);
    for (let bact of bacteriaList) {
        bact.move();
        bact.grow();
        bact.show();
    }
    // Add a new bacterium every 200 frames
    if (frameCount % 50 === 0) {
        addBacterium();
    }
    // Add new bacteria on mouse click
    if (mouseIsPressed) {
        bacteriaList.push(new Bacteria(mouseX, mouseY));
    }
}

function addBacterium() {
    let x = random(width);
    let y = random(height);
    bacteriaList.push(new Bacteria(x,y));
}