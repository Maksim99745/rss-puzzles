import { isHTMLElement } from '../../utilits/common';
import { makeNewElement } from '../../utilits/makeNewElement';
import { GamePageController } from '../../views/game/game-conroller';

export class TranslationButton {
    public draw(): HTMLElement {
        const translationButton = makeNewElement({
            selector: 'button',
            className: 'translation-button',
        });
        this.showTranslate(translationButton);
        return translationButton;
    }

    private showTranslate(button: HTMLElement) {
        button.addEventListener('click', () => {
            button.classList.toggle('show-translate');
            if (button.classList.contains('show-translate')) {
                const gameController = new GamePageController();
                gameController.addTranslation();
            } else {
                const hintBlock = document.querySelector('.hint-block');
                if (isHTMLElement(hintBlock)) {
                    if (hintBlock.innerHTML !== '') {
                        hintBlock.classList.remove('fadeIn');
                        hintBlock.classList.add('fadeOut');
                    }
                    setTimeout(() => {
                        hintBlock.textContent = '';
                    }, 1100);
                }
            }
        });
    }
}
