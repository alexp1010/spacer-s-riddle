import { GameSound } from "./sound_engine/game_sound";
import { ResourcesLoader } from "./resources_loading/resources_loader";
import { StartingScreen } from "./screens/starting_screen";
import { MainMenu } from "./menu/main_menu";

export class Game {

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    canvasWidth: number;
    canvasHeight: number;
    boardComputerImage: HTMLImageElement;
    // scene1Image;
    // scene2Image;
    menuIcon: HTMLImageElement;
    menuImage: HTMLImageElement;
    gameZone: DOMRect;
    isMenuShown: boolean;
    menu: MainMenu;
    resourcesLoader: ResourcesLoader;
    startingScreenImage: HTMLImageElement;
    startingScreen: StartingScreen;
    isStartingScreenShown: boolean;

    gameSound: GameSound;
    document: Document;

    constructor(document: Document) {
        this.document = document;
    }

    init() {
        this.gameSound = new GameSound();
        this.gameSound.loadBackgroundMusic("./sound/superspacy-atmosphere-106826.mp3", this.document);

        this.canvas = this.document.getElementById("background") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 614;
        this.canvas.height = 614;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.gameZone = this.canvas.getBoundingClientRect();

        this.ctx.fillStyle = "#000000";
        this.ctx.font = "30px Arial";
        this.ctx.textBaseline = "bottom";
        this.ctx.fillText(
            "Broom Broom Brahrahm...",
            50,
            60);

        this.startingScreen = new StartingScreen(this);

        this.resourcesLoader = new ResourcesLoader(this);
        this.resourcesLoader.loadResources();

        this.isStartingScreenShown = true;

        this.menu = new MainMenu(this);
        this.isMenuShown = false;
    }

    beginGame() {
        console.log("Begin game");
        this.startingScreen.showScreen();
        // this.showScreen();
        this.handleEvents();
    }

    showScreen() {
        this.ctx.drawImage(this.boardComputerImage, 0, 0);
        this.ctx.drawImage(this.menuIcon, 10, 10);
    }

    handleEvents() {
        this.initMouseClickHandler();
        this.initMouseMoveHandler();
    }

    initMouseClickHandler() {
        this.canvas.addEventListener("click", this.handleMouseClick.bind(this));
    }

    handleMouseClick(this: Game, e: any) {
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

    initMouseMoveHandler() {
        this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
    }

    handleMouseMove(e: any) {
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

    isMouseInsideMenuIcon(mouseX: number, mouseY: number) {
        return (
            mouseX > 10 &&
            mouseX < this.menuIcon.width + 10 &&
            mouseY > 10 &&
            mouseY < this.menuIcon.height + 10
        );
    }
}
