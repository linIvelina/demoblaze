import { $ } from '@wdio/globals'
import Page from './page.ts'
import { browser } from '@wdio/globals'

class SignUpPage extends Page {
    get signUpButtonNavBar() { return $('#signin2'); }
    get usernameInput() { return $('#sign-username'); }
    get passwordInput() { return $('#sign-password'); }
    get signUpButton() { return $('#signInModal').$('button=Sign up'); }
    get closeButton() { return $('#signInModal').$('button=Close'); }

    async openSignUpModal() {
        await this.signUpButtonNavBar.click();
        await this.usernameInput.waitForStable();
        await browser.pause(400);
    }

    async signUp(username: string, password: string) {
        await this.openSignUpModal();
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.signUpButton.click();
    }
}

export default new SignUpPage();
