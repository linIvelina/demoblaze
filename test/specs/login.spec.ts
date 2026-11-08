import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'

describe('Login Page', () => {
    beforeEach(async () => {
        await browser.url('/')
    })

    it('should open and close the login modal', async () => {
        await LoginPage.btnLoginNav.click()
        await expect(LoginPage.modal).toBeDisplayed()
        await LoginPage.waitForModalOpen()

        await LoginPage.btnClose.click()
        await expect(LoginPage.modal).not.toBeDisplayed()
    })



    it('should close the login modal with footer Close button', async () => {
        await LoginPage.btnLoginNav.click()
        await expect(LoginPage.modal).toBeDisplayed()
        await LoginPage.waitForModalOpen()

        await LoginPage.btnCloseFooter.click()
        await expect(LoginPage.modal).not.toBeDisplayed()
    })

    it('аn alert should appear asking you to enter your password and username', async () => {
        await LoginPage.btnLoginNav.click()
        await LoginPage.btnSubmitLogin.click()
        await browser.pause(500)
        const text = await LoginPage.getAlertText()
        await expect(text).toEqual('Please fill out Username and Password.')
    })

    it('should sign in with valid credentials and land on the dashboard', async () => {
        const testEmail = ''
        const testPassword = ''

        await LoginPage.btnLoginNav.click()
        await LoginPage.inputUsername.setValue(testEmail)
        await LoginPage.inputPassword.setValue(testPassword)
        await LoginPage.btnSubmitLogin.click()
        await expect(LoginPage.welcomeUser).toBeDisplayed()
    })
})