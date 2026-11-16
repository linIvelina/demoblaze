
// Import the LogInPage class from the pageobjects folder
import LogInPage from '../../../pageobjects/login.page'
// Group all positive Log In tests
describe('Log In', () => {

    // Create an instance of the LogInPage
    const logInPage = new LogInPage()

    // Run before each test
    beforeEach(async () => {

        // Open the Demoblaze website
        await logInPage.open('')

        // Click on the Log In link
        await logInPage.logInLink.click()
    })

    // Define the test for successful Log In
    it('LI-01 – Successful Log In', async () => {

        // Enter a username
        await logInPage.usernameInput.setValue('testuser123')

        // Enter a password
        await logInPage.passwordInput.setValue('testuser123')

        // Click on the Log In button
        await logInPage.logInButton.click()

        // Verify that the welcome message is displayed
        await expect(logInPage.welcomeUser).toHaveText('Welcome testuser123')
    })

    // Define the test for remaining logged in after page refresh
    it('LI-02 – User Remains Logged In After Page Refresh', async () => {

        // Enter a username
        await logInPage.usernameInput.setValue('testuser123')

        // Enter a password
        await logInPage.passwordInput.setValue('testuser123')

        // Click on the Log In button
        await logInPage.logInButton.click()

        // Verify that the welcome message is displayed
        await expect(logInPage.welcomeUser).toHaveText('Welcome testuser123')

        // Refresh the page
        await browser.refresh()

        // Verify that the user remains logged in after refresh
        await expect(logInPage.welcomeUser).toHaveText('Welcome testuser123')
    })

    // Define the test for successful Log In after Logout
     it('LI-03 – Successful Log In After Logout', async () => {

    // Enter a username
    await logInPage.usernameInput.setValue('testuser123')

    // Enter a password
    await logInPage.passwordInput.setValue('testuser123')

    // Click on the Log In button
    await logInPage.logInButton.click()

    // Verify that the welcome message is displayed
    await expect(logInPage.welcomeUser).toHaveText('Welcome testuser123')

    // Click on the Log Out link
    await logInPage.logOutLink.click()

    // Verify that the Log In link is displayed
    await expect(logInPage.logInLink).toBeDisplayed()

    // Click on the Log In link
    await logInPage.logInLink.click()

    // Enter a username again               
    await logInPage.usernameInput.setValue('testuser123')

    // Enter a password again
    await logInPage.passwordInput.setValue('testuser123')

    // Click on the Log In button
    await logInPage.logInButton.click()

    // Verify that the welcome message is displayed
    await expect(logInPage.welcomeUser).toHaveText('Welcome testuser123')

})
})
