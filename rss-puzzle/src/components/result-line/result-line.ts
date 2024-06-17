import { isHTMLElement } from '../../utilits/common';
import { makeNewElement } from '../../utilits/makeNewElement';
import { GamePageController } from '../../views/game/game-conroller';

export class ResultLine {
    public draw() {
        const resultBlock = document.querySelector('.result-block');
        if (isHTMLElement(resultBlock)) {
            const newSentence = makeNewElement({
                selector: 'div',
                className: 'result-line',
                parent: resultBlock,
            });
            newSentence.classList.add('current-sentence');
            newSentence.classList.add('fadeIn');
        }
        const gameController = new GamePageController();
        gameController.addSentenceToSources();
    }
}
