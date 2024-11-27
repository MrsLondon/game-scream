class Item {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.type = type; // e.g., 'health', 'power-up'
        this.image = new Image();
        
        if (type === 'health') {
            this.image.src = 'assets/images/health-item.png';
        } else if (type === 'power-up') {
            this.image.src = 'assets/images/power-up-item.png';
        }
    }

    // Update item logic (if needed)
    update() {
        // You can move the item or add more logic here
    }

    // Draw item on canvas
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

