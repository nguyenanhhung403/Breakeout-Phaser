export class AudioManager {
    constructor(scene) {
        this.scene = scene;
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.suspended = false;
    }

    pauseAll() {
        if (this.context.state === 'running') {
            this.context.suspend();
            this.suspended = true;
        }
    }

    resumeAll() {
        if (this.suspended) {
            this.context.resume();
            this.suspended = false;
        }
    }

    createClickSound() {
        if (this.suspended) return;

        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, this.context.currentTime);
        gainNode.gain.setValueAtTime(0.3, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.1);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        oscillator.start();
        oscillator.stop(this.context.currentTime + 0.1);
    }

    createBrickHitSound() {
        if (this.suspended) return;

        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(400, this.context.currentTime);
        gainNode.gain.setValueAtTime(0.2, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.2);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        oscillator.start();
        oscillator.stop(this.context.currentTime + 0.2);
    }

    createPaddleHitSound() {
        if (this.suspended) return;

        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, this.context.currentTime);
        gainNode.gain.setValueAtTime(0.2, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.1);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        oscillator.start();
        oscillator.stop(this.context.currentTime + 0.1);
    }

    createGameOverSound() {
        if (this.suspended) return;

        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(200, this.context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, this.context.currentTime + 1);
        gainNode.gain.setValueAtTime(0.3, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 1);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        oscillator.start();
        oscillator.stop(this.context.currentTime + 1);
    }

    createBackgroundMusic() {
        if (this.suspended) return null;

        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, this.context.currentTime);
        gainNode.gain.setValueAtTime(0.1, this.context.currentTime);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        oscillator.start();
        return { oscillator, gainNode };
    }
} 