import { AudioManager } from '../audio.js';

export class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        // Initialize audio manager
        this.audioManager = new AudioManager(this);

        // Add background
        this.add.rectangle(0, 0, 1024, 768, 0x000000).setOrigin(0);
        
        // Add title
        this.add.text(512, 200, 'BREAKOUT', {
            fontSize: '64px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Add menu buttons
        const playButton = this.add.text(512, 350, 'PLAY', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#4444ff',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        const highScoreButton = this.add.text(512, 420, 'HIGH SCORES', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#4444ff',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        // Add hover effects
        [playButton, highScoreButton].forEach(button => {
            button.on('pointerover', () => {
                button.setStyle({ backgroundColor: '#6666ff' });
            });
            button.on('pointerout', () => {
                button.setStyle({ backgroundColor: '#4444ff' });
            });
        });

        // Add click handlers
        playButton.on('pointerdown', () => {
            this.audioManager.createClickSound();
            this.scene.start('Game');
        });

        highScoreButton.on('pointerdown', () => {
            this.audioManager.createClickSound();
            this.scene.start('HighScore');
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