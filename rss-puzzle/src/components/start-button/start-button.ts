import { DestroyChilds } from '../../utilits/clean';
import { makeNewElement } from '../../utilits/makeNewElement';
import { GamePageController } from '../../views/game/game-conroller';

export class StartButton {
    private _className: string;

    constructor(className?: string) {
        this._className = className || 'start-button';
    }

    public drawsStartButton(): HTMLElement {
        const startButton = makeNewElement({
            selector: 'button',
            className: this._className,
            textContent: 'Start',
        });
        this.handleStart(startButton);
        return startButton;
    }

    private handleStart(button: HTMLButtonElement): void {
        button.addEventListener('click', () => {
            const destroyChilds = new DestroyChilds();
            destroyChilds.cleanBody();
            setTimeout(() => {
                const gamePageController = new GamePageController();
                gamePageController.drawGamePage();
            }, 1500);
        });
    }
}
