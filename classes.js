class Bacteria {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(1 , 5); // Random size to start
        this.dx = random(-2,2); // random velocity in X
        this.dy = random(-2,2); // random velocity in Y
        this.growthRate = random(0.001, 0.005); // How fast it grows
        this.transparency = 100;
        this.transparencyRate = 150 / ((5 - this.size) / this.growthRate);
        this.red = 250,
        this.green = 128;
        this.blue = random(0, 250);
        this.color = color(this.red, this.green, this.blue, this.transparency); // Assign a stable color at creation
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
        this.size = constrain(this.size, 0, 15); // Limit size to 20
        this.transparency += this.transparencyRate;
        this.color = color(this.red, this.green, this.blue, this.transparency); 

    }

    show() {
        noStroke();
        fill(this.color); 
        ellipse(this.x, this.y, this.size, this.size);
    }
}
