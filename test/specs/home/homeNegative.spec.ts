
 // Import the HomePage class
import HomePage from '../../pageobjects/home.page'

// Group all negative Home Page tests
describe('Home Page - Negative', () => {

    // Create an instance of the HomePage
    const homePage = new HomePage()

    // Run before each test
    beforeEach(async () => {

        // Open the DemoBlaze website
        await homePage.open('index.html')

    })

    // Verify that the Welcome username is not displayed
    it('HN-01: Welcome Username Is Not Displayed', async () => {

        // Check that the Welcome username is not displayed
        await expect(homePage.welcomeUser).not.toBeDisplayed()

    })

    // Verify that the Log Out link is not displayed
    it('HN-02: Log Out Link Is Not Displayed', async () => {

        // Check that the Log Out link is not displayed
        await expect(homePage.logOutLink).not.toBeDisplayed()

    })

    // Verify that the Log In link is displayed
    it('HN-03: Log In Link Is Displayed', async () => {

        // Check that the Log In link is displayed
        await expect(homePage.logInLink).toBeDisplayed()

    })

    // Verify that the Sign Up link is displayed
    it('HN-04: Sign Up Link Is Displayed', async () => {

        // Check that the Sign Up link is displayed
        await expect(homePage.signUpLink).toBeDisplayed()

    })

})
