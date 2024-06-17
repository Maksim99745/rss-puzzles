import { User } from '../types';
import { isNotNullable } from './common';

export class PersistanceService {
    public save(): void {
        const nameInput = document.querySelector<HTMLInputElement>('[placeholder="name"]');
        const surnameInput = document.querySelector<HTMLInputElement>('[placeholder="surname"]');
        if (isNotNullable(nameInput) && isNotNullable(surnameInput)) {
            const name = nameInput.value;
            const surname = surnameInput.value;
            const userData: User = {
                name,
                surname,
            };
            const userDataJSON = JSON.stringify(userData);
            localStorage.setItem('RSS-Puzzle', userDataJSON);
        }
    }

    public load(): boolean {
        const userData = localStorage.getItem('RSS-Puzzle');
        if (isNotNullable(userData)) {
            return true;
        }
        return false;
    }
}
