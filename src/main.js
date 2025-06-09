import { Boot } from './scenes/Boot.js';
import { Preloader } from './scenes/Preloader.js';
import { Menu } from './scenes/Menu.js';
import { Game } from './scenes/Game.js';
import { GameOver } from './scenes/GameOver.js';
import { HighScore } from './scenes/HighScore.js';

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Boot, Preloader, Menu, Game, GameOver, HighScore]
};

const game = new Phaser.Game(config);
