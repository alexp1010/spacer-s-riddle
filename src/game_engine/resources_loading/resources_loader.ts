import { Game } from "./../game";
// import img from "./../../../images/starting screen.png";

export class ResourcesLoader {

    private game: Game;

    private boardComputerImage: HTMLImageElement;
    private menuIcon: HTMLImageElement;
    private menuImage: HTMLImageElement;

    constructor(game: Game) {
        this.game = game;
        this.init();
    }

    private init(): void {
        this.initImages();     
    }

    public loadResources(): void {
        this.game.ctx.fillStyle = "#000000";
        this.game.ctx.font = "30px Arial";
        this.game.ctx.fillText("Loading Resources... ", 50, 50);
        this.game.ctx.fillText("0%", 50, 90);

        this.loadStartingScreen();
    }

    private loadStartingScreen(): void {
        this.game.startingScreenImage = new Image();
        this.game.startingScreenImage.src = "./images/space_view.png";
        this.game.startingScreenImage.addEventListener("load", this.startingScreenLoadHandler.bind(this));
    }

    private startingScreenLoadHandler(event: Event): void {
        this.game.ctx.clearRect(50, 50, 40, 100);
        this.game.ctx.font = "30px Arial";
        this.game.ctx.fillText("25%", 50, 90);

        this.loadScene1();
    }

    private loadScene1(): void {
        this.game.boardComputerImage = new Image();
        this.game.boardComputerImage.src = "./images/a_man_sitting_in_a_room.png";
        this.game.boardComputerImage.addEventListener("load", this.scene1LoadHandler.bind(this));
    }

    private scene1LoadHandler(event: Event): void {
        this.game.ctx.clearRect(50, 50, 40, 100);
        this.game.ctx.font = "30px Arial";
        this.game.ctx.fillText("50%", 50, 90);

        this.loadScene2();
    }

    private loadScene2(): void {
        this.game.menuIcon = new Image();
        this.game.menuIcon.src = "./images/menu_icon.png";
        this.game.menuIcon.addEventListener("load", this.scene2LoadHandler.bind(this));
    }

    private scene2LoadHandler(event: Event): void {
        this.game.ctx.clearRect(50, 50, 40, 100);
        this.game.ctx.font = "30px Arial";
        this.game.ctx.fillText("75%", 50, 90);

        this.loadScene3();
    }

    private loadScene3(): void {
        this.game.thoughtCloud = new Image();
        this.game.thoughtCloud.src = "./images/thought_cloud.png";
        this.game.thoughtCloud.addEventListener("load", this.scene3LoadHandler.bind(this));
    }

    private scene3LoadHandler(event: Event): void {
        this.game.ctx.clearRect(50, 50, 40, 100);
        this.game.ctx.font = "30px Arial";
        this.game.ctx.fillText("75%", 50, 90);

        this.loadScene4();
    }

    private loadScene4(): void {
        this.game.menuImage = new Image();
        this.game.menuImage.src = "./images/menu_tablet_with_opacity.png";
        this.game.menuImage.addEventListener("load", this.scene4LoadHandler.bind(this));
    }

    private scene4LoadHandler(event: Event): void {
        this.game.ctx.clearRect(50, 50, 40, 100);
        this.game.ctx.font = "30px Arial";
        this.game.ctx.fillText("100%", 50, 90);

        this.game.loadGame();
    }

    private initImages(): void {
        this.boardComputerImage = new Image();
        this.menuIcon = new Image();
        this.menuImage = new Image();
    }
}
