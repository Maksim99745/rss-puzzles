import Input from '../../components/input/input';
import { SubmitButton } from '../../components/submit-button/submit-button';
import { makeNewElement } from '../../utilits/makeNewElement';
import './login-view.css';

export class LoginPage {
    private parentNode: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parentNode = parent;
    }

    public draw() {
        const loginPage = makeNewElement({ selector: 'div', className: 'login-page' });
        loginPage.classList.add('fadeIn');
        const submitField = makeNewElement({ selector: 'div', className: 'submit' });
        const login = makeNewElement({ selector: 'div', className: 'login-title', textContent: 'Sign in' });
        submitField.appendChild(login);
        const submitForm = makeNewElement({ selector: 'form', className: 'submit-form', parent: submitField });
        submitForm.setAttribute('id', 'submit-form');
        submitForm.setAttribute('action', '');
        this.drawInputs(submitForm);
        const submitButton = new SubmitButton().drawSubmitButton();
        submitField.appendChild(submitButton);
        loginPage.appendChild(submitField);
        this.parentNode.append(loginPage);
    }

    private drawInputs(parent: HTMLElement) {
        const nameInput = new Input('login-input').addInput('name');
        const nameErrorSpan = makeNewElement({ selector: 'div', className: 'error-message' });
        nameErrorSpan.setAttribute('id', 'name-error');
        parent.appendChild(nameErrorSpan);
        parent.appendChild(nameInput);

        const surnameInput = new Input('login-input').addInput('surname');
        const surnamErrorSpan = makeNewElement({ selector: 'div', className: 'error-message' });
        surnamErrorSpan.setAttribute('id', 'surname-error');
        parent.appendChild(surnamErrorSpan);
        parent.appendChild(surnameInput);
    }
}
