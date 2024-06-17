import { isHTMLElement, isNotNullable } from '../../utilits/common';
import { makeNewElement } from '../../utilits/makeNewElement';
import { MoveWordToResult } from '../../utilits/moveWordtoResult';
import { RemoveWordCardsCheckers } from '../../utilits/removeWordCardsCheckers';
import { Validation } from '../../utilits/validation';
import { GamePageController } from '../../views/game/game-conroller';

export class WordCard {
    private _word: string;

    private _relatedSentence: string;

    constructor(word: string, relatedSentence: string) {
        this._word = word;
        this._relatedSentence = relatedSentence;
    }

    public draw() {
        const wordBlock = makeNewElement({ selector: 'div', className: 'word-card' });
        wordBlock.textContent = this._word;
        this.detectParent(wordBlock);
        const cleanFromCheckers = new RemoveWordCardsCheckers();
        cleanFromCheckers.cleanWordCards(wordBlock);
        this.resizeWord(wordBlock);
        return wordBlock;
    }

    private detectParent(wordBlock: HTMLDivElement) {
        wordBlock.addEventListener('click', () => {
            const parentNode = wordBlock.parentNode;
            if (isHTMLElement(parentNode)) {
                const parentNodeName = parentNode.classList.value;
                if (parentNodeName === 'sources-block') {
                    const moveToTheResults = new MoveWordToResult();
                    moveToTheResults.move(wordBlock, parentNode);
                    this.resizeWord(wordBlock);
                } else if (parentNodeName.includes('current-sentence')) {
                    this.returnWord(wordBlock, parentNode);
                }
            }
            this.getChairLength();
        });
    }

    private returnWord(wordBlock: HTMLDivElement, previousParent: HTMLElement) {
        const currentWord = wordBlock.textContent;
        const inlineStyles = wordBlock.style.cssText;
        const sources = document.querySelector('.sources-block');
        if (isHTMLElement(sources)) {
            if (isNotNullable(currentWord)) {
                const newWord = new WordCard(currentWord, this._relatedSentence).draw();
                sources.appendChild(newWord);
                newWord.style.cssText = inlineStyles;
                previousParent.removeChild(wordBlock);
                const validation = new Validation();
                validation.currentSentenceValidation();
                const moveToTheResults = new MoveWordToResult();
                moveToTheResults.allowCheckButton();
            }
        }
    }

    public async getChairLength(): Promise<number> {
        const gameController = new GamePageController();
        const sentenceArr = await gameController.getSentence();
        const chairsAmount = sentenceArr.join('').length;
        const chairLength = 600 / chairsAmount;
        return chairLength;
    }

    public async resizeWord(wordBlock: HTMLElement) {
        const amountOfChairs = wordBlock.textContent?.length;
        const chairLength = await this.getChairLength();
        if (isNotNullable(amountOfChairs)) {
            const wordWidth = amountOfChairs * chairLength;
            wordBlock.style.width = wordWidth + 'px';
        }
    }
}
