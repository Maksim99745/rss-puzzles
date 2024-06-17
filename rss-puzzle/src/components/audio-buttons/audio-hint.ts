import { makeNewElement } from '../../utilits/makeNewElement';
import { GamePageController } from '../../views/game/game-conroller';

export class AudioHintButton {
    public draw(): HTMLElement {
        const audioHintButton = makeNewElement({
            selector: 'div',
            className: 'audio-hint',
        });
        audioHintButton.classList.add('fadeIn');
        this.playTranslation(audioHintButton);
        return audioHintButton;
    }

    //TODO проверить пропадание кнопки
    private playTranslation(button: HTMLElement) {
        button.addEventListener('click', async () => {
            if (button.classList.contains('fadeIn')) {
                const gameController = new GamePageController();
                const audioSrc = await gameController.getAudio();
                const currentAudio = new Audio(audioSrc);
                currentAudio.play();
                currentAudio.addEventListener('play', () => {
                    button.classList.add('audio-playing');
                });
                currentAudio.addEventListener('ended', () => {
                    button.classList.remove('audio-playing');
                });
            }
        });
    }
}
