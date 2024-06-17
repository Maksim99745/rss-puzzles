export function isNotNullable<T>(value: unknown): value is NonNullable<T> {
    return value !== null && value !== undefined;
}

export function isHTMLElement(value: unknown): value is HTMLElement {
    if (value === null || value === undefined) {
        return false;
    }
    return value instanceof HTMLElement;
}

// export function isInputElement(value: unknown): value is HTMLInputElement {
//     if (value instanceof HTMLInputElement) {
//         return value !== null && value !== undefined;
//     }
//     return false;
// }
