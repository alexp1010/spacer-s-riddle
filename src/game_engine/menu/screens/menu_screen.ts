export interface MenuScreen {
    getMenuName(): string;
    showMenu(mouseX: number, mouseY: number): void;
    handleMouseMoveEvents(canvasMouseX: number, canvasMouseY: number): void;
    handleMouseClickEvents(canvasMouseX: number, canvasMouseY: number): void;
}