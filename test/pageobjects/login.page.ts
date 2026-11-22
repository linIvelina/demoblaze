import Page from './page'
class LoginPage extends Page {
    get loginLink() {
        return $('#login2')
    }
    get usernameInput() {
        return $('#loginusername')
    }
    get passwordInput() {
        return $('#loginpassword')
    }
    get loginButton() {
        return $('button[onclick="logIn()"]')
    }
    async openLoginModal() {
        await this.loginLink.click()
    }
    async login(username: string, password: string) {
        await this.usernameInput.setValue(username)
        await this.passwordInput.setValue(password)

        browser.once('dialog', async (dialog) => {
            await dialog.accept()
        })

        await this.loginButton.click()
    }
    async loginAndGetAlert(username: string, password: string) {
        await this.usernameInput.setValue(username)
        await this.passwordInput.setValue(password)

        const alertMessage = new Promise<string>((resolve) => {
            browser.once('dialog', async (dialog) => {
                const message = await dialog.message()
                await dialog.accept()
                resolve(message)
            })
        })
        await this.loginButton.click()

        return await alertMessage

    }

}
export default new LoginPage()