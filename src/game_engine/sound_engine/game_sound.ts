import { Sound } from "./sound";


export class GameSound {
    gameMusic: Sound;
    isInitialized: boolean = false;
    
    constructor() { }

    loadBackgroundMusic(musicFileName: string, document: Document) {
        this.gameMusic = new Sound(musicFileName, document);
    }

    setBackgroundMusicVolume(volume: number) {
        this.gameMusic.setVolume(volume);
    }

    getBackgroundMusicVolume() {
        return this.gameMusic.getVolume();
    }

    playBackgroundMusic() {
        console.log("this.gameMusic: " + this.gameMusic);
        this.gameMusic.play();
    }

    getVolumeInPercentage() {
        return this.gameMusic.getVolumeInPercentage();
    }

    lesserVolume() {
        this.gameMusic.lesserVolume();
    }

    growVolume() {
        this.gameMusic.growVolume();
    }
}