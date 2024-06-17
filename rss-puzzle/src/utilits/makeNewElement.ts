import { NewElementOptions } from '../types';
import { isNotNullable } from './common';

export const makeNewElement = <T extends keyof HTMLElementTagNameMap>(options: NewElementOptions<T>) => {
    const { selector, className, parent, textContent } = options;
    const newElement = document.createElement<T>(selector);
    if (isNotNullable(className)) {
        newElement.classList.add(className);
        if (textContent) {
            newElement.textContent = textContent;
        }
    }
    if (isNotNullable(parent)) {
        parent.appendChild(newElement);
    }
    return newElement;
};
