import { GameSound } from "./sound_engine/game_sound";
import { ResourcesLoader } from "./resources_loading/resources_loader";
import { StartingScreen } from "./screens/starting_screen";
import { MainMenu } from "./menu/main_menu";
import { ScenesManager } from "./scenes_manager/scenes_manager";
import { Scenes } from "./scenes/scenes";

export class Game {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    private canvasWidth: number;
    private canvasHeight: number;
    public boardComputerImage: HTMLImageElement;
    public menuIcon: HTMLImageElement;
    public menuImage: HTMLImageElement;
    public thoughtCloud: HTMLImageElement;
    public gameZone: DOMRect;
    public isMenuShown: boolean;
    public menu: MainMenu;
    private resourcesLoader: ResourcesLoader;
    public startingScreenImage: HTMLImageElement;
    public startingScreen: StartingScreen;
    public isStartingScreenShown: boolean;

    public gameSound: GameSound;
    private document: Document;
    private scenesManager: ScenesManager;
    public isGameActive: boolean;

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

        this.isGameActive = false;
        this.scenesManager = new ScenesManager(this);
        this.isStartingScreenShown = true;

        this.menu = new MainMenu(this);
        this.isMenuShown = false;
    }

    public loadGame(): void {
        console.log("Load game");
        this.startingScreen.showScreen();
        this.handleEvents();
    }

    public beginGame(): void {
        this.scenesManager.setCurrentScene(Scenes.scene1);
        this.scenesManager.showCurrentScene();
        this.isGameActive = true;

        this.gameSound.setMusic();
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
        else if (this.isGameActive) {
            this.scenesManager.handleMouseClickEvents(canvasMouseX, canvasMouseY);
            
            if (!this.isMenuShown && this.isMouseInsideMenuIcon(canvasMouseX, canvasMouseY)) {
                this.isGameActive = false;
                this.isMenuShown = true;
                this.menu.showMenu(mouseX, mouseY);
            }
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

        if (this.isGameActive) {
            this.scenesManager.handleMouseMoveEvents(canvasMouseX, canvasMouseY);
        }
        
        if (this.isMenuShown) {
            this.menu.handleMouseMoveEvents(canvasMouseX, canvasMouseY);
        }
    }
    
    public renderCurrentScene(): void {
        this.scenesManager.showCurrentScene();
    }

    private isMouseInsideMenuIcon(mouseX: number, mouseY: number): boolean {
        return (
            mouseX > 10 &&
            mouseX < this.menuIcon.width + 10 &&
            mouseY > 10 &&
            mouseY < this.menuIcon.height + 10
        );
    }

    public showStartingScreen(): void {
        this.isStartingScreenShown = true;
        this.startingScreen.showScreen();
        this.gameSound.setMusic2();
    }

    public returnToGame(): void {
        this.isGameActive = true;
    }
}
