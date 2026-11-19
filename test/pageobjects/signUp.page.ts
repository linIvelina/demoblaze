import { $, browser } from '@wdio/globals'
import Page from './page'

class SignupPage extends Page {

    public get inputUsername() {
        return $('#sign-username')
    }

    public get inputPassword() {
        return $('#sign-password')
    }

    public get btnOpenSignUp() {
        return $('#signin2')
    }

    public get btnSubmitSignUp() {
        return $('[onclick="register()"]')
    }

    public async openSignUpModal() {
        await this.btnOpenSignUp.click()

    }

    public async signUp(username: string, password: string): Promise<string> {

        await this.inputUsername.waitForDisplayed({ timeout: 5000 })
        await this.inputUsername.setValue(username)

        await this.inputPassword.waitForDisplayed({ timeout: 5000 })
        await this.inputPassword.setValue(password)

        let alertText: string | undefined

        // Listen for the alert BEFORE clicking Sign up
        browser.once('dialog', async (dialog) => {
            const message = await dialog.message()
            await dialog.accept()
            alertText = message
        })

        await this.btnSubmitSignUp.click()

        await browser.waitUntil(
            async () => alertText !== undefined,
            {
                timeout: 10000,
                timeoutMsg: 'Expected sign-up alert to be displayed within 10s'
            }
        )

        return alertText!
    }


}


export default new SignupPage()