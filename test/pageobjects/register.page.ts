import { browser } from '@wdio/globals'
import Page from './page'

class RegisterPage extends Page {
    public get btnSignupNav() {
        return $('#signin2')
    }

    public get modal() {
        return $('#signInModal')
    }

    public get btnClose() {
        return $('#signInModal .close')
    }

    public get btnCloseFooter() {
        return $('#signInModal .modal-footer .btn-secondary')
    }

    public get inputUsername() {
        return $('#sign-username')
    }

    public get inputPassword() {
        return $('#sign-password')
    }

    public get btnSubmitSignup() {
        return $('button[onclick="register()"]')
    }

    public async waitForModalOpen() {
        await browser.waitUntil(
            async () => (await this.modal.getCSSProperty('opacity')).value === 1,
            { timeout: 3000, timeoutMsg: 'Modal did not finish opening animation' }
        )
        await browser.pause(200)
    }

    public async stubAlert() {
        await browser.execute(() => {
            sessionStorage.removeItem('__capturedAlert')
            window.alert = (msg?: any) => { sessionStorage.setItem('__capturedAlert', String(msg)) }
        })
    }

    public async getCapturedAlertText(timeout = 5000) {
        await browser.waitUntil(
            async () => (await browser.execute(() => sessionStorage.getItem('__capturedAlert'))) !== null,
            { timeout, timeoutMsg: 'Alert was not triggered in time' }
        )
        return browser.execute(() => sessionStorage.getItem('__capturedAlert'))
    }
}

export default new RegisterPage()
