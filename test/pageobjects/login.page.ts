import { browser } from '@wdio/globals'
import Page from './page'

class LoginPage extends Page {
    public get btnLoginNav() {
        return $('#login2')
    }

    public get modal() {
        return $('#logInModal')
    }

    public get btnClose() {
        return $('#logInModal .close')
    }

    public get btnCloseFooter() {
        return $('#logInModal .modal-footer .btn-secondary')
    }

    public get inputUsername() {
        return $('#loginusername')
    }

    public get inputPassword() {
        return $('#loginpassword')
    }

    public get btnSubmitLogin() {
        return $('button[onclick="logIn()"]')
    }

    public get welcomeUser() {
        return $('#nameofuser')
    }

    public get btnLogout() {
        return $('#logout2')
    }

    public async login(username: string, password: string) {
        await this.btnLoginNav.click()
        await this.inputUsername.setValue(username)
        await this.inputPassword.setValue(password)
        await this.btnSubmitLogin.click()
    }

    public async waitForModalOpen() {
        await browser.waitUntil(
            async () => (await this.modal.getCSSProperty('opacity')).value === 1,
            { timeout: 3000, timeoutMsg: 'Modal did not finish opening animation' }
        )
        await browser.pause(200)
    }

    public async getAlertText() {
        return browser.getAlertText()
    }

    public async acceptAlert() {
        return browser.acceptAlert()
    }
}

export default new LoginPage()
