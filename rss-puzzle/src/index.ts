import './global.css';
import { LoginPageController } from './views/login/login-controller';
import { PersistanceService } from './utilits/persistance';
import { StartPageController } from './views/start/start-conroller';

const persistance = new PersistanceService();

if (persistance.load()) {
    const startPageController = new StartPageController();
    startPageController.drawStartPage();
} else {
    const loginPageController = new LoginPageController();
    loginPageController.drawLoginPage();
}
