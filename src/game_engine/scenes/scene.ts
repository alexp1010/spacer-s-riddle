export interface Scene {
    showScreen(): void;
    handleMouseMoveEvents(canvasMouseX: number, canvasMouseY: number): void;
    handleMouseClickEvents(canvasMouseX: number, canvasMouseY: number): void;
}