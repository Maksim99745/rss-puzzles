import { isHTMLElement } from './common';

export class RemoveWordCardsCheckers {
    public cleanWordCards<T extends HTMLButtonElement | HTMLDivElement>(button: T) {
        button.addEventListener('click', () => {
            const currentSentence = document.querySelector('.current-sentence');
            const passedWordBlocks = currentSentence?.childNodes;
            passedWordBlocks?.forEach((block) => {
                if (isHTMLElement(block)) {
                    if (block.classList.contains('word-block_wrong')) {
                        block.classList.remove('word-block_wrong');
                    }
                    if (block.classList.contains('word-block_right')) {
                        block.classList.remove('word-block_right');
                    }
                }
            });
        });
    }
}
