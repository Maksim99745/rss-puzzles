export interface NewElementOptions<K> {
    selector: K;
    className?: string;
    parent?: HTMLElement;
    textContent?: string;
}

export interface ErrorMessageOptions {
    input: HTMLInputElement;
    message: string;
    result: boolean;
}

export interface User {
    name: string;
    surname: string;
}
