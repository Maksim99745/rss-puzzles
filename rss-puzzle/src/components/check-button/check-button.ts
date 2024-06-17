import { isHTMLElement } from '../../utilits/common';
import { makeNewElement } from '../../utilits/makeNewElement';
import { GamePageController } from '../../views/game/game-conroller';

export class CheckButton {
    draw() {
        const checkButton = makeNewElement({ selector: 'button', className: 'check-button' });
        checkButton.setAttribute('disabled', '');
        checkButton.textContent = 'Check';
        checkButton.classList.add('fadeIn');
        this.checkGame(checkButton);
        return checkButton;
    }

    private checkGame(checkButton: HTMLButtonElement) {
        checkButton.addEventListener('click', async () => {
            if (!checkButton.hasAttribute('disabled')) {
                const gameController = new GamePageController();
                const sentenceArr = await gameController.getSentence();
                const currentSentence = document.querySelector('.current-sentence');
                const passedWordBlocks = currentSentence?.childNodes;
                passedWordBlocks?.forEach((block, index) => {
                    if (isHTMLElement(block)) {
                        const word = block.textContent;
                        if (word === sentenceArr[index]) {
                            block.classList.add('word-block_right');
                        } else {
                            block.classList.add('word-block_wrong');
                        }
                    }
                });
            }
        });
    }
}
