class Player {
    constructor(canvasWidth, canvasHeight) {
        this.x = canvasWidth / 2; // Start at the center of the canvas
        this.y = canvasHeight - 100; // Position at the bottom
        this.width = 50;
        this.height = 50;
        this.lifeBar = 6; // Health can withstand 6 knife hits
        this.weaponBar = 0; // Initially no weapons
        this.isShieldActive = false; // No shield at start
        this.isWeaponActive = false; // Weapon isn't active at start
        this.shieldDuration = 0; // Shield lasts for 5 seconds
        this.weaponDuration = 0; // Weapon lasts for 5 seconds

        // Load images for player
        this.image = new Image();
        this.image.src = 'assets/images/player.png'; // Replace with actual image source
    }

    // Move the player left or right based on user input
    move(direction) {
        if (direction === 'left') {
            this.x -= 5;
        } else if (direction === 'right') {
            this.x += 5;
        }
    }

    // Collect item (weapon or shield)
    collect(item) {
        if (item.type === 'weapon') {
            this.weaponBar += 1; // Increase weapon count
            this.weaponDuration = 5; // Activate weapon for 5 seconds
        } else if (item.type === 'shield') {
            this.isShieldActive = true; // Activate shield
            this.shieldDuration = 5; // Shield lasts 5 seconds
        }
    }

    // Handle being hit by a knife or enemy
    hit(type) {
        if (type === 'knife' && !this.isShieldActive) {
            this.lifeBar -= 1;
        } else if (type === 'killer' && !this.isShieldActive) {
            this.lifeBar -= 1;
        }

        // If the player has no life left, game over
        if (this.lifeBar <= 0) {
            return true; // Game over
        }
        return false;
    }

    // Update the status of the player (e.g., deactivate shield and weapon over time)
    update() {
        if (this.shieldDuration > 0) {
            this.shieldDuration -= 1; // Decrease shield duration
        } else {
            this.isShieldActive = false; // Deactivate shield
        }

        if (this.weaponDuration > 0) {
            this.weaponDuration -= 1; // Decrease weapon duration
        } else {
            this.isWeaponActive = false; // Deactivate weapon
        }
    }

    // Draw player on the canvas
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
