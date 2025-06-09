export class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload() {
        // Add loading text
        this.add.text(512, 384, 'Loading...', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Load game assets
        this.load.setPath('assets');
        this.load.atlas('assets', 'breakout.png', 'breakout.json');
        this.load.image('background', 'bg.png');
    }

    create() {
        // Verify that assets were loaded correctly
        if (!this.textures.exists('assets')) {
            console.error('Failed to load assets atlas');
            return;
        }

        // Log available frames for debugging
        const frames = this.textures.get('assets').getFrameNames();
        console.log('Available frames:', frames);

        // Move to the Menu scene
        this.scene.start('Menu');
    }
}
