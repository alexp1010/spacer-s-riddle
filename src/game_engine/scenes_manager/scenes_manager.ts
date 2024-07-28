import { Game } from "../game";
import { MainMenu } from "../menu/main_menu";
import { Scene } from "../scenes/scene";
import { Scene1 } from "../scenes/scene1";
import { Scenes } from "../scenes/scenes";

export class ScenesManager {
    private currentScene: Scene;
    private scene1: Scene;
    // private scene2: Scene;

    constructor(private game: Game) {
        this.scene1 = new Scene1(this.game);
    }

    public setCurrentScene(sceneName: string): void {
        this.currentScene = this.getSceneByName(sceneName);
    }

    private getSceneByName(sceneName: string): Scene {
        let scene: Scene;

        switch (sceneName) {
            case Scenes.scene1: {
                scene = this.scene1;
                break;
            }
            default: {
                scene = this.scene1;
            }
        }

        return scene;
    }

    public showCurrentScene(): void {
        this.currentScene.showScreen();
    }
    
    public handleMouseClickEvents(canvasMouseX: number, canvasMouseY: number): void {
        this.currentScene.handleMouseClickEvents(canvasMouseX, canvasMouseY);
    }

    public handleMouseMoveEvents(canvasMouseX: number, canvasMouseY: number): void {
        this.currentScene.handleMouseMoveEvents(canvasMouseX, canvasMouseY);
    }
}