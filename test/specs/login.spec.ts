import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'

describe('Login', () => {
    it('should open Login modal', async () => {
        await browser.url('/')
        await LoginPage.openLoginModal()
        await expect($('#logInModal')).toBeDisplayed()
        await expect(LoginPage.usernameInput).toBeDisplayed()
        await expect(LoginPage.passwordInput).toBeDisplayed()
    })

    it('should login successfully', async () => {
        await browser.url('/')
        await LoginPage.openLoginModal()
        await LoginPage.login(
            process.env.LOGIN_USERNAME!,
            process.env.LOGIN_PASSWORD!
        )

        await expect($('#nameofuser')).toHaveText(`Welcome ${process.env.LOGIN_USERNAME}`)
        await expect($('#logout2')).toBeDisplayed()
    })

    it('should show error when password is incorrect', async () => {
        await browser.url('/')
        await LoginPage.openLoginModal()

        const alertMessage = await LoginPage.loginAndGetAlert(
            process.env.LOGIN_USERNAME!,
            'WrongPassword123'
        )
        await expect(alertMessage).toBe('Wrong password.')
    })

    it('should show error when username does not exist', async () => {
        await browser.url('/')
        await LoginPage.openLoginModal()

        const alertMessage = await LoginPage.loginAndGetAlert(
            'unknown_user_12345',
            process.env.LOGIN_PASSWORD!
        )
        await expect(alertMessage).toBe('User does not exist.')

    })



})