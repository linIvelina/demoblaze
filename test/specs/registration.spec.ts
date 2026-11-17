import { expect } from '@wdio/globals'
import RegisterPage from '../pageobjects/register.page'

describe('Sign Up', () => {
    beforeEach(async () => {
        await browser.url('/')
    })
    // Select close button on the modal
    it('should open and close the sign up modal', async () => {
        await RegisterPage.btnSignupNav.click()
        await expect(RegisterPage.modal).toBeDisplayed()
        await RegisterPage.waitForModalOpen()

        await RegisterPage.btnClose.click()
        await expect(RegisterPage.modal).not.toBeDisplayed()
    })

    // Successfull sign up
    it('should sign up successfully', async () => {
        const testEmail = 'hatche.redzhebova@mobilewaves.com'
        const testPassword = '9705041473Xachi!'

        await RegisterPage.btnSignupNav.click()
        await RegisterPage.inputUsername.setValue(testEmail)
        await RegisterPage.inputPassword.setValue(testPassword)
        await RegisterPage.btnSubmitSignup.click()
        await browser.pause(500)
        const text = await RegisterPage.getAlertText()
        await expect(text).toEqual('Sign up successful.')
    })

    // Empty password field
    it('should show a modal fill out Username and Password. ', async () => {
        const testEmail = 'hatche.redzhebova@mobilewaves.com'

        await RegisterPage.btnSignupNav.click()
        await RegisterPage.inputUsername.setValue(testEmail)
        await RegisterPage.btnSubmitSignup.click()
        const text = await RegisterPage.getAlertText()
        await expect(text).toEqual('Please fill out Username and Password.')
    })
    // Try to register with an exsisting user
    it('This user already exists.', async () => {
        const testEmail = 'hatche.redzhebova@mobilewaves.com'
        const testPassword = '9705041473Xachi!'

        await RegisterPage.btnSignupNav.click()
        await RegisterPage.inputUsername.setValue(testEmail)
        await RegisterPage.inputPassword.setValue(testPassword)
        await RegisterPage.btnSubmitSignup.click()
        const text = await RegisterPage.getAlertText()
        await expect(text).toEqual('This user already exists.')
    })
})