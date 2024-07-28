import { Sound } from "./sound";


export class GameSound {
    public gameMusic: Sound;
    public isInitialized: boolean = false;
    private startingScreenMusic = "./sound/superspacy-atmosphere-106826.mp3";
    private gameBackgroundMusic = "./sound/ambient-space-ship-s-music.mp3";
    
    constructor() { }

    public loadBackgroundMusic(musicFileName: string, document: Document): void {
        this.gameMusic = new Sound(musicFileName, document);
    }

    public setMusic(): void {
        this.gameMusic.setMusic(this.gameBackgroundMusic);
    }

    public setMusic2(): void {
        this.gameMusic.setMusic(this.startingScreenMusic);
    }

    private setBackgroundMusicVolume(volume: number): void {
        this.gameMusic.setVolume(volume);
    }

    public getBackgroundMusicVolume(): number {
        return this.gameMusic.getVolume();
    }

    public playBackgroundMusic(): void {
        console.log("this.gameMusic: " + this.gameMusic);
        this.gameMusic.play();
    }

    public getVolumeInPercentage() {
        return this.gameMusic.getVolumeInPercentage();
    }

    public lesserVolume(): void {
        this.gameMusic.lesserVolume();
    }

    public growVolume(): void {
        this.gameMusic.growVolume();
    }
}