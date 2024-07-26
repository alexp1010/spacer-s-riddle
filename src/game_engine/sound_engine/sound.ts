export class Sound {
    private sound: HTMLAudioElement;
    private step = 0.1;

    constructor(src: string, document: Document) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.setAttribute("autoplay", "true");
        this.sound.setAttribute("loop", "true");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    public play(): void {
        this.sound.volume = 1;
        this.sound.play();
    };

    public pause(): void {
        this.sound.pause();
    };

    public getVolume(): number {
        return this.sound.volume;
    }

    public getVolumeInPercentage(): string {
        var persentage = "0%";

        if (this.sound.volume >= 0 && this.sound.volume < 0.1) {
            persentage = "0%";
        } 
        else if (this.sound.volume >= 0.1 && this.sound.volume < 0.2) {
            persentage = "10%";
        }
        else if (this.sound.volume >= 0.2 && this.sound.volume < 0.3) {
            persentage = "20%";
        }
        else if (this.sound.volume >= 0.3 && this.sound.volume < 0.4) {
            persentage = "30%";
        }
        else if (this.sound.volume >= 0.4 && this.sound.volume < 0.5) {
            persentage = "40%";
        }
        else if (this.sound.volume >= 0.5 && this.sound.volume < 0.6) {
            persentage = "50%";
        }
        else if (this.sound.volume >= 0.6 && this.sound.volume < 0.7) {
            persentage = "60%";
        }
        else if (this.sound.volume >= 0.7 && this.sound.volume < 0.8) {
            persentage = "70%";
        }
        else if (this.sound.volume >= 0.8 && this.sound.volume < 0.9) {
            persentage = "80%";
        }
        else if (this.sound.volume >= 0.9 && this.sound.volume < 1) {
            persentage = "90%";
        }
        else if (this.sound.volume === 1) {
            persentage = "100%";
        }

        return persentage;
    }

    public setVolume(volume: number): void {
        console.log("volume: " + this.sound.volume);
        this.sound.volume = volume;
    }

    public lesserVolume(): void {
        if (this.sound.volume > 0) {
            var newSoundVolume = this.sound.volume - this.step;

            if (newSoundVolume >= 0 && newSoundVolume <= 1) {
                this.sound.volume = newSoundVolume;
            }
        }
    }

    public growVolume(): void {
        if (this.sound.volume < 1) {
            var newSoundVolume = this.sound.volume + this.step;

            if (newSoundVolume >= 0 && newSoundVolume <= 1) {
                this.sound.volume = newSoundVolume;
            }
        }
    }
}