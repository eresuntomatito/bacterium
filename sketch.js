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
    bacteriaList.forEach(bacterium => {
        let steer = bacterium.avoidOthers(bacteriaList);
        bacterium.dx += steer.x;
        bacterium.dy += steer.y;
        bacterium.move();
        bacterium.grow();
        bacterium.show();
    });
    
    // Add a new bacterium every 200 frames
    if (frameCount % 100 === 0) {
        addBacterium();
    }
    // Add new bacteria on mouse click
/*     if (mouseIsPressed) {
        bacteriaList.push(new Bacteria(mouseX, mouseY));
    } */
}

function addBacterium() {
    let x = random(width);
    let y = random(height);
    bacteriaList.push(new Bacteria(x,y));
}

function mousePressed() {
    bacteriaList.forEach((bacterium) => {
        bacterium.clicked(mouseX, mouseY);
    });
}

function mouseReleased() {
    bacteriaList.forEach((bacterium) => {
        bacterium.stopDragging();
    });
}

function mouseDragged() {
    bacteriaList.forEach((bacterium) => {
        bacterium.drag(mouseX, mouseY);
    });
}
