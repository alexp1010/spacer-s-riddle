import { Game } from "../../game";
import { MainMenu } from "../main_menu";
import { MenuScreens } from "../screens";
import { MenuScreen } from "./menu_screen";

export class SettingsMenuScreen implements MenuScreen {
    private isSettingsHighlightingOn: boolean;
    private settingsBackCommandPositionY: number;
    private settingsBackCommandWidth: number;
    private settingsBackCommandHeight: number;
    private volumeDownButtonLeftX: number;
    private volumeDownButtonUpperY: number;
    private volumeDownButtonWidth: number;
    private volumeDownButtonHeight: number;
    private volumeUpButtonLeftX: number;
    private volumeUpButtonUpperY: number;
    private volumeUpButtonWidth: number;
    private volumeUpButtonHeight: number;

    constructor(private game: Game,
                private menuManager: MainMenu,
                private menuX: number,
                private menuY: number,
                private menuCenterX: number) {

        this.isSettingsHighlightingOn = false;
        this.settingsBackCommandPositionY = 210;
        this.settingsBackCommandWidth = 80;
        this.settingsBackCommandHeight = 30;

        this.volumeDownButtonLeftX = 32;
        this.volumeDownButtonUpperY = 75;
        this.volumeDownButtonWidth = 20;
        this.volumeDownButtonHeight = 20;
        this.volumeUpButtonLeftX = 157;
        this.volumeUpButtonUpperY = 73;
        this.volumeUpButtonWidth = 20;
        this.volumeUpButtonHeight = 20;
    }

    public getMenuName(): string {
        return MenuScreens.main;
    }

    public showMenu(): void {
        this.game.ctx.fillStyle = "#000000";
        this.game.ctx.font = "30px Arial";
        this.game.ctx.fillText("Volume: ", this.menuManager.convertToCanvasX(this.menuCenterX - 50), this.menuManager.convertToCanvasY(50));
        this.game.ctx.fillText("-", this.menuManager.convertToCanvasX(30), this.menuManager.convertToCanvasY(100));
        this.game.ctx.strokeRect(this.menuManager.convertToCanvasX(25), this.menuManager.convertToCanvasY(82), 20, 20);

        this.game.ctx.fillText(this.game.gameSound.getVolumeInPercentage(), this.menuManager.convertToCanvasX(70), this.menuManager.convertToCanvasY(102));

        this.game.ctx.fillText("+", this.menuManager.convertToCanvasX(167), this.menuManager.convertToCanvasY(103));
        this.game.ctx.strokeRect(this.menuManager.convertToCanvasX(166), this.menuManager.convertToCanvasY(82), 20, 20);

        this.game.ctx.fillText("Back", this.menuManager.convertToCanvasX(this.menuCenterX - 30), this.menuManager.convertToCanvasY(230));
    }

    public handleMouseMoveEvents(canvasMouseX: number, canvasMouseY: number): void {
        var menuMouseX = canvasMouseX - this.menuX;
        var menuMouseY = canvasMouseY - this.menuY;

        if (this.isMouseOverSettingsBackCommand(menuMouseX, menuMouseY)) {
            this.isSettingsHighlightingOn = true;
            this.game.ctx.strokeStyle = "black";
            this.game.ctx.lineWidth = 2;
            this.game.ctx.strokeRect(
                this.menuX + this.menuManager.getCommandLeftX(this.settingsBackCommandWidth) - 2,
                this.menuY + this.menuManager.getCommandUpperY(this.settingsBackCommandPositionY),
                this.settingsBackCommandWidth + 6,
                this.settingsBackCommandHeight + 8
            );
        }
        else {
            if (this.isSettingsHighlightingOn) { 
                this.isSettingsHighlightingOn = false; 
                this.game.renderCurrentScene();
                this.menuManager.showBlankMenu(this.game.menuImage);

                this.renderSettingsMenu();
            }
        }
    }

    private renderSettingsMenu(): void {
        this.game.ctx.fillStyle = "#000000";
        this.game.ctx.font = "30px Arial";
        this.game.ctx.fillText("Volume: ", this.menuManager.convertToCanvasX(this.menuCenterX - 50), this.menuManager.convertToCanvasY(50));
        this.game.ctx.fillText("-", this.menuManager.convertToCanvasX(30), this.menuManager.convertToCanvasY(100));
        this.game.ctx.strokeRect(this.menuManager.convertToCanvasX(25), this.menuManager.convertToCanvasY(82), 20, 20);

        this.game.ctx.fillText(this.game.gameSound.getVolumeInPercentage(), this.menuManager.convertToCanvasX(70), this.menuManager.convertToCanvasY(102));

        this.game.ctx.fillText("+", this.menuManager.convertToCanvasX(167), this.menuManager.convertToCanvasY(103));
        this.game.ctx.strokeRect(this.menuManager.convertToCanvasX(166), this.menuManager.convertToCanvasY(82), 20, 20);

        this.game.ctx.fillText("Back", this.menuManager.convertToCanvasX(this.menuCenterX - 30), this.menuManager.convertToCanvasY(230));
    }

    private isMouseOverSettingsBackCommand(mouseX: number, mouseY: number): boolean {
        return this.menuManager.isMouseOverCommand(
            mouseX,
            mouseY,
            this.settingsBackCommandPositionY,
            this.settingsBackCommandWidth,
            this.settingsBackCommandHeight
        );
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

    public handleMouseClickEvents(canvasMouseX: number, canvasMouseY: number): void {
        var menuMouseX = canvasMouseX - this.menuX;
        var menuMouseY = canvasMouseY - this.menuY;

        if (this.isMouseOverVolumeDownButton(menuMouseX, menuMouseY)) {

            if (this.game.gameSound.getBackgroundMusicVolume() > 0) {
                this.game.gameSound.lesserVolume();
            }

            this.game.renderCurrentScene();
            this.menuManager.showBlankMenu(this.game.menuImage);

            this.renderSettingsMenu();
        }
        else if (this.isMouseOverVolumeUpButton(menuMouseX, menuMouseY)) {

            if (this.game.gameSound.getBackgroundMusicVolume() < 1) {
                this.game.gameSound.growVolume();
            }

            this.game.renderCurrentScene();
            this.menuManager.showBlankMenu(this.game.menuImage);

            this.renderSettingsMenu();
        }
        else if (this.isMouseOverSettingsBackCommand(menuMouseX, menuMouseY)) {
            this.menuManager.setCurrentMenuScreen(MenuScreens.main);

            this.game.renderCurrentScene();
            this.menuManager.getCurrentMenuScreen().showMenu(menuMouseX, menuMouseY);
        }
    }

    private isMouseOverVolumeDownButton(mouseX: number, mouseY: number): boolean {
        return this.isMouseOverButton(
            mouseX, 
            mouseY, 
            this.volumeDownButtonLeftX, 
            this.volumeDownButtonUpperY, 
            this.volumeDownButtonWidth, 
            this.volumeDownButtonHeight
        );
    }

    private isMouseOverVolumeUpButton(mouseX: number, mouseY: number): boolean {
        return this.isMouseOverButton(
            mouseX, 
            mouseY, 
            this.volumeUpButtonLeftX, 
            this.volumeUpButtonUpperY, 
            this.volumeUpButtonWidth, 
            this.volumeUpButtonHeight
        );
    }
}