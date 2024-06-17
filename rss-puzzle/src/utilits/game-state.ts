import { GamePageController } from '../views/game/game-conroller';
import { ChangeLevel } from './changeLevelRound';
import { isNotNullable } from './common';

export class GameStateController {
    public setInitialLevel() {
        const localStorageJSON = localStorage.getItem('RSS-Puzzle');
        if (localStorageJSON) {
            const newlocalStorage = JSON.parse(localStorageJSON);
            if (!newlocalStorage.level) {
                newlocalStorage.level = 1;
            }
            if (!newlocalStorage.rounds) {
                newlocalStorage.rounds = {
                    1: {
                        completed: [],
                        last: 0,
                    },
                    2: {
                        completed: [],
                        last: 0,
                    },
                    3: {
                        completed: [],
                        last: 0,
                    },
                    4: {
                        completed: [],
                        last: 0,
                    },
                    5: {
                        completed: [],
                        last: 0,
                    },
                    6: {
                        completed: [],
                        last: 0,
                    },
                };
            }
            newlocalStorage.sentence = 0;
            localStorage.setItem('RSS-Puzzle', JSON.stringify(newlocalStorage));
        }
    }

    public getCurrentRound() {
        const currentLevel = String(this.getCurrentLevel());
        const localStorageJSON = localStorage.getItem('RSS-Puzzle');
        if (isNotNullable(localStorageJSON)) {
            const localStorageData = JSON.parse(localStorageJSON);
            const currentRound = localStorageData.rounds[currentLevel].last;
            localStorageData.sentence = 0;
            return currentRound;
        }
    }

    public addToCompleted(round: number) {
        const currentLevel = String(this.getCurrentLevel());
        const localStorageJSON = localStorage.getItem('RSS-Puzzle');
        if (isNotNullable(localStorageJSON)) {
            const localStorageData = JSON.parse(localStorageJSON);
            const completedRounds = localStorageData.rounds[currentLevel].completed;
            if (!completedRounds.includes(round)) {
                completedRounds.push(round);
                localStorage.setItem('RSS-Puzzle', JSON.stringify(localStorageData));
            }
        }
    }

    public getCompletedRounds() {
        const currentLevel = String(this.getCurrentLevel());
        const localStorageJSON = localStorage.getItem('RSS-Puzzle');
        if (isNotNullable(localStorageJSON)) {
            const localStorageData = JSON.parse(localStorageJSON);
            const completedRounds = localStorageData.rounds[currentLevel].completed;
            return completedRounds;
        }
    }

    public async incrementCurrentRound() {
        const currentLevel = String(this.getCurrentLevel());
        const localStorageJSON = localStorage.getItem('RSS-Puzzle');
        if (isNotNullable(localStorageJSON)) {
            const localStorageData = JSON.parse(localStorageJSON);
            const currentRound = localStorageData.rounds[currentLevel].last;
            const incrementedRound = currentRound + 1;
            const gameController = new GamePageController();
            const roundsArr = await gameController.getWordsCollection();
            const amountOfRounds = roundsArr.rounds.length - 1;
            if (currentRound === amountOfRounds) {
                if (currentLevel === '6') {
                    localStorageData.level = 1;
                    localStorageData.rounds[1].last = 0;
                } else {
                    localStorageData.level = this.getCurrentLevel() + 1;
                    localStorageData.rounds[this.getCurrentLevel() + 1].last = 0;
                }
                const changeLevelController = new ChangeLevel();
                changeLevelController.changeCurrentLevelDecoration();
            } else {
                const changeLevelController = new ChangeLevel();
                changeLevelController.changeCurrentRoundDecoration();
                localStorageData.rounds[currentLevel].last = incrementedRound;
            }
            localStorageData.sentence = 0;
            localStorage.setItem('RSS-Puzzle', JSON.stringify(localStorageData));
        }
    }

    public async setCurrentRound(newRound: number) {
        const currentLevel = String(this.getCurrentLevel());
        const localStorageJSON = localStorage.getItem('RSS-Puzzle');
        if (isNotNullable(localStorageJSON)) {
            const localStorageData = JSON.parse(localStorageJSON);
            localStorageData.rounds[currentLevel].last = newRound;
            localStorage.setItem('RSS-Puzzle', JSON.stringify(localStorageData));
        }
    }

    public getCurrentSentenceNumber() {
        const localStorageJSON = localStorage.getItem('RSS-Puzzle');
        if (isNotNullable(localStorageJSON)) {
            const localStorageData = JSON.parse(localStorageJSON);
            const currentSentence = localStorageData.sentence;
            return currentSentence;
        }
    }

    public incrementCurrentSentence() {
        const localStorageJSON = localStorage.getItem('RSS-Puzzle');
        if (isNotNullable(localStorageJSON)) {
            const localStorageData = JSON.parse(localStorageJSON);
            const incrementedSentence = localStorageData.sentence + 1;
            localStorageData.sentence = incrementedSentence;
            localStorage.setItem('RSS-Puzzle', JSON.stringify(localStorageData));
        }
    }

    public getCurrentLevel() {
        const localStorageJSON = localStorage.getItem('RSS-Puzzle');
        if (isNotNullable(localStorageJSON)) {
            const localStorageData = JSON.parse(localStorageJSON);
            const currentLevel = localStorageData.level;
            return currentLevel;
        }
    }

    public setNewLevel(newlevel: number) {
        const localStorageJSON = localStorage.getItem('RSS-Puzzle');
        if (isNotNullable(localStorageJSON)) {
            const localStorageData = JSON.parse(localStorageJSON);
            localStorageData.level = newlevel;
            localStorageData.sentence = 0;
            localStorage.setItem('RSS-Puzzle', JSON.stringify(localStorageData));
        }
    }
}
