import { isHTMLElement } from '../../utilits/common';
import { makeNewElement } from '../../utilits/makeNewElement';

export class CloseButton {
    private _closingModalName;

    private _deletingClass;

    constructor(closingModal: string, deletingClass: string) {
        this._closingModalName = closingModal;
        this._deletingClass = deletingClass;
    }

    public draw() {
        const closeButton = makeNewElement({ selector: 'div', className: 'close-button' });
        this.closeLevelsModal(closeButton);
        return closeButton;
    }

    public closeLevelsModal(trigger: HTMLElement) {
        trigger.addEventListener('click', (e) => {
            const levelsModal = document.querySelector(`.${this._closingModalName}`);
            if (isHTMLElement(levelsModal)) {
                if (e.target === trigger) {
                    levelsModal.classList.remove(`${this._deletingClass}`);
                }
            }
        });
    }
}
