import * as _ from 'lodash';
import { Game } from './game_engine/game';

function createCanvasComponent() {
    const canvasElement = document.createElement('canvas');
    canvasElement.id = 'background';
  
    return canvasElement;
}

document.body.appendChild(createCanvasComponent());

let game = new Game(document);
game.init();
// game.beginGame();