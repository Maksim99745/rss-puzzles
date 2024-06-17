import './start-view.css';
import { isNotNullable } from '../../utilits/common';
import { StartPage } from './start-view';

export class StartPageController {
    drawStartPage() {
        const body = document.querySelector('body');
        if (isNotNullable(body)) {
            const startPageView = new StartPage(body);
            startPageView.draw();
        }
    }
}
