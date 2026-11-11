import SignUpPage from '../../../pageobjects/signUp.page'

// Group all negative Sign Up tests
describe('Sign Up', () => {

    // Create an instance of the SignUpPage
    const signUpPage = new SignUpPage()

    // Run before each test
    beforeEach(async () => {

        // Open the Demoblaze website
        await signUpPage.open('')

        // Click on the Sign Up link
        await signUpPage.signUpLink.click()
    })

    // Define the test for Sign Up with empty username
    it('SU-05 – Sign Up with Empty Username', async () => {

        // Enter a username
        await signUpPage.usernameInput.setValue('')

        // Enter a password
        await signUpPage.passwordInput.setValue('testuser123')

        // Click on the Sign Up button
        await signUpPage.signUpButton.click()

        // Get the text from the alert
        const alertText = await browser.getAlertText()

        // Accept the alert
        await browser.acceptAlert()

        // Verify the error message
        await expect(alertText).toEqual('Please fill out Username and Password.')
    })

    // Define the test for Sign Up with empty password
    it('SU-06 – Sign Up with Empty Password', async () => {

        // Enter a username
        await signUpPage.usernameInput.setValue('testuser123')

        // Enter a password
        await signUpPage.passwordInput.setValue('')

        // Click on the Sign Up button
        await signUpPage.signUpButton.click()

        // Get the text from the alert
        const alertText = await browser.getAlertText()

        // Accept the alert
        await browser.acceptAlert()

        // Verify the error message
        await expect(alertText).toEqual('Please fill out Username and Password.')
    })

    // Define the test for Sign Up with existing username
    it('SU-07 – Sign Up with Existing Username', async () => {

        // Enter a username
        await signUpPage.usernameInput.setValue('testuser123')

        // Enter a password
        await signUpPage.passwordInput.setValue('testuser123')

        // Click on the Sign Up button
        await signUpPage.signUpButton.click()

        // Get the text from the alert
        const alertText = await browser.getAlertText()

        // Accept the alert
        await browser.acceptAlert()

        // Verify the error message
        await expect(alertText).toEqual('This user already exists.')
    })

    // Define the test for Sign Up with username containing only spaces
    it('SU-08 – Sign Up with Username Containing Only Spaces', async () => {

        // Enter a username containing only spaces
        await signUpPage.usernameInput.setValue('     ')

        // Enter a password
        await signUpPage.passwordInput.setValue('testuser123')

        // Click on the Sign Up button
        await signUpPage.signUpButton.click()

        // Get the text from the alert
        const alertText = await browser.getAlertText()

        // Accept the alert
        await browser.acceptAlert()

        // Verify the error message
        await expect(alertText).toEqual('Please fill out Username and Password.')
    })
        // Define the test for Sign Up with username containing only spaces and empty password
    it('SU-09 – Sign Up with Username Containing Only Spaces and Empty Password', async () => {

        // Enter a username containing only spaces
        await signUpPage.usernameInput.setValue('     ')

        // Enter an empty password
        await signUpPage.passwordInput.setValue('')

        // Click on the Sign Up button
        await signUpPage.signUpButton.click()

        // Get the text from the alert
        const alertText = await browser.getAlertText()

        // Accept the alert
        await browser.acceptAlert()

        // Verify the error message
        await expect(alertText).toEqual('Please fill out Username and Password.')
    })