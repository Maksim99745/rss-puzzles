import { ChangeLevel } from '../../utilits/changeLevelRound';
import { isNotNullable } from '../../utilits/common';
import { GameStateController } from '../../utilits/game-state';
import { makeNewElement } from '../../utilits/makeNewElement';
import { GamePageController } from '../../views/game/game-conroller';

export class RoundsBlock {
    public draw(): HTMLElement {
        const roundsSide = makeNewElement({
            selector: 'div',
            className: 'rounds-side',
        });
        const roundsBlockHeader = makeNewElement({
            selector: 'div',
            className: 'rounds-side__header',
            textContent: 'Rounds',
        });
        roundsSide.appendChild(roundsBlockHeader);
        this.addRoundsBlock(roundsSide);
        return roundsSide;
    }

    public addRoundsBlock(roundsSide: HTMLElement) {
        const roundsBlock = makeNewElement({
            selector: 'div',
            className: 'rounds-block',
        });
        this.addRounds(roundsBlock);
        roundsSide.appendChild(roundsBlock);
    }

    public async addRounds(roundBlock: HTMLElement) {
        const gameStates = new GameStateController();
        const completedRounds = gameStates.getCompletedRounds();
        const currentRound = gameStates.getCurrentRound() + 1;
        const gameController = new GamePageController();
        const roundsCollection = await gameController.getWordsCollection();
        const amountOfRounds = roundsCollection.rounds.length;
        for (let i = 1; i <= amountOfRounds; i += 1) {
            const round = makeNewElement({
                selector: 'div',
                className: 'round-block',
                textContent: `${i}`,
            });
            round.classList.add('fadeIn');
            if (i === currentRound) {
                round.classList.add('current-round');
            }
            if (completedRounds.includes(i - 1)) {
                round.classList.add('completed-round');
            }
            this.chooseRound(round);
            roundBlock.appendChild(round);
        }
    }

    private async chooseRound(roundBlock: HTMLElement) {
        roundBlock.addEventListener('click', () => {
            const currentRound = document.querySelector('.current-round');
            const rounds = document.querySelectorAll('.round-block');
            rounds.forEach((round) => {
                round.classList.remove('current-round');
            });
            roundBlock.classList.add('current-round');
            const newRoundNumber = roundBlock.textContent;
            if (newRoundNumber !== currentRound?.textContent) {
                if (isNotNullable(newRoundNumber)) {
                    const gameStat = new GameStateController();
                    gameStat.setCurrentRound(Number(newRoundNumber) - 1);
                    const changeLevel = new ChangeLevel();
                    changeLevel.changeRound();
                }
            }
        });
    }
}
