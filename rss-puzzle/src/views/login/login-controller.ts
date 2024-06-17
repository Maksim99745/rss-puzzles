import './login-view.css';
import { isNotNullable } from '../../utilits/common';
import { LoginPage } from './login-view';

export class LoginPageController {
    drawLoginPage() {
        const body = document.querySelector('body');
        if (isNotNullable(body)) {
            new LoginPage(body).draw();
        }
    }
}
