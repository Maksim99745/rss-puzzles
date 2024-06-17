import { WordCard } from '../components/word-card/word-card';
import { GamePageController } from '../views/game/game-conroller';
import { isHTMLElement, isNotNullable } from './common';
import { Validation } from './validation';

export class MoveWordToResult {
    public async move(wordBlock: HTMLDivElement, previousParent: HTMLElement) {
        const inlineStyles = wordBlock.style.cssText;
        const currentWord = wordBlock.textContent;
        const resultBlock = document.querySelector('.current-sentence');
        if (isHTMLElement(resultBlock)) {
            if (isNotNullable(currentWord)) {
                const gameController = new GamePageController();
                const currentSentence = await gameController.getSentence();
                const newWord = new WordCard(currentWord, currentSentence).draw();
                newWord.classList.add('fadeIn');
                resultBlock.appendChild(newWord);
                newWord.style.cssText = inlineStyles;
                previousParent.removeChild(wordBlock);
                this.allowCheckButton();
                const validation = new Validation();
                validation.currentSentenceValidation();
            }
        }
    }

    public allowCheckButton() {
        const sourcesBlock = document.querySelector('.sources-block');
        if (isHTMLElement(sourcesBlock)) {
            const checkButton = document.querySelector('.check-button');
            if (checkButton instanceof HTMLButtonElement) {
                if (sourcesBlock.childNodes.length === 0) {
                    checkButton.disabled = false;
                } else {
                    checkButton.disabled = true;
                }
            }
        }
    }
}
