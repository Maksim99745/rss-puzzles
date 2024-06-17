import { isHTMLElement } from '../../utilits/common';
import { makeNewElement } from '../../utilits/makeNewElement';

export class AudioControllerButton {
    public draw(): HTMLElement {
        const audioControllerButton = makeNewElement({
            selector: 'div',
            className: 'audio-controller',
        });
        this.controlAudio(audioControllerButton);
        return audioControllerButton;
    }

    private controlAudio(button: HTMLElement) {
        button.addEventListener('click', async () => {
            button.classList.toggle('audio-controller_off');
            const audioHint = document.querySelector('.audio-hint');
            if (isHTMLElement(audioHint)) {
                if (button.classList.contains('audio-controller_off')) {
                    this.disableAudio();
                } else {
                    this.activeAudio();
                }
            }
        });
    }

    public disableAudio() {
        const audioHint = document.querySelector('.audio-hint');
        if (isHTMLElement(audioHint)) {
            audioHint.classList.remove('fadeIn');
            audioHint.classList.add('fadeOut');
        }
    }

    public activeAudio() {
        const audioHint = document.querySelector('.audio-hint');
        if (isHTMLElement(audioHint)) {
            audioHint.classList.add('fadeIn');
            audioHint.classList.remove('fadeOut');
        }
    }
}
