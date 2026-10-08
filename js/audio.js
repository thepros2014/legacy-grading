/**
 * Legacy Grading - Numismatic Audio Synthesizer (Web Audio API)
 * High-tech UI sounds without external audio dependencies.
 */
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = localStorage.getItem('lcg_audio_muted') === 'true';
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('lcg_audio_muted', this.isMuted);
        if (!this.isMuted) {
            this.playPip();
        }
        return this.isMuted;
    }

    playPip(freq = 880, duration = 0.05) {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

            gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            // Audio context policy fallback
        }
    }

    playRadarSweep() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(320, this.ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(740, this.ctx.currentTime + 0.18);

            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(600, this.ctx.currentTime);
            filter.Q.setValueAtTime(3, this.ctx.currentTime);

            gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.2);
        } catch (e) {}
    }

    playShutter() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        try {
            // Noise burst for mechanical shutter
            const bufferSize = this.ctx.sampleRate * 0.08;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 1200;

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            noise.start();

            // Click transient
            setTimeout(() => {
                this.playPip(1200, 0.03);
            }, 50);
        } catch (e) {}
    }

    playGradeSuccess() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const chords = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            chords.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

                gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.08);
                gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + idx * 0.08 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.6);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(this.ctx.currentTime + idx * 0.08);
                osc.stop(this.ctx.currentTime + idx * 0.08 + 0.6);
            });
        } catch (e) {}
    }

    playCoinClink() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        try {
            // Metallic resonance
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(2480, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(2450, this.ctx.currentTime + 0.4);

            gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0005, this.ctx.currentTime + 0.5);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.5);
        } catch (e) {}
    }
}

window.soundEngine = new SoundEngine();
