class Bacteria {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(1 , 5); // Random size to start
        this.dx = random(-2,2); // random velocity in X
        this.dy = random(-2,2); // random velocity in Y
        this.growthRate = random(0.01, 0.05); // How fast it grows
        this.transparency = 100;
        this.transparencyRate = 150 / ((5 - this.size) / this.growthRate);
        this.red = 250,
        this.green = 128;
        this.blue = random(0, 250);
        this.color = color(this.red, this.green, this.blue, this.transparency); // Assign a stable color at creation
        this.isDragging = false;  // Track if this bacterium is being dragged
    }

    move() {
        //update position based on velocity
        this.x += this.dx;
        this.y += this.dy;
        // check for edge collision
        this.edges();
    }

    edges() {
        //reverse direction if hitting edge
        if (this.x <= 0 + this.size / 2 || this.x >= width - this.size / 2) this.dx *= -1;
        if (this.y <= 0 + this.size / 2 || this.y >= height - this.size / 2) this.dy *= -1;
    }

    grow() {
        // Increase size over time
        this.size += this.growthRate;
        this.size = constrain(this.size, 0, 20); // Limit size to 20
        this.transparency += this.transparencyRate;
        this.color = color(this.red, this.green, this.blue, this.transparency); 

    }


    avoidOthers(bacteriaList) {
        let perceptionRadius = this.size * 1.5;
        let steering = createVector();
        let total = 0;
    
        for (let other of bacteriaList) {
            let d = dist(this.x, this.y, other.x, other.y);
            if (other !== this && d < perceptionRadius && d > 0.1) { // Avoid division by very small numbers
                let diff = p5.Vector.sub(createVector(this.x, this.y), createVector(other.x, other.y));
                diff.normalize();
                diff.div(d); // Still apply a weight based on distance
                steering.add(diff);
                total++;
            }
        }
    
        if (total > 0) {
            steering.div(total);
            steering.normalize();
            steering.mult(sqrt(sq(this.dx) + sq(this.dy))); // Set magnitude to current speed
            steering.sub(createVector(this.dx, this.dy));
            steering.limit(0.5); // Apply a gentle steering change
        }
        return steering;
    }
    

    show() {
        noStroke();
        fill(this.color); 
        ellipse(this.x, this.y, this.size, this.size);
    }

    // Method to check if a point (mouse click) is inside the bacterium
    clicked(px, py) {
        let d = dist(px, py, this.x, this.y);
        if (d < this.size / 2) {
            this.isDragging = true;
        }
    }

    // Method to release the bacterium
    stopDragging() {
        this.isDragging = false;
    }

    // Method to update position if dragged
    drag(px, py) {
        if (this.isDragging) {
            this.x = px;
            this.y = py;
        }
    }
}
