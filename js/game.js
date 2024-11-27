class Game {
    constructor(canvas, startScreen, gameScreen, gameOverScreen, displayFinalScore, displayHighestScore, startGameBtn, musicBtn) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.startScreen = startScreen;
        this.gameScreen = gameScreen;
        this.gameOverScreen = gameOverScreen;
        this.displayFinalScore = displayFinalScore;
        this.displayHighestScore = displayHighestScore;
        this.startGameBtn = startGameBtn;
        this.musicBtn = musicBtn;

        // Game variables
        this.score = 0;
        this.player = new Player(canvas.width, canvas.height);
        this.enemies = [];
        this.items = [];
        this.isGameOver = false;
        this.timer = 10; // Timer for collecting items

        // Start music and sound effects
        this.themeAudio = new Audio('assets/music/theme.mp3');
        this.themeAudio.play();

        // Bind event listeners for controls
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    // Start the game
    start() {
        this.startScreen.style.display = 'none';
        this.gameScreen.style.display = 'block';
        this.gameOverScreen.style.display = 'none';
        this.gameLoop();
    }

    // Handle keyboard inputs for player movement
    handleKeyPress(e) {
        if (e.key === 'ArrowLeft') {
            this.player.move('left');
        } else if (e.key === 'ArrowRight') {
            this.player.move('right');
        }
    }

    // Update game state
    update() {
        this.player.update(); // Update player status (e.g., deactivate shield)
        
        // Create enemies and items at intervals
        if (Math.random() < 0.02) this.enemies.push(new Enemy('killer', this.canvas.width));
        if (Math.random() < 0.02) this.enemies.push(new Enemy('knife', this.canvas.width));
        if (Math.random() < 0.03) this.items.push(new Item('weapon', this.canvas.width));
        if (Math.random() < 0.03) this.items.push(new Item('shield', this.canvas.width));

        // Move enemies and check for attacks
        this.enemies.forEach(enemy => {
            enemy.move();
            enemy.attack(this.player);
        });

        // Move items and check for collection
        this.items.forEach(item => {
            item.fall();
            if (this.player.x < item.x + item.width && this.player.x + this.player.width > item.x && this.player.y < item.y + item.height && this.player.y + this.player.height > item.y) {
                // Player collects the item
                this.player.collect(item);
            }
        });

        // Check for victory or defeat
        if (this.player.lifeBar <= 0) {
            this.gameOver();
        }
    }

    // Draw game elements on the screen
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
        this.player.draw(this.ctx);

        // Draw enemies and items
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
        this.items.forEach(item => item.draw(this.ctx));

        // Display score and health
        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 20, 30);
        this.ctx.fillText(`Health: ${this.player.lifeBar}`, 20, 50);
    }

    // End the game (game over)
    gameOver() {
        this.isGameOver = true;
        this.gameOverScreen.style.display = 'block';
        this.displayFinalScore.textContent = `Final Score: ${this.score}`;
        this.themeAudio.pause();
    }

    // Game loop
    gameLoop() {
        if (!this.isGameOver) {
            this.update();
            this.draw();
            requestAnimationFrame(() => this.gameLoop());
        }
    }
}
