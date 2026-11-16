// Import the SignUpPage class from the pageobjects folder
import SignUpPage from '../../../pageobjects/signUp.page'

// Group all positive Sign Up tests
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

    // Define the test for successful registration
    it('SU-01 – Successful Sign Up', async () => {

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

        // Verify the success message
        await expect(alertText).toEqual('Sign up successful.')
    })

    // Define the test for successful registration with a different username
    it('SU-02 – Sign Up with Different Valid Username', async () => {

        // Enter a username
        await signUpPage.usernameInput.setValue('testuser456')

        // Enter a password
        await signUpPage.passwordInput.setValue('testuser456')

        // Click on the Sign Up button
        await signUpPage.signUpButton.click()

        // Get the text from the alert
        const alertText = await browser.getAlertText()

        // Accept the alert
        await browser.acceptAlert()

        // Verify the success message
        await expect(alertText).toEqual('Sign up successful.')
    })

    // Define the test for successful registration with a different valid username and password
    it('SU-03 – Sign Up with Different Valid Username and Password', async () => {

        // Enter a username
        await signUpPage.usernameInput.setValue('testuser789')

        // Enter a password
        await signUpPage.passwordInput.setValue('Password789')

        // Click on the Sign Up button
        await signUpPage.signUpButton.click()

        // Get the text from the alert
        const alertText = await browser.getAlertText()

        // Accept the alert
        await browser.acceptAlert()

        // Verify the success message
        await expect(alertText).toEqual('Sign up successful.')
    })

    // Define the test for successful registration with a username and password containing different lengths
    it('SU-04 – Sign Up with Username and Password Containing Different Lengths', async () => {

        // Enter a username
        await signUpPage.usernameInput.setValue('user123')

        // Enter a password
        await signUpPage.passwordInput.setValue('testuser456!!!')

        // Click on the Sign Up button
        await signUpPage.signUpButton.click()

        // Get the text from the alert
        const alertText = await browser.getAlertText()

        // Accept the alert
        await browser.acceptAlert()

        // Verify the success message
        await expect(alertText).toEqual('Sign up successful.')
    })

})