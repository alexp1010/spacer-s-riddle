import { GameSound } from "./sound_engine/game_sound";
import { ResourcesLoader } from "./resources_loading/resources_loader";
import { StartingScreen } from "./screens/starting_screen";
import { MainMenu } from "./menu/main_menu";

export class Game {

    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    private canvasWidth: number;
    private canvasHeight: number;
    public boardComputerImage: HTMLImageElement;
    // scene1Image;
    // scene2Image;
    public menuIcon: HTMLImageElement;
    public menuImage: HTMLImageElement;
    public thoughtCloud: HTMLImageElement;
    public gameZone: DOMRect;
    public isMenuShown: boolean;
    private menu: MainMenu;
    private resourcesLoader: ResourcesLoader;
    public startingScreenImage: HTMLImageElement;
    public startingScreen: StartingScreen;
    public isStartingScreenShown: boolean;

    public gameSound: GameSound;
    private document: Document;

    constructor(document: Document) {
        this.document = document;
    }

    public init(): void {
        this.gameSound = new GameSound();
        this.gameSound.loadBackgroundMusic("./sound/superspacy-atmosphere-106826.mp3", this.document);

        this.canvas = this.document.getElementById("background") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 819;
        this.canvas.height = 614;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.gameZone = this.canvas.getBoundingClientRect();
        this.startingScreen = new StartingScreen(this);
        this.resourcesLoader = new ResourcesLoader(this);
        this.resourcesLoader.loadResources();

        this.isStartingScreenShown = true;

        this.menu = new MainMenu(this);
        this.isMenuShown = false;
    }

    public beginGame(): void {
        console.log("Begin game");
        this.startingScreen.showScreen();
        // this.showScreen(); // what was it? was a movement and talks?
        this.handleEvents();
    }

    public showScreen(): void {
        this.ctx.drawImage(this.boardComputerImage, 0, 0);
        this.ctx.drawImage(this.menuIcon, 10, 10);
        this.ctx.drawImage(this.thoughtCloud, 300, 0);
    }

    private handleEvents(): void {
        this.initMouseClickHandler();
        this.initMouseMoveHandler();
    }

    private initMouseClickHandler(): void {
        this.canvas.addEventListener("click", this.handleMouseClick.bind(this));
    }

    private handleMouseClick(this: Game, e: any): void {
        if (!this.gameSound.isInitialized) {
            this.gameSound.isInitialized = true;
            this.gameSound.playBackgroundMusic();
        }

        var mouseX = parseInt(e.clientX);
        var mouseY = parseInt(e.clientY);
        var canvasMouseX = mouseX - this.gameZone.left;
        var canvasMouseY = mouseY - this.gameZone.top;

        if (this.isStartingScreenShown) {
            this.startingScreen.handleMouseClickEvents(canvasMouseX, canvasMouseY);
        } 
        else if (!this.isMenuShown && this.isMouseInsideMenuIcon(canvasMouseX, canvasMouseY)) {
            this.isMenuShown = true;
            this.menu.showMenu(mouseX, mouseY);
        }
        else if (this.isMenuShown) {
            this.menu.handleMouseClickEvents(canvasMouseX, canvasMouseY);
        }
    }

    private initMouseMoveHandler(): void {
        this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
    }

    private handleMouseMove(e: any): void {
        var mouseX = parseInt(e.clientX);
        var mouseY = parseInt(e.clientY);
        var canvasMouseX = mouseX - this.gameZone.left;
        var canvasMouseY = mouseY - this.gameZone.top;
        
        if (this.isStartingScreenShown) {
            this.startingScreen.handleMouseMoveEvents(canvasMouseX, canvasMouseY);
        }
        
        if (this.isMenuShown) {
            this.menu.handleMouseMoveEvents(canvasMouseX, canvasMouseY);
        }
    }
    
    public renderScene(): void {
        this.ctx.drawImage(this.boardComputerImage, 0, 0);
        
        if (!this.isMenuShown) {
            this.ctx.drawImage(this.menuIcon, 10, 10);
        }
    }

    private isMouseInsideMenuIcon(mouseX: number, mouseY: number): boolean {
        return (
            mouseX > 10 &&
            mouseX < this.menuIcon.width + 10 &&
            mouseY > 10 &&
            mouseY < this.menuIcon.height + 10
        );
    }
}
