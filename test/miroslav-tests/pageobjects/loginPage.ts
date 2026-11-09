import { $ } from '@wdio/globals'
import { ChainablePromiseElement } from 'webdriverio'
import Page from '../../pageobjects/page';

class LoginPage extends Page {

    get headerLoginButton(): ChainablePromiseElement {
        return $('#login2');
    }

    get loginUserNameField(): ChainablePromiseElement {
        return $('#loginusername');
    }

    get loginPasswordField(): ChainablePromiseElement {
        return $('#loginpassword');
    }

    get logInButton(): ChainablePromiseElement {
        return $('button[onclick="logIn()"]');
    }

    get closeButtonLoginForm(): ChainablePromiseElement {
        return $('#logInModal .btn-secondary');
    }

    get logoutButton(): ChainablePromiseElement {
        return $('#logout2');
    }

    get welcomeUserText(): ChainablePromiseElement {
        return $('#nameofuser');
    }

    public async waitForLoginFormOpen() {
        await this.waitForModalOpen('#logInModal');
    }

    public async setLoginUserName(userName: string) {
        await this.loginUserNameField.setValue(userName);
    }

    public async setLoginPassword(password: string) {
        await this.loginPasswordField.setValue(password);
    }

    public open() {
        return super.open('');
    }
}

export default new LoginPage();