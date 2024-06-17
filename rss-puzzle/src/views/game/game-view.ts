// import { isNotNullable } from '../../utilits/common';
import { AudioHintButton } from '../../components/audio-buttons/audio-hint';
import { CompletionButton } from '../../components/completion-button/auto-completion';
import { CheckButton } from '../../components/check-button/check-button';
import { ContinueButton } from '../../components/continue-button/continue';
import { LoginOutButton } from '../../components/login-out/login-out';
import { ResultLine } from '../../components/result-line/result-line';
import { TranslationButton } from '../../components/translation-button/translation-button';
import { makeNewElement } from '../../utilits/makeNewElement';
import './game.css';
import { AudioControllerButton } from '../../components/audio-buttons/audio-controller';
import { LevelController } from '../../components/levels-controller/levels-conroller';

export class GamePage {
    private _parentNode: HTMLElement;

    constructor(parent: HTMLElement) {
        this._parentNode = parent;
    }

    public draw() {
        const gamePage = makeNewElement({ selector: 'div', className: 'game-page', parent: this._parentNode });
        const headerButtons = this.addHeaderButtons();
        gamePage.appendChild(headerButtons);
        const hintBlock = makeNewElement({ selector: 'div', className: 'hint-block' });
        hintBlock.classList.add('fadeOut');
        gamePage.appendChild(hintBlock);
        const resultBlock = makeNewElement({ selector: 'div', className: 'result-block' });
        gamePage.appendChild(resultBlock);
        const resultLine = new ResultLine();
        resultLine.draw();
        const sourcesBlock = makeNewElement({ selector: 'div', className: 'sources-block' });
        gamePage.appendChild(sourcesBlock);
        const conrollers = this.addMainButtonsBlock();
        gamePage.appendChild(conrollers);
        gamePage.classList.add('fadeIn');
    }

    private addMainButtonsBlock() {
        const contollersBlock = makeNewElement({
            selector: 'div',
            className: 'controllers-block',
        });
        const completionButton = new CompletionButton().draw();
        const continueButton = new ContinueButton().draw();
        const checkButton = new CheckButton().draw();
        const audioHintButton = new AudioHintButton().draw();
        contollersBlock.appendChild(audioHintButton);
        contollersBlock.appendChild(checkButton);
        contollersBlock.appendChild(continueButton);
        contollersBlock.appendChild(completionButton);
        return contollersBlock;
    }

    private addHeaderButtons() {
        const buttonsBlock = makeNewElement({ selector: 'div', className: 'buttons-block' });
        const loginOutButton = new LoginOutButton().drawsLoginOutButton();
        buttonsBlock.appendChild(loginOutButton);
        const translationButton = new TranslationButton().draw();
        buttonsBlock.appendChild(translationButton);
        const audioController = new AudioControllerButton().draw();
        buttonsBlock.appendChild(audioController);
        const levelsButton = new LevelController().draw();
        const levelsBlock = new LevelController().addLevelsBlock();
        buttonsBlock.appendChild(levelsButton);
        buttonsBlock.appendChild(levelsBlock);
        return buttonsBlock;
    }
}
