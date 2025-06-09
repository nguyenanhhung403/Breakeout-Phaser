import { AudioManager } from '../audio.js';

export class Game extends Phaser.Scene {
    constructor() {
        super('Game');

        this.bricks;
        this.paddle;
        this.ball;
        this.ballTrail;
        this.brickEmitters;
        this.score = 0;
        this.isPaused = false;
    }

    create() {
        // Initialize audio manager
        this.audioManager = new AudioManager(this);

        // Add background
        this.add.image(512, 384, 'background').setAlpha(0.5);

        // Enable world bounds, but disable the floor
        this.physics.world.setBoundsCollision(true, true, true, false);

        // Create brick explosion particles
        this.brickEmitters = {};
        const colors = ['blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1'];
        colors.forEach(color => {
            // Create a simple circle texture for particles
            const graphics = this.make.graphics({ x: 0, y: 0, add: false });
            graphics.fillStyle(0xffffff, 1);
            graphics.fillCircle(4, 4, 4);
            graphics.generateTexture('particle', 8, 8);

            this.brickEmitters[color] = this.add.particles(0, 0, 'particle', {
                lifespan: 800,
                speed: { min: 150, max: 250 },
                scale: { start: 0.4, end: 0 },
                alpha: { start: 1, end: 0 },
                blendMode: 'ADD',
                gravityY: 300,
                emitting: false
            });
        });

        // Create the bricks in a 10x6 grid
        this.bricks = this.physics.add.staticGroup();
        const brickColors = ['blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1'];
        const brickWidth = 64;
        const brickHeight = 32;
        const startX = 192;
        const startY = 100;

        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 10; col++) {
                const color = brickColors[row];
                const x = startX + (col * brickWidth);
                const y = startY + (row * brickHeight);
                const brick = this.bricks.create(x, y, 'assets', color);
                brick.setOrigin(0, 0);
                brick.setImmovable(true);
            }
        }

        // Create ball
        this.ball = this.physics.add.image(512, 600, 'assets', 'ball1');
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.ball.setData('onPaddle', true);

        // Create ball trail
        this.ballTrail = this.add.particles(0, 0, 'particle', {
            scale: { start: 0.4, end: 0 },
            alpha: { start: 0.3, end: 0 },
            speed: 20,
            lifespan: 1000,
            blendMode: 'ADD',
            follow: this.ball
        });

        // Create paddle
        this.paddle = this.physics.add.image(512, 700, 'assets', 'paddle1');
        this.paddle.setImmovable(true);

        // Add colliders
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

        // Add score text
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff'
        });

        // Add pause button
        const pauseButton = this.add.text(900, 16, 'PAUSE', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#4444ff',
            padding: { x: 10, y: 5 }
        }).setInteractive();

        pauseButton.on('pointerdown', () => {
            this.audioManager.createClickSound();
            this.togglePause();
        });

        // Create pause menu
        this.createPauseMenu();

        // Add input handlers
        this.input.on('pointermove', (pointer) => {
            if (this.isPaused) return;
            
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 972);
            if (this.ball.getData('onPaddle')) {
                this.ball.x = this.paddle.x;
            }
        });

        this.input.on('pointerup', (pointer) => {
            if (this.isPaused) return;
            
            if (this.ball.getData('onPaddle')) {
                this.ball.setVelocity(-75, -300);
                this.ball.setData('onPaddle', false);
            }
        });

        // Start background music
        this.backgroundMusic = this.audioManager.createBackgroundMusic();
    }

    createPauseMenu() {
        this.pauseMenu = this.add.container(512, 384);
        this.pauseMenu.setVisible(false);

        const pauseBg = this.add.rectangle(0, 0, 400, 300, 0x000000, 0.8);
        const pauseText = this.add.text(0, -100, 'PAUSED', {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        const resumeButton = this.add.text(0, 0, 'RESUME', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#4444ff',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        const menuButton = this.add.text(0, 60, 'MAIN MENU', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#4444ff',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        this.pauseMenu.add([pauseBg, pauseText, resumeButton, menuButton]);

        resumeButton.on('pointerdown', () => {
            this.audioManager.createClickSound();
            this.togglePause();
        });

        menuButton.on('pointerdown', () => {
            this.audioManager.createClickSound();
            this.scene.start('Menu');
        });
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        this.pauseMenu.setVisible(this.isPaused);
        this.physics.world.pause(this.isPaused);
        this.audioManager.pauseAll();
        if (!this.isPaused) {
            this.audioManager.resumeAll();
        }
    }

    hitBrick(ball, brick) {
        const brickColor = brick.frame.name;
        
        // Create explosion effect
        if (this.brickEmitters[brickColor]) {
            this.brickEmitters[brickColor].emitParticleAt(brick.x + 32, brick.y + 16, 12);
        }

        // Add score
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        
        // Play sound
        this.audioManager.createBrickHitSound();

        // Fade out and remove brick
        this.tweenAlpha(brick, () => {
            brick.disableBody(true, true);
        });

        // Check if all bricks are destroyed
        if (this.bricks.countActive() === 0) {
            this.resetLevel();
        }
    }

    resetBall() {
        this.ball.setVelocity(0);
        this.ball.setPosition(this.paddle.x, 600);
        this.ball.setData('onPaddle', true);
    }

    resetLevel() {
        this.resetBall();

        this.bricks.children.each(brick => {

            brick.enableBody(false, 0, 0, true, true);

        });
    }

    hitPaddle(ball, paddle) {
        let diff = 0;

        if (ball.x < paddle.x) {
            //  Ball is on the left-hand side of the paddle
            diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * diff);
        }
        else if (ball.x > paddle.x) {
            //  Ball is on the right-hand side of the paddle
            diff = ball.x - paddle.x;
            ball.setVelocityX(10 * diff);
        }
        else {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(2 + Math.random() * 8);
        }

        // Play sound
        this.audioManager.createPaddleHitSound();
    }

    tweenAlpha(target, callback) {
        this.tweens.add({
            targets: target,
            alpha: 0,
            duration: 150,
            ease: 'Sine.inOut',
            onComplete: callback
        });
    }

    update() {
        if (this.isPaused) return;

        if (this.ball.y > 768) {
            this.audioManager.createGameOverSound();
            this.checkHighScore();
            this.scene.start('GameOver', { score: this.score });
        }
    }

    checkHighScore() {
        const highScores = JSON.parse(localStorage.getItem('breakoutHighScores')) || [];
        highScores.push({
            name: 'Player',
            score: this.score,
            date: new Date().toLocaleDateString()
        });
        highScores.sort((a, b) => b.score - a.score);
        localStorage.setItem('breakoutHighScores', JSON.stringify(highScores.slice(0, 5)));
    }

    shutdown() {
        // Stop background music when leaving the scene
        if (this.backgroundMusic) {
            this.backgroundMusic.oscillator.stop();
        }
    }
}