import { Scene } from "phaser";

class AudioController {
    private scene: Scene;

    private music: Phaser.Sound.BaseSound;
    private sounds: Phaser.Sound.BaseSound[] = [];

    private static musicConfig: Phaser.Types.Sound.SoundConfig;
    private static soundConfig: Phaser.Types.Sound.SoundConfig;

    private listenerPosition: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);
    private listenerRange: number = 100; // Default range


    public static readonly AUDIO_CONTROLLER_KEY = 'audioController';

    constructor(scene: Scene) {
        this.scene = scene;

        // Save the instance in the scene's data manager for easy access
        this.scene.data.set('audioController', this);

        // Initial configurations for music and sound
        if (!AudioController.musicConfig) {
            AudioController.musicConfig = { loop: true, volume: 1.0 };
        }
        if (!AudioController.soundConfig) {
            AudioController.soundConfig = { volume: 1.0 };
        }

        this.scene.events.on('shutdown', () => {
            const audioController = this.scene.data.get('audioController') as AudioController;
            audioController.stopAll();
        });

        this.scene.events.on('destroy', () => {
            const audioController = this.scene.data.get('audioController') as AudioController;
            audioController.stopAll();
        });
    }

    public adjustMusicVolume(volume: number): void {
        AudioController.musicConfig.volume = volume;
        if (this.music && this.music.isPlaying) {
            (this.music as Phaser.Sound.WebAudioSound).setVolume(volume);
        }
    }
    
    public setListenerAttributes(position: Phaser.Math.Vector2, range: number): void {
        this.listenerPosition = position;
        this.listenerRange = range;
    }
    
    public adjustSoundVolume(volume: number): void {
        AudioController.soundConfig.volume = volume;
        // Adjust the volume of all currently playing sounds
        this.sounds.forEach(sound => {
            if (sound.isPlaying) {
                (sound as Phaser.Sound.WebAudioSound).setVolume(volume);
            }
        });
    }

    public getMusicVolume(): number {
        if (!AudioController.musicConfig || !AudioController.musicConfig.volume) {
            return 0;
        }

        return AudioController.musicConfig.volume;
    }

    public getSoundVolume(): number {
        if (!AudioController.soundConfig || !AudioController.soundConfig.volume) {
            return 0;
        }

        return AudioController.soundConfig.volume;
    }
    
    public playSound(key: string, adjustVolumeForDistance: boolean = false, soundPosition: Phaser.Math.Vector2 = this.listenerPosition): void {
        // Use the sound configuration for playing specific sound effects
        const sound = this.scene.sound.add(key, AudioController.soundConfig);
            
        if (adjustVolumeForDistance && soundPosition) {
            const distance = Phaser.Math.Distance.BetweenPoints(this.listenerPosition, soundPosition);
            const volumeAdjustment = Math.max(0, 1 - (distance / this.listenerRange));
            
            sound.setVolume(volumeAdjustment);
        }
        
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
        if (this.music && this.music.isPlaying) {
            this.music.stop();
        }

        this.music = this.scene.sound.add(key, AudioController.musicConfig);
        this.music.play();
    }

    public stopAll(): void {
        // Stop the music if it's playing
        if (this.music && this.music.isPlaying) {
            this.music.stop();
        }
    
        // Stop all sounds
        this.sounds.forEach(sound => {
            if (sound.isPlaying) {
                sound.stop();
            }
        });
    
        // Optionally clear the sounds array if you want to remove all references
        this.sounds = [];
    }
}

export default AudioController;