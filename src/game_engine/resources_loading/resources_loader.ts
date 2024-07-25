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

    init() {
        this.initImages();     
    }

    loadResources() {
        this.game.ctx.fillStyle = "#000000";
        this.game.ctx.font = "30px Arial";
        this.game.ctx.fillText("Loading Resources... ", 50, 50);
        this.game.ctx.fillText("0%", 50, 90);

        this.loadStartingScreen();
    }

    loadStartingScreen() {
        this.game.startingScreenImage = new Image();
        this.game.startingScreenImage.src = "./images/starting screen.png";
        this.game.startingScreenImage.addEventListener("load", this.dsd.bind(this));
    }

    dsd(ev: Event): any {
        this.game.ctx.clearRect(50, 50, 40, 100);
        this.game.ctx.font = "30px Arial";
        this.game.ctx.fillText("25%", 50, 90);

        this.loadScene1();
    }

    loadScene1() {
        this.game.boardComputerImage = new Image();
        this.game.boardComputerImage.src = "./images/a_man_standing_at_the_doors_614x614.png";
        this.game.boardComputerImage.addEventListener("load", this.dsd2.bind(this));
    }

    dsd2(ev: Event): any {
        this.game.ctx.clearRect(50, 50, 40, 100);
        this.game.ctx.font = "30px Arial";
        this.game.ctx.fillText("50%", 50, 90);

        this.loadScene2();
    }

    loadScene2 () {
        this.game.menuIcon = new Image();
        this.game.menuIcon.src = "./images/menu_icon.png";
        this.game.menuIcon.addEventListener("load", this.dsd3.bind(this));
    }

    dsd3(ev: Event): any {
        this.game.ctx.clearRect(50, 50, 40, 100);
        this.game.ctx.font = "30px Arial";
        this.game.ctx.fillText("75%", 50, 90);

        this.loadScene3();
    }

    loadScene3 () {
        this.game.menuImage = new Image();
        this.game.menuImage.src = "./images/menu_tablet_with_opacity.png";
        this.game.menuImage.addEventListener("load", this.dsd4.bind(this));
    }

    dsd4(ev: Event): any {
        this.game.ctx.clearRect(50, 50, 40, 100);
        this.game.ctx.font = "30px Arial";
        this.game.ctx.fillText("100%", 50, 90);

        this.game.beginGame();
    }

    initImages() {
        this.boardComputerImage = new Image();
        this.menuIcon = new Image();
        this.menuImage = new Image();
    }
}
