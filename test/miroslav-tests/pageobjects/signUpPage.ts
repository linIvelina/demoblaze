import { $ } from '@wdio/globals'
import { ChainablePromiseElement } from 'webdriverio'
import Page from '../../pageobjects/page';

class SignUpPage extends Page {

    get signUpButton(): ChainablePromiseElement {
        return $('#signin2');
    }

    get userNameInput(): ChainablePromiseElement {
        return $('#sign-username');
    }

    get passwordInput(): ChainablePromiseElement {
        return $('#sign-password');
    }

    get submitButton(): ChainablePromiseElement {
        return $('button[onclick="register()"]');
    }

    public async waitForSignUpFormOpen() {
        await this.waitForModalOpen('#signInModal');
    }

    public async setUserName(userName: string) {
        await this.userNameInput.setValue(userName);
    }

    public async setPassword(password: string) {
        await this.passwordInput.setValue(password);
    }

    public open() {
        return super.open('');
    }
}

export default new SignUpPage();
