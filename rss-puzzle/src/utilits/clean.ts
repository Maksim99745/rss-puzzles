import { isHTMLElement, isNotNullable } from './common';

export class DestroyChilds {
    public cleanBody() {
        const body = document.querySelector('body');
        if (isNotNullable(body)) {
            const bodyFirstChild = body.firstChild;
            if (isNotNullable(bodyFirstChild) && bodyFirstChild instanceof HTMLElement) {
                bodyFirstChild.classList.remove('fadeIn');
                bodyFirstChild.classList.add('fadeOut');
            }
            setTimeout(() => {
                if (isNotNullable(bodyFirstChild)) {
                    while (body.firstChild) {
                        body.removeChild(body.firstChild);
                    }
                }
            }, 1200);
        }
    }

    public cleanElement(parent: HTMLElement) {
        const childs = parent.childNodes;
        childs.forEach((child) => {
            if (isHTMLElement(child)) {
                child.classList.remove('fadeIn');
                child.classList.add('fadeOut');
            }
        });
        if (isHTMLElement(parent)) {
            setTimeout(() => {
                if (isNotNullable(parent.firstChild)) {
                    while (parent.firstChild) {
                        parent.removeChild(parent.firstChild);
                    }
                }
            }, 1000);
        }
    }
}
