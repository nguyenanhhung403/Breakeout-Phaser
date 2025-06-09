import { AudioManager } from '../audio.js';

export class HighScore extends Phaser.Scene {
    constructor() {
        super('HighScore');
    }

    create() {
        // Initialize audio manager
        this.audioManager = new AudioManager(this);

        // Add background
        this.add.rectangle(0, 0, 1024, 768, 0x000000).setOrigin(0);
        
        // Add title
        this.add.text(512, 100, 'HIGH SCORES', {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Get high scores from localStorage
        const highScores = JSON.parse(localStorage.getItem('breakoutHighScores')) || [];
        
        // Display high scores
        highScores.sort((a, b) => b.score - a.score).slice(0, 5).forEach((score, index) => {
            this.add.text(512, 200 + (index * 60), `${index + 1}. ${score.name}: ${score.score}`, {
                fontSize: '32px',
                fontFamily: 'Arial',
                color: '#ffffff'
            }).setOrigin(0.5);
        });

        // Add back button
        const backButton = this.add.text(512, 600, 'BACK TO MENU', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#4444ff',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        backButton.on('pointerover', () => {
            backButton.setStyle({ backgroundColor: '#6666ff' });
        });
        backButton.on('pointerout', () => {
            backButton.setStyle({ backgroundColor: '#4444ff' });
        });
        backButton.on('pointerdown', () => {
            this.audioManager.createClickSound();
            this.scene.start('Menu');
        });

        // Start background music
        this.backgroundMusic = this.audioManager.createBackgroundMusic();
    }

    shutdown() {
        // Stop background music when leaving the scene
        if (this.backgroundMusic) {
            this.backgroundMusic.oscillator.stop();
        }
    }
} 