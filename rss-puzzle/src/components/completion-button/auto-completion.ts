import { isHTMLElement, isNotNullable } from '../../utilits/common';
import { makeNewElement } from '../../utilits/makeNewElement';
import { RemoveWordCardsCheckers } from '../../utilits/removeWordCardsCheckers';
import { Validation } from '../../utilits/validation';
import { GamePageController } from '../../views/game/game-conroller';
import { WordCard } from '../word-card/word-card';

export class CompletionButton {
    public draw() {
        const completionButton = makeNewElement({ selector: 'button', className: 'completion-button' });
        completionButton.textContent = "I don't know";
        const cleanFromCheckers = new RemoveWordCardsCheckers();
        cleanFromCheckers.cleanWordCards(completionButton);
        this.completeSentence(completionButton);
        return completionButton;
    }

    private completeSentence(button: HTMLButtonElement) {
        button.addEventListener('click', () => {
            if (!button.disabled) {
                button.disabled = true;
                this.cleanSources();
                setTimeout(() => {
                    this.reorder();
                }, 1200);
            }
        });
    }

    private cleanSources() {
        const sourcesBlock = document.querySelector('.sources-block');
        if (isHTMLElement(sourcesBlock)) {
            this.smoothRemoveChilds(sourcesBlock);
        }
    }

    private reorder() {
        const parentBlock = document.querySelector('.current-sentence');
        if (isHTMLElement(parentBlock)) {
            this.runBlockToRightPlace(parentBlock);
        }
    }

    public runBlockToRightPlace(parentBlock: HTMLElement) {
        this.smoothRemoveChilds(parentBlock);

        setTimeout(async () => {
            const gameController = new GamePageController();
            const rightSenteceArr = await gameController.getSentence();
            let widthStart = 0;
            rightSenteceArr.forEach(async (word: string) => {
                const newWord = new WordCard(word, rightSenteceArr.join('')).draw();
                newWord.classList.add('fadeIn');
                const gameControllerForLength = new GamePageController();
                const chairLength = await this.getChairLength();
                gameControllerForLength.setBackground(newWord, widthStart);
                if (isNotNullable(word)) {
                    const newWidth = word.length * chairLength;
                    if (isNotNullable(newWidth)) {
                        widthStart += newWidth;
                    }
                }
                parentBlock.appendChild(newWord);
            });
            const validation = new Validation();
            validation.currentSentenceValidation();
        }, 800);
    }

    private async getChairLength(): Promise<number> {
        const gameController = new GamePageController();
        const sentenceArr = await gameController.getSentence();
        const chairsAmount = sentenceArr.join('').length;
        const chairLength = 600 / chairsAmount;
        return chairLength;
    }

    private smoothRemoveChilds(parent: HTMLElement) {
        if (isHTMLElement(parent)) {
            const untouchedWords = parent.childNodes;
            if (untouchedWords.length > 0) {
                untouchedWords.forEach((word) => {
                    if (word instanceof HTMLDivElement) {
                        word.classList.remove('fadeIn');
                        word.classList.add('fadeOut');
                    }
                });
                setTimeout(() => {
                    while (untouchedWords.length > 0) {
                        if (parent.firstChild) {
                            parent.removeChild(parent.firstChild);
                        }
                    }
                }, 800);
            }
        }
    }
}
