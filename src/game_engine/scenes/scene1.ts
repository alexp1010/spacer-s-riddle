import { Game } from "../game";
import { Scene } from "./scene";

export class Scene1 implements Scene {
    boardComputerImage: CanvasImageSource;
    menuIcon: CanvasImageSource;
    thoughtCloud: CanvasImageSource;

    constructor(private game: Game) {
        this.boardComputerImage = game.boardComputerImage;
        this.menuIcon = game.menuIcon;
        this.thoughtCloud = game.thoughtCloud;
    }

    public showScreen(): void {
        this.game.ctx.drawImage(this.game.boardComputerImage, 0, 0);
        this.game.ctx.drawImage(this.game.thoughtCloud, 300, 0);
        this.game.ctx.drawImage(this.game.menuIcon, 10, 10);
        this.game.ctx.font = "16px Arial";
        this.game.ctx.fillText("Hmm, what was it?", 360, 70);
        this.game.ctx.fillText("It seems that I heard", 360, 100);
        this.game.ctx.fillText("some noise in the hall...", 360, 130);
        this.game.ctx.fillStyle = "green";
        this.game.ctx.fillText("continue...", 360, 160);
    }

    public handleMouseMoveEvents(canvasMouseX: number, canvasMouseY: number): void {
    }

    public handleMouseClickEvents(canvasMouseX: number, canvasMouseY: number): void {
    }
}