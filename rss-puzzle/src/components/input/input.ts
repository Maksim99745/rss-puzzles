import { ErrorMessageOptions } from '../../types';
import { isNotNullable } from '../../utilits/common';
import { makeNewElement } from '../../utilits/makeNewElement';

export default class Input {
    private className;

    constructor(className: string) {
        this.className = className;
    }

    addInput(placeholderValue: 'name' | 'surname'): HTMLInputElement {
        const input = makeNewElement({ selector: 'input', className: this.className });
        input.setAttribute('placeholder', placeholderValue);
        input.setAttribute('aria-describedby', `${placeholderValue}-error`);
        input.setAttribute('required', '');
        this.addValidation(placeholderValue, input);
        return input;
    }

    addValidation(type: 'name' | 'surname', input: HTMLInputElement) {
        input.addEventListener('input', () => {
            if (type === 'name') {
                this.nameValidation(input);
            } else {
                this.surnameValidation(input);
            }
            this.upperCaseValidation(input);
            this.correctSibolsValidation(input);
            this.finalValidation();
        });
    }

    upperCaseValidation(input: HTMLInputElement) {
        let firstLetter = input.value[0];
        let result;
        if (firstLetter) {
            firstLetter = input.value[0].trim();
            const regexUppercaseFirst = /^[A-Z]/;
            result = regexUppercaseFirst.test(firstLetter);
            const errorMessage = ' First charakter should be in upppercase. ';
            this.showErrorsMessage({ input, message: errorMessage, result });
        }
        return result;
    }

    correctSibolsValidation(input: HTMLInputElement) {
        const inputValue = input.value.trim();
        const regexValidCharacters = /^[A-Za-z-]+$/;
        const result = regexValidCharacters.test(inputValue);
        const errorMessage = " Only English alphabet and '-' symbols are allowed.";
        this.showErrorsMessage({ input, message: errorMessage, result });
        return result;
    }

    nameValidation(input: HTMLInputElement) {
        const result = input.value.length > 2;
        const errorMessage = ' Name should contains at least 3 symbols. ';
        this.showErrorsMessage({ input, message: errorMessage, result });
        return result;
    }

    surnameValidation(input: HTMLInputElement) {
        const result = input.value.length > 3;
        const errorMessage = ' Surname should contains at least 4 symbols. ';
        this.showErrorsMessage({ input, message: errorMessage, result });
        return result;
    }

    finalValidation() {
        const button = document.querySelector<HTMLButtonElement>('.submit-button');
        if (button) {
            const nameInput = document.querySelector<HTMLInputElement>('[placeholder="name"]');
            const surnameInput = document.querySelector<HTMLInputElement>('[placeholder="surname"]');
            if (isNotNullable(nameInput) && isNotNullable(surnameInput)) {
                const isAllValidationsPassed =
                    this.correctSibolsValidation(nameInput) &&
                    this.correctSibolsValidation(surnameInput) &&
                    this.upperCaseValidation(nameInput) &&
                    this.upperCaseValidation(surnameInput) &&
                    this.nameValidation(nameInput) &&
                    this.surnameValidation(surnameInput);
                button.disabled = !isAllValidationsPassed;
            }
        }
    }

    showErrorsMessage(options: ErrorMessageOptions) {
        const { input, message, result } = options;
        const errorPlaceId = input.getAttribute('aria-describedby');
        const errorPlace = document.getElementById(`${errorPlaceId}`);
        if (isNotNullable(errorPlace)) {
            if (!result) {
                if (!errorPlace.textContent?.includes(message)) {
                    errorPlace.innerHTML += `${message}`;
                }
            } else if (errorPlace.textContent) {
                errorPlace.textContent = errorPlace?.textContent?.replace(message, '');
            }
            if (input.value.length === 0) {
                errorPlace.textContent = '';
            }
        }
    }
}
