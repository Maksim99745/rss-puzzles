import { DestroyChilds } from '../../utilits/clean';
import { makeNewElement } from '../../utilits/makeNewElement';
import { LoginPageController } from '../../views/login/login-controller';

export class LoginOutButton {
    private _className: string;

    constructor(className?: string) {
        this._className = className || 'login-out-button';
    }

    public drawsLoginOutButton(): HTMLElement {
        const loginOutButton = makeNewElement({
            selector: 'button',
            className: this._className,
            textContent: 'Login-out',
        });
        this.handleLoginOut(loginOutButton);
        return loginOutButton;
    }

    private handleLoginOut(button: HTMLButtonElement): void {
        button.addEventListener('click', () => {
            const destroyChilds = new DestroyChilds();
            destroyChilds.cleanBody();
            setTimeout(() => {
                localStorage.removeItem('RSS-Puzzle');
                const loginPageController = new LoginPageController();
                loginPageController.drawLoginPage();
            }, 1500);
        });
    }
}
