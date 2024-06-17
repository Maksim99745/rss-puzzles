import { StartButton } from '../../components/start-button/start-button';
import { isNotNullable } from '../../utilits/common';
import { makeNewElement } from '../../utilits/makeNewElement';
import './start-view.css';

export class StartPage {
    private _parentNode: HTMLElement;

    constructor(parent: HTMLElement) {
        this._parentNode = parent;
    }

    public draw() {
        const startPage = makeNewElement({ selector: 'div', className: 'start-page' });
        startPage.classList.add('fadeIn');
        this.greating(startPage);
        const gameTitile = makeNewElement({ selector: 'div', className: 'game-name', parent: startPage });
        gameTitile.textContent = 'ENGLISH PUZZLE';
        const gameDescribtion = makeNewElement({ selector: 'div', className: 'game-describtion', parent: startPage });
        gameDescribtion.innerHTML =
            'Click on words, collect phrases. <br> Words can be drag and drop. Select tooltips in the menu.';
        const startButton = new StartButton().drawsStartButton();
        startPage.appendChild(startButton);
        this._parentNode.append(startPage);
    }

    private greating(parent: HTMLElement) {
        const userDataJSON = localStorage.getItem('RSS-Puzzle');
        if (isNotNullable(userDataJSON)) {
            const userData = JSON.parse(userDataJSON);
            const name = userData.name;
            const surname = userData.surname;
            const greatingBox = makeNewElement({ selector: 'div', className: 'greeting', parent: parent });
            greatingBox.textContent = `Hello, ${name} ${surname}!`;
        }
    }
}
