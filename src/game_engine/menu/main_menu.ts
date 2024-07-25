import { Game } from "../game";

export class MainMenu {

    private game;
    // gameZone;
    currentMenuScreen;
    menuLeftStartingX;
    menuTopStartingY;
    menuCenterX;
    menuCenterY;
    commandSpace;
    menuTopMargin;
    returnCommandPositionY;
    returnCommandWidth;
    returnCommandHeight;
    settingsCommandWidth;
    settingsCommandHeight;
    settingsCommandPositionY;
    exitCommandWidth;
    exitCommandHeight;
    exitCommandPositionY;
    menuX;
    menuY;
    isSettingsHighlightingOn;
    isMainMenuHighlightingOn;

    // settings
    settingsBackCommandPositionY;
    settingsBackCommandWidth;
    settingsBackCommandHeight;
    volumeDownButtonLeftX;
    volumeDownButtonUpperY;
    volumeDownButtonWidth;
    volumeDownButtonHeight;
    volumeUpButtonLeftX;
    volumeUpButtonUpperY;
    volumeUpButtonWidth;
    volumeUpButtonHeight;
    menuWidth: number;
    menuHeight: number;
    returnCommandPositionX: number;

    constructor(game: Game) {
        this.game = game;
        this.currentMenuScreen = "none"; // "main", "settings"
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

        this.volumeDownButtonLeftX = 32;
        this.volumeDownButtonUpperY = 75;
        this.volumeDownButtonWidth = 20;
        this.volumeDownButtonHeight = 20;
        this.volumeUpButtonLeftX = 157;
        this.volumeUpButtonUpperY = 73;
        this.volumeUpButtonWidth = 20;
        this.volumeUpButtonHeight = 20;
    }

    handleMouseClickEvents(canvasMouseX: number, canvasMouseY: number) {
        var menuMouseX = canvasMouseX - this.menuX;
        var menuMouseY = canvasMouseY - this.menuY;

        if (
            this.currentMenuScreen === "main" &&
            this.isMouseOverReturnCommand(menuMouseX, menuMouseY)
        ) {
            this.closeMenu();
        }
        else if (
            this.currentMenuScreen === "main" &&
            this.isMouseOverExitCommand(menuMouseX, menuMouseY)
        ) {
            this.closeMenu();
            this.game.isStartingScreenShown = true;
            this.game.startingScreen.showScreen();
        }
        else if (
            this.currentMenuScreen === "main" &&
            this.isMouseOverSettingsCommand(menuMouseX, menuMouseY)
        ) {
            this.showSettingsMenu();
        }
        else if (this.currentMenuScreen === "settings") {
            console.log("setting menu");
            if (this.isMouseOverVolumeDownButton(menuMouseX, menuMouseY)) {

                if (this.game.gameSound.getBackgroundMusicVolume() > 0) {
                    this.game.gameSound.lesserVolume();
                }

                this.game.renderScene();
                this.showBlankMenu(this.game.menuImage);

                this.renderSettingsMenu();
            }
            else if (this.isMouseOverVolumeUpButton(menuMouseX, menuMouseY)) {

                if (this.game.gameSound.getBackgroundMusicVolume() < 1) {
                    this.game.gameSound.growVolume();
                }

                this.game.renderScene();
                this.showBlankMenu(this.game.menuImage);

                this.renderSettingsMenu();
            }
            else if (this.isMouseOverSettingsBackCommand(menuMouseX, menuMouseY)) {
                this.currentMenuScreen = "main";

                this.game.renderScene();
                this.showMainMenu(menuMouseX, menuMouseX);
            }
        }
    }

    handleMouseMoveEvents(canvasMouseX: number, canvasMouseY: number) {
        var menuMouseX = canvasMouseX - this.menuX;
        var menuMouseY = canvasMouseY - this.menuY;

        if (this.currentMenuScreen === "main") {
            if (this.isMouseOverReturnCommand(menuMouseX, menuMouseY)) {
                this.isMainMenuHighlightingOn = true;
                this.game.ctx.strokeStyle = "black";
                this.game.ctx.lineWidth = 2;
                this.game.ctx.strokeRect(
                    this.menuX + this.getCommandLeftX(this.returnCommandWidth) - 2,
                    this.menuY + this.getCommandUpperY(this.returnCommandPositionY),
                    this.returnCommandWidth + 6,
                    this.returnCommandHeight + 8
                );
            } else if (this.isMouseOverSettingsCommand(menuMouseX, menuMouseY)) {
                this.isMainMenuHighlightingOn = true;
                this.game.ctx.strokeStyle = "black";
                this.game.ctx.lineWidth = 2;
                this.game.ctx.strokeRect(
                    this.menuX + this.getCommandLeftX(this.settingsCommandWidth) - 2,
                    this.menuY + this.getCommandUpperY(this.settingsCommandPositionY),
                    this.settingsCommandWidth + 6,
                    this.settingsCommandHeight + 8
                );
            } else if (this.isMouseOverExitCommand(menuMouseX, menuMouseY)) {
                this.isMainMenuHighlightingOn = true;
                this.game.ctx.strokeStyle = "black";
                this.game.ctx.lineWidth = 2;
                this.game.ctx.strokeRect(
                    this.menuX + this.getCommandLeftX(this.exitCommandWidth) - 2,
                    this.menuY + this.getCommandUpperY(this.exitCommandPositionY),
                    this.exitCommandWidth + 6,
                    this.exitCommandHeight + 8
                );
            }
            else {
                if (this.isMainMenuHighlightingOn) {
                    this.game.renderScene();
                    this.showMainMenu(menuMouseX, menuMouseY);

                    this.isMainMenuHighlightingOn = false;
                }
            }
        }
        else if (this.currentMenuScreen == "settings") {
            if (this.isMouseOverSettingsBackCommand(menuMouseX, menuMouseY)) {
                this.isSettingsHighlightingOn = true;
                this.game.ctx.strokeStyle = "black";
                this.game.ctx.lineWidth = 2;
                this.game.ctx.strokeRect(
                    this.menuX + this.getCommandLeftX(this.settingsBackCommandWidth) - 2,
                    this.menuY + this.getCommandUpperY(this.settingsBackCommandPositionY),
                    this.settingsBackCommandWidth + 6,
                    this.settingsBackCommandHeight + 8
                );
            }
            else {
                if (this.isSettingsHighlightingOn) { 
                    this.isSettingsHighlightingOn = false; 
                    this.game.renderScene();
                    this.showBlankMenu(this.game.menuImage);

                    this.renderSettingsMenu();
                }
            }
        }
    }

    isMouseOverReturnCommand(mouseX: number, mouseY: number) {
        return this.isMouseOverCommand(
            mouseX,
            mouseY,
            this.returnCommandPositionY,
            this.returnCommandWidth,
            this.returnCommandHeight
        );
    }

    isMouseOverSettingsCommand(mouseX: number, mouseY: number) {
        return this.isMouseOverCommand(
            mouseX,
            mouseY,
            this.settingsCommandPositionY,
            this.settingsCommandWidth,
            this.settingsCommandHeight
        );
    }

    isMouseOverExitCommand(mouseX: number, mouseY: number) {
        return this.isMouseOverCommand(
            mouseX,
            mouseY,
            this.exitCommandPositionY,
            this.exitCommandWidth,
            this.exitCommandHeight
        );
    }

    // settings menu
    isMouseOverSettingsBackCommand(mouseX: number, mouseY: number) {
        return this.isMouseOverCommand(
            mouseX,
            mouseY,
            this.settingsBackCommandPositionY,
            this.settingsBackCommandWidth,
            this.settingsBackCommandHeight
        );
    }

    isMouseOverCommand(
        mouseX: number,
        mouseY: number,
        commandPositionY: number,
        commandWidth: number,
        commandHeight: number
    ) {
        return (
            mouseX > this.getCommandLeftX(commandWidth) && 
            mouseX < this.getCommandRightX(commandWidth) &&
            mouseY > this.getCommandUpperY(commandPositionY) &&
            mouseY < this.getCommandLowerY(commandPositionY, commandHeight)
        );
    }

    closeMenu() {
        console.log("closeMenu()");
        this.game.isMenuShown = false;
        this.currentMenuScreen = "none";
        this.game.renderScene();
    }

    showSettingsMenu() {
        this.currentMenuScreen = "settings";
        this.game.renderScene();
        this.showBlankMenu(this.game.menuImage);
        this.renderSettingsMenu();
    }

    getCommandLeftX(commandWidth: number) {
        return this.menuWidth / 2 - commandWidth / 2;
    }

    getCommandRightX(commandWidth: number) {
        return this.menuWidth / 2 + commandWidth / 2;
    }

    getCommandUpperY(commandY: number) {
        return commandY;
    }

    getCommandLowerY(commandY: number, commandHeight: number) {
        return commandY + commandHeight;
    }

    isMouseOverVolumeDownButton(mouseX: number, mouseY: number) {
        return this.isMouseOverButton(
            mouseX, 
            mouseY, 
            this.volumeDownButtonLeftX, 
            this.volumeDownButtonUpperY, 
            this.volumeDownButtonWidth, 
            this.volumeDownButtonHeight
        );
    }

    isMouseOverVolumeUpButton(mouseX: number, mouseY: number) {
        return this.isMouseOverButton(
            mouseX, 
            mouseY, 
            this.volumeUpButtonLeftX, 
            this.volumeUpButtonUpperY, 
            this.volumeUpButtonWidth, 
            this.volumeUpButtonHeight
        );
    }

    // isMouseOverBackButton(mouseX, mouseY) {
    //     return this.isMouseOverButton(
    //         mouseX, 
    //         mouseY, 
    //         this.volumeUpButtonLeftX, 
    //         this.volumeUpButtonUpperY, 
    //         this.volumeUpButtonWidth, 
    //         this.volumeUpButtonHeight
    //     );
    // }

    isMouseOverButton(
        mouseX: number,
        mouseY: number,
        leftUpperX: number,
        topUpperY: number,
        commandWidth: number,
        commandHeight: number
    ) {
        // console.log("mouse x: " + mouseX      );
        // console.log("mouse y: " + mouseY      );
        // console.log("upper left x: " + leftUpperX        );
        // console.log("upper top y: " + topUpperY        );
        // console.log("return lower y: " +  this.getCommandLowerY(menuY, commandPositionY, commandHeight)        );

        return (
            mouseX > leftUpperX &&
            mouseX < leftUpperX + commandWidth &&
            mouseY > topUpperY &&
            mouseY < topUpperY + commandHeight
        );
    }

    renderSettingsMenu() {
        this.game.ctx.fillStyle = "#000000";
        this.game.ctx.font = "30px Arial";
        this.game.ctx.fillText("Volume: ", this.convertToCanvasX(this.menuCenterX - 50), this.convertToCanvasY(50));
        this.game.ctx.fillText("-", this.convertToCanvasX(30), this.convertToCanvasY(100));
        this.game.ctx.strokeRect(this.convertToCanvasX(25), this.convertToCanvasY(82), 20, 20);

        this.game.ctx.fillText(this.game.gameSound.getVolumeInPercentage(), this.convertToCanvasX(70), this.convertToCanvasY(102));

        this.game.ctx.fillText("+", this.convertToCanvasX(167), this.convertToCanvasY(103));
        this.game.ctx.strokeRect(this.convertToCanvasX(166), this.convertToCanvasY(82), 20, 20);

        this.game.ctx.fillText("Back", this.convertToCanvasX(this.menuCenterX - 30), this.convertToCanvasY(230));
    }

    showMenu(mouseX: any, mouseY: any) {
        this.currentMenuScreen = "main";
        this.game.renderScene();
        this.showMainMenu(mouseX, mouseY);
    }

    showMainMenu(mouseX: string | number, mouseY: string | number) {
        this.showBlankMenu(this.game.menuImage);

        this.game.ctx.fillStyle = "#000000";
        this.game.ctx.font = "30px Arial";
        this.game.ctx.fillText(
            "Return",
            this.convertToCanvasX(this.getCommandLeftX(this.returnCommandWidth)),
            this.convertToCanvasY(this.getCommandLowerY(this.returnCommandPositionY, this.returnCommandHeight)));
        this.game.ctx.fillText(
            "Settings",
            this.convertToCanvasX(this.getCommandLeftX(this.settingsCommandWidth)),
            this.convertToCanvasY(this.getCommandLowerY(this.settingsCommandPositionY, this.settingsCommandHeight)));
        this.game.ctx.fillText(
            "Exit",
            this.convertToCanvasX(this.getCommandLeftX(this.exitCommandWidth)),
            this.convertToCanvasY(this.getCommandLowerY(this.exitCommandPositionY, this.exitCommandHeight)));

        this.game.ctx.font = "16px Arial";
        this.game.ctx.fillText("x: " + mouseX, this.convertToCanvasX(20), this.convertToCanvasY(200));
        this.game.ctx.fillText("y: " + mouseY, this.convertToCanvasX(110), this.convertToCanvasY(200));
        this.game.ctx.fillText("canvas.rigth: " + this.game.gameZone.right, this.convertToCanvasX(20), this.convertToCanvasY(250));
        this.game.ctx.fillText("canvas.bottom: " + this.game.gameZone.bottom, this.convertToCanvasX(20), this.convertToCanvasY(300));
    }

    showBlankMenu(image: CanvasImageSource) {
        var menuLeftStartingX = this.game.gameZone.right / 2 - this.menuWidth / 2;
        var menuTopStartingY = this.game.gameZone.bottom / 2 - this.menuHeight / 2;
        this.game.ctx.drawImage(image, menuLeftStartingX, menuTopStartingY);
    }

    convertToCanvasX(x: number) {
        return this.menuX + x; 
    }

    convertToCanvasY(y: number) {
        return this.menuY + y; 
    }
}