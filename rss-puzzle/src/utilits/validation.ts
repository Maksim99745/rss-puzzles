import { AudioControllerButton } from '../components/audio-buttons/audio-controller';
import { GamePageController } from '../views/game/game-conroller';
import { isHTMLElement } from './common';

export class Validation {
    public async currentSentenceValidation() {
        const gameController = new GamePageController();
        const relatedSentenceArr = await gameController.getSentence();
        const relatedSentence = relatedSentenceArr.join(' ');
        const currentSentenceLine = document.querySelector('.current-sentence');
        const currentCreatedSentenceArr: string[] = [];
        const currentWordBlocks = currentSentenceLine?.childNodes;
        currentWordBlocks?.forEach((block) => {
            if (isHTMLElement(block)) {
                currentCreatedSentenceArr.push(block.innerHTML);
            }
        });
        const currentCreatedSentence = currentCreatedSentenceArr.join(' ');
        const continueButton = document.querySelector('.continue-button');
        const checkButton = document.querySelector('.check-button');
        const completionButton = document.querySelector('.completion-button');
        if (
            continueButton instanceof HTMLButtonElement &&
            checkButton instanceof HTMLButtonElement &&
            completionButton instanceof HTMLButtonElement
        ) {
            if (relatedSentence === currentCreatedSentence) {
                checkButton.disabled = true;
                completionButton.disabled = true;
                this.smoothCheckToContinue(checkButton, continueButton);
            } else {
                continueButton.disabled = true;
                completionButton.disabled = false;
                this.smoothContinueToCheck(checkButton, continueButton);
            }
        }
    }

    public smoothCheckToContinue(checkButton: HTMLButtonElement, continueButton: HTMLButtonElement) {
        continueButton.disabled = false;
        const gameController = new GamePageController();
        gameController.addTranslation(true);
        const audioController = new AudioControllerButton();
        audioController.activeAudio();
        checkButton.classList.remove('fadeIn');
        checkButton.classList.add('fadeOut');
        continueButton.classList.remove('fadeOut');
        continueButton.classList.add('fadeIn');
        setTimeout(() => {
            checkButton.style.display = 'none';
            continueButton.style.display = 'flex';
        }, 1000);
    }

    public smoothContinueToCheck(checkButton: HTMLButtonElement, continueButton: HTMLButtonElement) {
        continueButton.disabled = true;
        const audioControllerButton = document.querySelector('.audio-controller');
        if (isHTMLElement(audioControllerButton)) {
            if (audioControllerButton.classList.contains('audio-controller_off')) {
                const audioController = new AudioControllerButton();
                audioController.disableAudio();
            }
        }
        continueButton.classList.remove('fadeIn');
        continueButton.classList.add('fadeOut');
        checkButton.classList.remove('fadeOut');
        checkButton.classList.add('fadeIn');
        setTimeout(() => {
            continueButton.style.display = 'none';
            checkButton.style.display = 'flex';
        }, 1000);
    }
}
