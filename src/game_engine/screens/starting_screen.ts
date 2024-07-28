import { Game } from "../game";

export class StartingScreen {

    private game: Game;

    private startCommandWidth: number;
    private startCommandHeight: number;
    private startCommandPositionX: number;
    private startCommandPositionY: number;
    private settingsCommandWidth: number;
    private settingsCommandHeight: number;
    private settingsCommandPositionX: number;
    private settingsCommandPositionY: number;
    private credentialsCommandWidth: number;
    private credentialsCommandHeight: number;
    private credentialsCommandPositionX: number;
    private credentialsCommandPositionY: number;
    private soundOnCommandWidth: number;
    private soundOnCommandHeight: number;
    private soundOnCommandPositionX: number;
    private soundOnCommandPositionY: number;

    private isStartingScreenHighlightingOn: boolean;

    constructor(game: Game) {
        this.game = game;
        
        this.startCommandWidth = 80;
        this.startCommandHeight = 30;
        this.startCommandPositionX = this.game.canvas.width / 2;
        this.startCommandPositionY = 230;

        this.settingsCommandWidth = 120;
        this.settingsCommandHeight = 30;
        this.settingsCommandPositionX = this.game.canvas.width / 2;
        this.settingsCommandPositionY = 230 + 50;

        this.credentialsCommandWidth = 160;
        this.credentialsCommandHeight = 30;
        this.credentialsCommandPositionX = this.game.canvas.width / 2;
        this.credentialsCommandPositionY = 230 + 50 + 50;

        this.soundOnCommandWidth = 190;
        this.soundOnCommandHeight = 30;
        this.soundOnCommandPositionX = this.game.canvas.width / 2;
        this.soundOnCommandPositionY = 230 + 50 + 50 + 50;

        this.isStartingScreenHighlightingOn = false;
    }

    public showScreen(): void {
        this.game.ctx.drawImage(this.game.startingScreenImage, 0, 0);

        this.game.ctx.fillStyle = "#000000";
        this.game.ctx.font = "30px Arial";
        this.game.ctx.textBaseline = "bottom";
        // this.game.ctx.beginPath();
        // this.game.ctx.moveTo(0, this.startCommandPositionY + 0.5);
        // this.game.ctx.lineTo(550, this.startCommandPositionY + 0.5);
        // this.game.ctx.stroke();
        this.game.ctx.fillText(
            "Start",
            this.startCommandPositionX - this.startCommandWidth / 2,
            this.startCommandPositionY);
        this.game.ctx.fillText(
            "Settings",
            this.settingsCommandPositionX - this.settingsCommandWidth / 2,
            this.settingsCommandPositionY);
        this.game.ctx.fillText(
            "Credentials",
            this.credentialsCommandPositionX - this.credentialsCommandWidth / 2,
            this.credentialsCommandPositionY);
        this.game.ctx.fillText(
            "Sound On/Off",
            this.soundOnCommandPositionX - this.soundOnCommandWidth / 2,
            this.soundOnCommandPositionY);
    }

    handleMouseClickEvents(canvasMouseX: number, canvasMouseY: number) {
        var mouseX = canvasMouseX;
        var mouseY = canvasMouseY;

        console.log("starting screen events...");
        console.log("x: ", canvasMouseX);
        console.log("y: ", canvasMouseY);

        if (
            this.game.isStartingScreenShown &&
            this.isMouseOverStartCommand(mouseX, mouseY)
        ) {
            console.log("start...");
            this.game.isStartingScreenShown = false;
            this.game.beginGame();
        }
    }

    handleMouseMoveEvents(canvasMouseX: number, canvasMouseY: number) {
        var menuMouseX = canvasMouseX;
        var menuMouseY = canvasMouseY;

        // if (this.currentMenuScreen === "main") {
            if (this.isMouseOverStartCommand(menuMouseX, menuMouseY)) {
                this.isStartingScreenHighlightingOn = true;
                this.game.ctx.strokeStyle = "black";
                this.game.ctx.lineWidth = 2;
                this.game.ctx.strokeRect(
                    this.getCommandLeftX(this.startCommandWidth) - 2,
                    this.getCommandUpperY(this.startCommandPositionY, this.startCommandHeight),
                    this.startCommandWidth,
                    this.startCommandHeight
                );
            } 
            else if (this.isMouseOverSettingsCommand(menuMouseX, menuMouseY)) {
                this.isStartingScreenHighlightingOn = true;
                this.game.ctx.strokeStyle = "black";
                this.game.ctx.lineWidth = 2;
                this.game.ctx.strokeRect(
                    this.getCommandLeftX(this.settingsCommandWidth) - 2,
                    this.getCommandUpperY(this.settingsCommandPositionY, this.settingsCommandHeight),
                    this.settingsCommandWidth,
                    this.settingsCommandHeight
                );
            } 
            else if (this.isMouseOverCredentialsCommand(menuMouseX, menuMouseY)) {
                this.isStartingScreenHighlightingOn = true;
                this.game.ctx.strokeStyle = "black";
                this.game.ctx.lineWidth = 2;
                this.game.ctx.strokeRect(
                    this.getCommandLeftX(this.credentialsCommandWidth) - 2,
                    this.getCommandUpperY(this.credentialsCommandPositionY, this.credentialsCommandHeight),
                    this.credentialsCommandWidth,
                    this.credentialsCommandHeight
                );
            }
            else if (this.isMouseOverSoundOnCommand(menuMouseX, menuMouseY)) {
                this.isStartingScreenHighlightingOn = true;
                this.game.ctx.strokeStyle = "black";
                this.game.ctx.lineWidth = 2;
                this.game.ctx.strokeRect(
                    this.getCommandLeftX(this.soundOnCommandWidth) - 2,
                    this.getCommandUpperY(this.soundOnCommandPositionY, this.soundOnCommandHeight),
                    this.soundOnCommandWidth,
                    this.soundOnCommandHeight
                );
            }
            else {
                if (this.isStartingScreenHighlightingOn) {
                    // this.game.renderScene();
                    this.showScreen();

                    this.isStartingScreenHighlightingOn = false;
                }
            }
        // }
    }
    
    private isMouseOverStartCommand(mouseX: number, mouseY: number): boolean {
        return this.isMouseOverCommand(
            mouseX,
            mouseY,
            this.startCommandPositionY,
            this.startCommandWidth,
            this.startCommandHeight
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

    isMouseOverCredentialsCommand(mouseX: number, mouseY: number) {
        return this.isMouseOverCommand(
            mouseX,
            mouseY,
            this.credentialsCommandPositionY,
            this.credentialsCommandWidth,
            this.credentialsCommandHeight
        );
    }

    isMouseOverSoundOnCommand(mouseX: number, mouseY: number) {
        return this.isMouseOverCommand(
            mouseX,
            mouseY,
            this.soundOnCommandPositionY,
            this.soundOnCommandWidth,
            this.soundOnCommandHeight
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
            mouseY > this.getCommandUpperY(commandPositionY, commandHeight) &&
            mouseY < this.getCommandLowerY(commandPositionY)
        );
    }

    getCommandLeftX(commandWidth: number) {
        return this.game.canvas.width / 2 - commandWidth / 2;
    }

    getCommandRightX(commandWidth: number) {
        return this.game.canvas.width / 2 + commandWidth / 2;
    }

    getCommandUpperY(commandY: number, commandHeight: number) {
        return commandY - commandHeight;
    }

    getCommandLowerY(commandY: number) {
        return commandY;
    }
}