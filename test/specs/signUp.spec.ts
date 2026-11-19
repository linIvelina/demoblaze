import { expect } from '@wdio/globals'
import signUpPage from '../pageobjects/signUp.page'

describe('Signup page', () => {

    it('should open sign modal', async () => {
        await signUpPage.open('')
        await signUpPage.openSignUpModal()

        await expect(signUpPage.inputUsername).toBeDisplayed()
        await expect(signUpPage.inputPassword).toBeDisplayed()

        await expect(signUpPage.inputUsername).toBeEnabled()
        await expect(signUpPage.inputPassword).toBeEnabled()
    })
    it('should register a new user successfully', async () => {
        const username = `qa_ivelina_${Date.now()}`
        const password = process.env.SIGNUP_PASSWORD
        if (!password) {
            throw new Error('SIGNUP_PASSWORD is not set in .env')
        }

        await signUpPage.open('')
        await signUpPage.openSignUpModal()


        const alertText = await signUpPage.signUp(username, password)

        expect(alertText).toBe('Sign up successful.')



    })
    it('should display an error when registering with an existing username', async () => {
        const username = `qa_ivelina_test`
        const password = process.env.SIGNUP_PASSWORD

        if (!password) {
            throw new Error('SIGNUP_PASSWORD is not set in .env')
        }
        await signUpPage.open('')
        await signUpPage.openSignUpModal()


        const alertText = await signUpPage.signUp(username, password)

        expect(alertText).toBe('This user already exist.')


    })

    it('should display an error when username is empty', async () => {
        const password = process.env.SIGNUP_PASSWORD

        if (!password) {
            throw new Error('SIGNUP_PASSWORD is not set in .env')
        }

        await signUpPage.open('')
        await signUpPage.openSignUpModal()


        const alertText = await signUpPage.signUp('', password)

        expect(alertText).toBe('Please fill out Username and Password.')
    })
    it('should display an error when password is empty', async () => {
        const username = `qa_ivelina_${Date.now()}`

        await signUpPage.open('')
        await signUpPage.openSignUpModal()
        const alertText = await signUpPage.signUp(username, '')

        expect(alertText).toBe('Please fill out Username and Password.')
    })
    it('should register a user when username and password contain spaces', async () => {
        const password = process.env.SIGNUP_PASSWORD

        if (!password) {
            throw new Error('SIGNUP_PASSWORD is not set in .env')
        }

        await signUpPage.open('')
        await signUpPage.openSignUpModal()

        const usernameAlert = await signUpPage.signUp(`ive spalinas_${Date.now()}`, password)

        expect(usernameAlert).toBe('Sign up successful.')

        await signUpPage.open('')
        await signUpPage.openSignUpModal()

        const passwordAlert = await signUpPage.signUp(`qa_ivelina_${Date.now()}`, 'Test 123456')

        expect(passwordAlert).toBe('Sign up successful.')
    })


})