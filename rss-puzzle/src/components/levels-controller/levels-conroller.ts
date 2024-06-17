import { ChangeLevel } from '../../utilits/changeLevelRound';
import { DestroyChilds } from '../../utilits/clean';
import { isHTMLElement, isNotNullable } from '../../utilits/common';
import { GameStateController } from '../../utilits/game-state';
import { makeNewElement } from '../../utilits/makeNewElement';
import { CloseButton } from '../close-button/closeButton';
import { RoundsBlock } from '../rounds/rounds';

export class LevelController {
    public draw(): HTMLElement {
        const levelControllerButton = makeNewElement({
            selector: 'div',
            className: 'level-controller',
            textContent: 'Levels / Rounds',
        });
        this.openLevelBlock(levelControllerButton);
        return levelControllerButton;
    }

    public addLevelsBlock() {
        const levelsBlock = makeNewElement({
            selector: 'div',
            className: 'levels-modal',
        });
        const closeButtonInstance = new CloseButton('levels-modal', 'levels-modal_oppened');
        closeButtonInstance.closeLevelsModal(levelsBlock);
        const levelsModalWindow = this.addLevelsModal();
        levelsBlock.appendChild(levelsModalWindow);
        return levelsBlock;
    }

    private addLevelsModal() {
        const levelModalWindow = makeNewElement({
            selector: 'div',
            className: 'levels-window',
        });
        const closeButtonInstance = new CloseButton('levels-modal', 'levels-modal_oppened');
        const closeButton = closeButtonInstance.draw();
        levelModalWindow.appendChild(closeButton);
        const levelsSide = makeNewElement({
            selector: 'div',
            className: 'levels-side',
        });
        const levelBlockHeader = makeNewElement({
            selector: 'div',
            className: 'levels-side__header',
            textContent: 'Levels',
        });
        levelsSide.appendChild(levelBlockHeader);
        this.addLevels(levelsSide);
        levelModalWindow.appendChild(levelsSide);
        const roundsBlock = new RoundsBlock().draw();
        levelModalWindow.appendChild(roundsBlock);
        return levelModalWindow;
    }

    private addLevels(levelsSide: HTMLElement) {
        const gameStates = new GameStateController();
        const currentLevel = gameStates.getCurrentLevel();
        for (let i = 1; i < 7; i += 1) {
            const level = makeNewElement({
                selector: 'div',
                className: 'level-block',
                textContent: `${i}`,
            });
            if (i === currentLevel) {
                level.classList.add('level-block_chosen');
            }
            this.chooseLevel(level);
            if (isNotNullable(levelsSide)) {
                levelsSide.appendChild(level);
            }
        }
    }

    private openLevelBlock(levelControllerButton: HTMLElement) {
        levelControllerButton.addEventListener('click', () => {
            const levelsBlock = document.querySelector('.levels-modal');
            if (isHTMLElement(levelsBlock)) {
                levelsBlock.classList.toggle('levels-modal_oppened');
            }
        });
    }

    private chooseLevel(levelBlock: HTMLElement) {
        levelBlock.addEventListener('click', () => {
            const levels = document.querySelectorAll('.level-block');
            levels.forEach((level) => {
                level.classList.remove('level-block_chosen');
            });
            levelBlock.classList.add('level-block_chosen');
            const changeLevel = new ChangeLevel();
            const levelsModal = document.querySelector('.levels-modal');
            if (isHTMLElement(levelsModal)) {
                if (levelsModal.classList.contains('levels-modal_oppened')) {
                    const newLevel = Number(levelBlock.textContent);
                    changeLevel.changeLevel(newLevel);
                    const roundsBlock = document.querySelector('.rounds-block');
                    if (isHTMLElement(roundsBlock)) {
                        const destroyChilds = new DestroyChilds();
                        destroyChilds.cleanElement(roundsBlock);
                        setTimeout(() => {
                            const roundsInstance = new RoundsBlock();
                            roundsInstance.addRounds(roundsBlock);
                        }, 1100);
                    }
                }
            }
        });
    }
}
