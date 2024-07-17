import { Scene } from "phaser";

class AudioController {
    private scene: Scene;

    private music: Phaser.Sound.BaseSound;
    private sounds: Phaser.Sound.BaseSound[] = [];

    private musicConfig: Phaser.Types.Sound.SoundConfig;
    private soundConfig: Phaser.Types.Sound.SoundConfig;

    public static readonly AUDIO_CONTROLLER_KEY = 'audioController';

    constructor(scene: Scene) {
        this.scene = scene;

        // Save the instance in the scene's data manager for easy access
        this.scene.data.set('audioController', this);

        // Initial configurations for music and sound
        this.musicConfig = { loop: true, volume: 0.5 };
        this.soundConfig = { volume: 1.0 };

    
    }

    public adjustMusicVolume(volume: number): void {
        this.musicConfig.volume = volume;
        if (this.music.isPlaying) {
            (this.music as Phaser.Sound.WebAudioSound).setVolume(volume);
        }
    }
    
    
    public adjustSoundVolume(volume: number): void {
        this.soundConfig.volume = volume;
        // Adjust the volume of all currently playing sounds
        this.sounds.forEach(sound => {
            if (sound.isPlaying) {
                (sound as Phaser.Sound.WebAudioSound).setVolume(volume);
            }
        });
    }
    
    public playSound(key: string): void {
        // Use the sound configuration for playing specific sound effects
        const sound = this.scene.sound.add(key, this.soundConfig);
        sound.play();
        // Add the sound to the sounds array
        this.sounds.push(sound);
        // Remove the sound from the array when it finishes playing
        sound.on('complete', () => {
            const index = this.sounds.indexOf(sound);
            if (index !== -1) {
                this.sounds.splice(index, 1);
            }
        });
    }

    public stopSound(key: string): void {
        // Find the sound by key
        const soundIndex = this.sounds.findIndex(s => s.key === key);
        if (soundIndex !== -1) {
            // Stop the sound if found
            this.sounds[soundIndex].stop();
            // Remove the sound from the array
            this.sounds.splice(soundIndex, 1);
        }
    }

    public playMusic(key : string): void {
        // Directly use the music instance since its configuration is already set
        if (this.music.isPlaying) {
            this.music.stop();
        }

        this.music = this.scene.sound.add(key, this.musicConfig);
    }
}

export default AudioController;