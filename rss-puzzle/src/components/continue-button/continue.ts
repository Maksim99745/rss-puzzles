import { DestroyChilds } from '../../utilits/clean';
import { isHTMLElement } from '../../utilits/common';
import { GameStateController } from '../../utilits/game-state';
import { makeNewElement } from '../../utilits/makeNewElement';
import { RemoveWordCardsCheckers } from '../../utilits/removeWordCardsCheckers';
import { Validation } from '../../utilits/validation';
import { GamePageController } from '../../views/game/game-conroller';
import { ResultLine } from '../result-line/result-line';

export class ContinueButton {
    draw() {
        const continueButton = makeNewElement({ selector: 'button', className: 'continue-button' });
        continueButton.setAttribute('disabled', '');
        continueButton.textContent = 'Continue';
        const cleanFromCheckers = new RemoveWordCardsCheckers();
        cleanFromCheckers.cleanWordCards(continueButton);
        this.continueGame(continueButton);
        return continueButton;
    }

    private async changeRound() {
        const resultBlock = document.querySelector('.result-block');
        const cleanElement = new DestroyChilds();
        if (isHTMLElement(resultBlock)) {
            cleanElement.cleanElement(resultBlock);
        }
        setTimeout(async () => {
            const gameStateController = new GameStateController();
            await gameStateController.incrementCurrentRound();

            const newReultsLine = new ResultLine();
            newReultsLine.draw();
            const validation = new Validation();
            await validation.currentSentenceValidation();
        }, 1300);
    }

    private async changeSentence() {
        const completedSentence = document.querySelector('.current-sentence');
        if (isHTMLElement(completedSentence)) {
            completedSentence.classList.remove('current-sentence');
        }
        const newReultsLine = new ResultLine();
        newReultsLine.draw();
        const validation = new Validation();
        validation.currentSentenceValidation();
        const gameStateController = new GameStateController();
        gameStateController.incrementCurrentSentence();
    }

    private continueGame(continueButton: HTMLButtonElement) {
        continueButton.addEventListener('click', async () => {
            if (!continueButton.hasAttribute('disabled')) {
                continueButton.disabled = true;
                const checkButton = document.querySelector('.check-button');
                if (checkButton instanceof HTMLButtonElement) {
                    const changeButton = new Validation();
                    changeButton.smoothContinueToCheck(checkButton, continueButton);
                }
                const resultBlock = document.querySelector('.result-block');
                if (isHTMLElement(resultBlock) && resultBlock.childNodes.length === 10) {
                    this.markCompletedRound();
                    this.changeRound();
                } else {
                    this.changeSentence();
                }
                const gameController = new GamePageController();
                gameController.addTranslation();
            }
        });
    }

    private markCompletedRound() {
        const gameStat = new GameStateController();
        const currentRoundNumber = gameStat.getCurrentRound();
        gameStat.addToCompleted(currentRoundNumber);
        const currentRoundBlock = document.querySelector('.current-round');
        if (isHTMLElement(currentRoundBlock)) {
            currentRoundBlock.classList.add('completed-round');
        }
    }
}
