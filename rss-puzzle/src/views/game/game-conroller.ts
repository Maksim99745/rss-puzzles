import './game.css';
import { isHTMLElement, isNotNullable } from '../../utilits/common';
import { GamePage } from './game-view';
import { WordCard } from '../../components/word-card/word-card';
import { GameStateController } from '../../utilits/game-state';

export class GamePageController {
    public drawGamePage() {
        const currentGameState = new GameStateController();
        currentGameState.setInitialLevel();
        const body = document.querySelector('body');
        if (isNotNullable(body)) {
            const gamePageView = new GamePage(body);
            gamePageView.draw();
            this.addSentenceToSources();
        }
    }

    private async getRoundData() {
        const levelData = await this.getWordsCollection();
        const gameStateController = new GameStateController();
        const roundNumber = gameStateController.getCurrentRound();
        const currentRoundData = levelData.rounds[roundNumber];
        return currentRoundData;
    }

    public async getWordsCollection() {
        try {
            const gameState = new GameStateController();
            const level = gameState.getCurrentLevel();
            const response = await fetch(
                `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel${level}.json`
            );
            if (!response.ok) {
                console.log(response);
            }
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    public async getSentence() {
        const currentRound = await this.getRoundData();
        const getSentenceNumber = new GameStateController();
        const sentenceNumber = getSentenceNumber.getCurrentSentenceNumber();
        const currentSentence = currentRound.words[sentenceNumber];
        const sentenceText = currentSentence.textExample;
        const sentenceArr = sentenceText.split(' ');
        return sentenceArr;
    }

    public async getTranslation() {
        const currentRound = await this.getRoundData();
        const getSentenceNumber = new GameStateController();
        const sentenceNumber = getSentenceNumber.getCurrentSentenceNumber();
        const currentSentence = currentRound.words[sentenceNumber];
        const translationText = currentSentence.textExampleTranslate;
        return translationText;
    }

    public async getImage() {
        const currentRound = await this.getRoundData();
        const imageName = currentRound.levelData.imageSrc;
        const imageNameSrc = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${imageName}`;
        return imageNameSrc;
    }

    public async getAudio() {
        const currentRound = await this.getRoundData();
        const getSentenceNumber = new GameStateController();
        const sentenceNumber = await getSentenceNumber.getCurrentSentenceNumber();
        const currentSentence = currentRound.words[sentenceNumber];
        const audioText = currentSentence.audioExample;
        const audioUrl = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${audioText}`;
        return audioUrl;
    }

    public async addSentenceToSources() {
        const sources = document.querySelector('.sources-block');
        const sentenceArr = await this.getSentence();
        const correctSentence = sentenceArr.join(' ');
        const wordsArr: Array<HTMLElement> = [];
        sentenceArr.forEach((word: string) => {
            const wordCard = new WordCard(word, correctSentence).draw();
            wordsArr.push(wordCard);
        });
        let widthStart = 0;
        for (const word of wordsArr) {
            if (isHTMLElement(word)) {
                this.setBackground(word, widthStart);
                const chairLength = await this.getChairLength();
                if (isNotNullable(word.textContent)) {
                    const newWidth = word.textContent.length * chairLength;
                    if (isNotNullable(newWidth)) {
                        widthStart += newWidth;
                    }
                }
            }
        }
        const mixedArr = wordsArr.sort(() => Math.random() - 0.5);
        mixedArr.forEach((wordCard) => {
            if (isNotNullable(sources) && sources instanceof HTMLElement) {
                return sources.appendChild(wordCard);
            }
        });
    }

    public async setBackground(wordBlock: HTMLElement, widthStart: number) {
        const gameController = new GamePageController();
        try {
            const imageUrl = await gameController.getImage();
            const gameState = new GameStateController();
            const currentSentence = gameState.getCurrentSentenceNumber();
            wordBlock.style.backgroundImage = `url(${imageUrl})`;
            wordBlock.style.backgroundPosition = `-${widthStart}px -${currentSentence * 46}px`;
            wordBlock.style.backgroundSize = `600px 460px`;
        } catch (error) {
            console.error('Error setting background image:', error);
        }
    }

    private async getChairLength(): Promise<number> {
        const gameController = new GamePageController();
        const sentenceArr = await gameController.getSentence();
        const chairsAmount = sentenceArr.join('').length;
        const chairLength = 600 / chairsAmount;
        return chairLength;
    }

    public async addTranslation(validation?: boolean) {
        const hintBlock = document.querySelector('.hint-block');
        const translationButton = document.querySelector('.translation-button');
        if (isHTMLElement(translationButton)) {
            if (translationButton.classList.contains('show-translate') || validation) {
                const hint = await this.getTranslation();
                if (isHTMLElement(hintBlock)) {
                    //block animation works only if block isn't empty or hint is not already passed
                    if (hintBlock.innerHTML !== '' && hintBlock.innerHTML !== hint) {
                        hintBlock.classList.remove('fadeIn');
                        hintBlock.classList.add('fadeOut');
                    }
                    setTimeout(() => {
                        hintBlock.classList.remove('fadeOut');
                        hintBlock.classList.add('fadeIn');
                        hintBlock.textContent = hint;
                    }, 1100);
                }
            } else {
                if (isHTMLElement(hintBlock)) {
                    hintBlock.classList.remove('fadeIn');
                    hintBlock.classList.add('fadeOut');
                }
            }
        }
    }
}
