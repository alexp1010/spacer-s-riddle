import { Game } from "../../game";
import { MainMenu } from "../main_menu";
import { MenuScreens } from "../screens";
import { MenuScreen } from "./menu_screen";

export class MainMenuScreen implements MenuScreen {
    private isMainMenuHighlightingOn: boolean;
    private returnCommandPositionX: number;
    private returnCommandPositionY: number;
    private returnCommandWidth: number;
    private returnCommandHeight: number;
    private settingsCommandWidth: number;
    private settingsCommandHeight: number;
    private settingsCommandPositionY: number;
    private exitCommandWidth: number;
    private exitCommandHeight: number;
    private exitCommandPositionY: number;

    constructor(private game: Game,
        private menuManager: MainMenu,
        private menuX: number,
        private menuY: number,
        private menuTopMargin: number,
        private commandSpace: number
    ) {
        this.isMainMenuHighlightingOn = false;

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
    }

    public getMenuName(): string {
        return MenuScreens.main;
    }

    public showMenu(mouseX: number, mouseY: number): void {
        this.menuManager.showBlankMenu(this.game.menuImage);

        this.game.ctx.fillStyle = "#000000";
        this.game.ctx.font = "30px Arial";
        this.game.ctx.fillText(
            "Return",
            this.menuManager.convertToCanvasX(this.menuManager.getCommandLeftX(this.returnCommandWidth)),
            this.menuManager.convertToCanvasY(this.menuManager.getCommandLowerY(this.returnCommandPositionY, this.returnCommandHeight)));
        this.game.ctx.fillText(
            "Settings",
            this.menuManager.convertToCanvasX(this.menuManager.getCommandLeftX(this.settingsCommandWidth)),
            this.menuManager.convertToCanvasY(this.menuManager.getCommandLowerY(this.settingsCommandPositionY, this.settingsCommandHeight)));
        this.game.ctx.fillText(
            "Exit",
            this.menuManager.convertToCanvasX(this.menuManager.getCommandLeftX(this.exitCommandWidth)),
            this.menuManager.convertToCanvasY(this.menuManager.getCommandLowerY(this.exitCommandPositionY, this.exitCommandHeight)));

        this.game.ctx.font = "16px Arial";
        this.game.ctx.fillText("x: " + mouseX, this.menuManager.convertToCanvasX(20), this.menuManager.convertToCanvasY(200));
        this.game.ctx.fillText("y: " + mouseY, this.menuManager.convertToCanvasX(110), this.menuManager.convertToCanvasY(200));
        this.game.ctx.fillText("canvas.rigth: " + this.game.gameZone.right, this.menuManager.convertToCanvasX(20), this.menuManager.convertToCanvasY(250));
        this.game.ctx.fillText("canvas.bottom: " + this.game.gameZone.bottom, this.menuManager.convertToCanvasX(20), this.menuManager.convertToCanvasY(300));
    }

    public handleMouseMoveEvents(canvasMouseX: number, canvasMouseY: number): void {
        var menuMouseX = canvasMouseX - this.menuX;
        var menuMouseY = canvasMouseY - this.menuY;

        if (this.isMouseOverReturnCommand(menuMouseX, menuMouseY)) {
            this.isMainMenuHighlightingOn = true;
            this.game.ctx.strokeStyle = "black";
            this.game.ctx.lineWidth = 2;
            this.game.ctx.strokeRect(
                this.menuX + this.menuManager.getCommandLeftX(this.returnCommandWidth) - 2,
                this.menuY + this.menuManager.getCommandUpperY(this.returnCommandPositionY),
                this.returnCommandWidth + 6,
                this.returnCommandHeight + 8
            );
        } else if (this.isMouseOverSettingsCommand(menuMouseX, menuMouseY)) {
            this.isMainMenuHighlightingOn = true;
            this.game.ctx.strokeStyle = "black";
            this.game.ctx.lineWidth = 2;
            this.game.ctx.strokeRect(
                this.menuX + this.menuManager.getCommandLeftX(this.settingsCommandWidth) - 2,
                this.menuY + this.menuManager.getCommandUpperY(this.settingsCommandPositionY),
                this.settingsCommandWidth + 6,
                this.settingsCommandHeight + 8
            );
        } else if (this.isMouseOverExitCommand(menuMouseX, menuMouseY)) {
            this.isMainMenuHighlightingOn = true;
            this.game.ctx.strokeStyle = "black";
            this.game.ctx.lineWidth = 2;
            this.game.ctx.strokeRect(
                this.menuX + this.menuManager.getCommandLeftX(this.exitCommandWidth) - 2,
                this.menuY + this.menuManager.getCommandUpperY(this.exitCommandPositionY),
                this.exitCommandWidth + 6,
                this.exitCommandHeight + 8
            );
        }
        else {
            if (this.isMainMenuHighlightingOn) {
                this.game.renderCurrentScene();
                this.menuManager.getCurrentMenuScreen().showMenu(menuMouseX, menuMouseY);

                this.isMainMenuHighlightingOn = false;
            }
        }
    }

    private isMouseOverReturnCommand(mouseX: number, mouseY: number): boolean {
        return this.menuManager.isMouseOverCommand(
            mouseX,
            mouseY,
            this.returnCommandPositionY,
            this.returnCommandWidth,
            this.returnCommandHeight
        );
    }

    private isMouseOverSettingsCommand(mouseX: number, mouseY: number): boolean {
        return this.menuManager.isMouseOverCommand(
            mouseX,
            mouseY,
            this.settingsCommandPositionY,
            this.settingsCommandWidth,
            this.settingsCommandHeight
        );
    }

    private isMouseOverExitCommand(mouseX: number, mouseY: number): boolean {
        return this.menuManager.isMouseOverCommand(
            mouseX,
            mouseY,
            this.exitCommandPositionY,
            this.exitCommandWidth,
            this.exitCommandHeight
        );
    }

    public handleMouseClickEvents(canvasMouseX: number, canvasMouseY: number): void {
        var menuMouseX = canvasMouseX - this.menuX;
        var menuMouseY = canvasMouseY - this.menuY;

        if (this.isMouseOverReturnCommand(menuMouseX, menuMouseY)) {
            this.menuManager.closeMenu();
            this.game.returnToGame();
        }
        else if (this.isMouseOverExitCommand(menuMouseX, menuMouseY)) {
            this.menuManager.closeMenu();
            this.game.showStartingScreen();
        }
        else if (this.isMouseOverSettingsCommand(menuMouseX, menuMouseY)) {
            this.menuManager.setCurrentMenuScreen(MenuScreens.settings);
            this.menuManager.showBlankMenu(this.game.menuImage);
            this.menuManager.getCurrentMenuScreen().showMenu(0, 0);
        }
    }
}