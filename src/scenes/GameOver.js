import { AudioManager } from '../audio.js';

export class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    init(data) {
        this.score = data.score || 0;
    }

    create() {
        // Initialize audio manager
        this.audioManager = new AudioManager(this);

        // Add background
        this.add.rectangle(0, 0, 1024, 768, 0x000000).setOrigin(0);
        
        // Add game over text
        this.add.text(512, 200, 'GAME OVER', {
            fontSize: '64px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Add score text
        this.add.text(512, 300, `Score: ${this.score}`, {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Add buttons
        const playAgainButton = this.add.text(512, 400, 'PLAY AGAIN', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#4444ff',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        const menuButton = this.add.text(512, 480, 'MAIN MENU', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#4444ff',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        // Add hover effects
        [playAgainButton, menuButton].forEach(button => {
            button.on('pointerover', () => {
                button.setStyle({ backgroundColor: '#6666ff' });
            });
            button.on('pointerout', () => {
                button.setStyle({ backgroundColor: '#4444ff' });
            });
        });

        // Add click handlers
        playAgainButton.on('pointerdown', () => {
            this.audioManager.createClickSound();
            this.scene.start('Game');
        });

        menuButton.on('pointerdown', () => {
            this.audioManager.createClickSound();
            this.scene.start('Menu');
        });
    }
}
