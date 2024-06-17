import { DestroyChilds } from '../../utilits/clean';
import { makeNewElement } from '../../utilits/makeNewElement';
import { PersistanceService } from '../../utilits/persistance';
import { StartPageController } from '../../views/start/start-conroller';

export class SubmitButton {
    private _className: string;

    constructor(className?: string) {
        this._className = className || 'submit-button';
    }

    public drawSubmitButton(): HTMLElement {
        const submitButton = makeNewElement({
            selector: 'button',
            className: this._className,
            textContent: 'Submit',
        });
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('id', 'submit-button');
        submitButton.setAttribute('disabled', '');
        this.handleSubmit(submitButton);
        return submitButton;
    }

    private handleSubmit(button: HTMLButtonElement): void {
        button.addEventListener('click', () => {
            if (!button.hasAttribute('disabled')) {
                const presistence = new PersistanceService();
                presistence.save();
                const destroyChilds = new DestroyChilds();
                destroyChilds.cleanBody();
                setTimeout(() => {
                    const startPageController = new StartPageController();
                    startPageController.drawStartPage();
                }, 1500);
            }
        });
    }
}
