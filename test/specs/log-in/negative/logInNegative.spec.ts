// Import the LogInPage class from the pageobjects folder
import LogInPage from '../../../pageobjects/login.page'
// Group all negative Log In tests
describe('Log In - Negative', () => {

    // Create an instance of the LogInPage
    const logInPage = new LogInPage()

    // Run before each test
    beforeEach(async () => {

        // Open the Demoblaze website
        await logInPage.open('')

        // Click on the Log In link
        await logInPage.logInLink.click()
    })

    // Define the test for Log In with an incorrect password
    it('LI-04 – Log In with Incorrect Password', async () => {

        // Enter an existing username
        await logInPage.usernameInput.setValue('testuser123')

        // Enter an incorrect password
        await logInPage.passwordInput.setValue('testuser')

        // Click on the Log In button
        await logInPage.logInButton.click()

        // Get the text from the alert
        const alertText = await browser.getAlertText()

        // Accept the alert
        await browser.acceptAlert()

        // Verify the error message
        await expect(alertText).toEqual('Wrong password.')
    })
    // Define the test for Log In with a non-existing username
    it('LI-05 – Log In with Non-Existing Username', async () => {

        // Enter a non-existing username
        await logInPage.usernameInput.setValue('nonexistinguser123')

        // Enter a password
        await logInPage.passwordInput.setValue('testuser123')

        // Click on the Log In button
        await logInPage.logInButton.click()

        // Get the text from the alert
        const alertText = await browser.getAlertText()

        // Accept the alert
        await browser.acceptAlert()

        // Verify the error message
        await expect(alertText).toEqual('User does not exist.')
    })
    // Define the test for Log In with empty fields
    it('LI-06 – Log In with Empty Fields', async () => {

        // Leave the username field empty

        // Leave the password field empty

        // Click on the Log In button
        await logInPage.logInButton.click()

        // Get the text from the alert
        const alertText = await browser.getAlertText()

        // Accept the alert
        await browser.acceptAlert()

        // Verify the error message
        await expect(alertText).toEqual('Please fill out Username and Password.')
    })
})
