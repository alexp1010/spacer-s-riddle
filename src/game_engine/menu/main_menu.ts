import { Game } from "../game";
import { MenuScreens } from "./screens";
import { MainMenuScreen } from "./screens/main_menu_screen";
import { MenuScreen } from "./screens/menu_screen";
import { SettingsMenuScreen } from "./screens/settings_menu_screen";

export class MainMenu {

    private game: Game;
    // gameZone;
    private currentMenuScreenName: string;
    private currentMenuScreen: MenuScreen;
    private menuLeftStartingX: number;
    private menuTopStartingY: number;
    private menuCenterX: number;
    private menuCenterY: number;
    private commandSpace: number;
    private menuTopMargin: number;
    private returnCommandPositionY: number;
    private returnCommandWidth: number;
    private returnCommandHeight: number;
    private settingsCommandWidth: number;
    private settingsCommandHeight: number;
    private settingsCommandPositionY: number;
    private exitCommandWidth: number;
    private exitCommandHeight: number;
    private exitCommandPositionY: number;
    private menuX: number;
    private menuY: number;
    private isSettingsHighlightingOn: boolean;
    private isMainMenuHighlightingOn: boolean;

    // settings
    private settingsBackCommandPositionY: number;
    private settingsBackCommandWidth: number;
    private settingsBackCommandHeight: number;
    private menuWidth: number;
    private menuHeight: number;
    private returnCommandPositionX: number;

    private mainMenuScreen: MenuScreen;
    private settingsMenuScreen: MenuScreen;

    constructor(game: Game) {
        this.game = game;
        this.currentMenuScreenName = "none"; // "main", "settings"
        this.menuWidth = 290;
        this.menuHeight = 498;
        this.menuLeftStartingX = this.game.gameZone.right / 2 - this.menuWidth / 2;
        this.menuTopStartingY = this.game.gameZone.bottom / 2 - this.menuHeight / 2;
        this.menuCenterX = this.menuWidth / 2;
        this.menuCenterY = this.menuHeight / 2;
        this.menuX = this.game.gameZone.right / 2 - this.menuWidth / 2;
        this.menuY = this.game.gameZone.bottom / 2 - this.menuHeight / 2;
        this.commandSpace = 20;
        this.menuTopMargin = 20;
        this.returnCommandWidth = 90;
        this.returnCommandHeight = 30;
        this.returnCommandPositionX = this.menuTopMargin;
        this.returnCommandPositionY = this.menuTopMargin;
        this.settingsCommandWidth = 107;
        this.settingsCommandHeight = 30;
        this.settingsCommandPositionY = this.returnCommandPositionY + this.returnCommandHeight + this.commandSpace;
        this.exitCommandWidth = 50;
        this.exitCommandHeight = 30;
        this.exitCommandPositionY = this.settingsCommandPositionY + this.settingsCommandHeight + this.commandSpace;
        this.isSettingsHighlightingOn = false;
        this.isMainMenuHighlightingOn = false;

        this.settingsBackCommandPositionY = 210;
        this.settingsBackCommandWidth = 80;
        this.settingsBackCommandHeight = 30;

        this.mainMenuScreen = new MainMenuScreen(this.game, this, this.menuX, this.menuY, this.menuTopMargin, this.commandSpace);
        this.settingsMenuScreen = new SettingsMenuScreen(this.game, this, this.menuX, this.menuY, this.menuCenterX);
    }

    public handleMouseClickEvents(canvasMouseX: number, canvasMouseY: number): void {
        // var menuMouseX = canvasMouseX - this.menuX;
        // var menuMouseY = canvasMouseY - this.menuY;
        
        this.currentMenuScreen.handleMouseClickEvents(canvasMouseX, canvasMouseY);
    }

    public handleMouseMoveEvents(canvasMouseX: number, canvasMouseY: number): void {
        // var menuMouseX = canvasMouseX - this.menuX;
        // var menuMouseY = canvasMouseY - this.menuY;

        this.currentMenuScreen.handleMouseMoveEvents(canvasMouseX, canvasMouseY);
    }

    public isMouseOverCommand(
        mouseX: number,
        mouseY: number,
        commandPositionY: number,
        commandWidth: number,
        commandHeight: number
    ): boolean {
        return (
            mouseX > this.getCommandLeftX(commandWidth) && 
            mouseX < this.getCommandRightX(commandWidth) &&
            mouseY > this.getCommandUpperY(commandPositionY) &&
            mouseY < this.getCommandLowerY(commandPositionY, commandHeight)
        );
    }

    public closeMenu(): void {
        console.log("closeMenu()");
        this.game.isMenuShown = false;
        this.currentMenuScreenName = "none";
        this.game.renderCurrentScene();
    }

    public showSettingsMenu(): void {
        this.currentMenuScreenName = "settings";
        this.game.renderCurrentScene();
        this.showBlankMenu(this.game.menuImage);
        this.getCurrentMenuScreen().showMenu(0, 0);
    }

    public getCommandLeftX(commandWidth: number): number {
        return this.menuWidth / 2 - commandWidth / 2;
    }

    public getCommandRightX(commandWidth: number): number {
        return this.menuWidth / 2 + commandWidth / 2;
    }

    public getCommandUpperY(commandY: number): number {
        return commandY;
    }

    public getCommandLowerY(commandY: number, commandHeight: number): number {
        return commandY + commandHeight;
    }

    private isMouseOverButton (
        mouseX: number,
        mouseY: number,
        leftUpperX: number,
        topUpperY: number,
        commandWidth: number,
        commandHeight: number
    ): boolean {
        return (
            mouseX > leftUpperX &&
            mouseX < leftUpperX + commandWidth &&
            mouseY > topUpperY &&
            mouseY < topUpperY + commandHeight
        );
    }

    public showMenu(mouseX: number, mouseY: number): void {
        this.setCurrentMenuScreen(MenuScreens.main);
        this.game.renderCurrentScene();
        this.currentMenuScreen.showMenu(mouseX, mouseY);
    }

    public showBlankMenu(image: CanvasImageSource): void {
        var menuLeftStartingX = this.game.gameZone.right / 2 - this.menuWidth / 2;
        var menuTopStartingY = this.game.gameZone.bottom / 2 - this.menuHeight / 2;
        this.game.ctx.drawImage(image, menuLeftStartingX, menuTopStartingY);
    }

    public convertToCanvasX(x: number): number {
        return this.menuX + x; 
    }

    public convertToCanvasY(y: number): number {
        return this.menuY + y; 
    }

    public setCurrentMenuScreen(menuScreenName: string): void {
        this.currentMenuScreen = this.getSceneByName(menuScreenName);
    }

    private getSceneByName(menuScreenName: string): MenuScreen {
        let screen: MenuScreen;

        switch (menuScreenName) {
            case MenuScreens.main: {
                screen = this.mainMenuScreen;
                break;
            }
            case MenuScreens.settings: {
                screen = this.settingsMenuScreen;
                break;
            }
            default: {
                screen = this.mainMenuScreen;
            }
        }

        return screen;
    }

    public getCurrentMenuScreen(): MenuScreen {
        return this.currentMenuScreen;
    }
}