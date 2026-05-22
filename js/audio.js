// Audio Configuration
const AUDIO_CONFIG = {
    dotDuration: 100,      // milliseconds
    dashDuration: 300,     // milliseconds
    spaceDuration: 100,    // space between symbols
    frequency: 800,        // Hz
    sampleRate: 8000       // samples per second
};

class MorseAudioPlayer {
    constructor() {
        this.audioContext = null;
        this.isPlaying = false;
    }

    initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return this.audioContext;
    }

    async playMorse(morseCode) {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        const audioContext = this.initAudioContext();
        
        try {
            // Add visual feedback
            const btn = document.getElementById('playAudioBtn');
            btn.classList.add('playing');

            // Process each symbol
            for (let symbol of morseCode) {
                if (symbol === '.') {
                    await this.playTone(AUDIO_CONFIG.dotDuration);
                } else if (symbol === '-') {
                    await this.playTone(AUDIO_CONFIG.dashDuration);
                }
                // Wait between symbols
                await this.delay(AUDIO_CONFIG.spaceDuration);
            }

            btn.classList.remove('playing');
        } catch (error) {
            console.error('Audio playback error:', error);
        } finally {
            this.isPlaying = false;
        }
    }

    playTone(duration) {
        return new Promise((resolve) => {
            const audioContext = this.initAudioContext();
            
            // Create oscillator and gain
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            // Configure oscillator
            oscillator.type = 'sine';
            oscillator.frequency.value = AUDIO_CONFIG.frequency;
            
            // Configure gain (volume)
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
            
            // Connect and play
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration / 1000);
            
            // Resolve after duration
            setTimeout(resolve, duration);
        });
    }

    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

// Create global audio player instance
const morseAudio = new MorseAudioPlayer();
