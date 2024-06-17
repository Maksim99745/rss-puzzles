// import { GamePageController } from '../views/game/game-conroller';
import { ResultLine } from '../components/result-line/result-line';
import { RoundsBlock } from '../components/rounds/rounds';
import { DestroyChilds } from './clean';
import { isHTMLElement, isNotNullable } from './common';
import { GameStateController } from './game-state';
import { Validation } from './validation';

export class ChangeLevel {
    public changeLevel(level: number) {
        const gameState = new GameStateController();
        const currentLevel = gameState.getCurrentLevel();
        if (currentLevel !== level) {
            gameState.setNewLevel(level);
            this.changeRound();
        }
    }

    public async changeRound() {
        const resultBlock = document.querySelector('.result-block');
        const sourcesBlock = document.querySelector('.sources-block');
        const cleanElement = new DestroyChilds();
        if (isHTMLElement(resultBlock) && isHTMLElement(sourcesBlock)) {
            cleanElement.cleanElement(resultBlock);
            cleanElement.cleanElement(sourcesBlock);
        }
        setTimeout(() => {
            const newReultsLine = new ResultLine();
            newReultsLine.draw();

            const validation = new Validation();
            validation.currentSentenceValidation();
        }, 1300);
    }

    public changeCurrentRoundDecoration() {
        const localStorageJSON = localStorage.getItem('RSS-Puzzle');
        if (isNotNullable(localStorageJSON)) {
            const localStorageData = JSON.parse(localStorageJSON);
            const gameStates = new GameStateController();
            const currentLevel = String(gameStates.getCurrentLevel());
            const currentRound = localStorageData.rounds[currentLevel].last;
            const incrementedRound = currentRound + 1;
            const roundBlocks = document.querySelectorAll('.round-block');
            const currentRoundBlock = roundBlocks[currentRound];
            currentRoundBlock.classList.remove('current-round');
            const newRound = roundBlocks[incrementedRound];
            newRound.classList.add('current-round');
        }
    }

    public changeCurrentLevelDecoration() {
        const levels = document.querySelectorAll('.level-block');
        levels.forEach((level) => {
            level.classList.remove('level-block_chosen');
        });
        const gameState = new GameStateController();
        let currentLevelNumber = gameState.getCurrentLevel();
        if (currentLevelNumber === 6) {
            currentLevelNumber = 0;
        }
        const currentLevelBlock = levels[currentLevelNumber];
        if (isHTMLElement(currentLevelBlock)) {
            currentLevelBlock.classList.add('level-block_chosen');
        }
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
