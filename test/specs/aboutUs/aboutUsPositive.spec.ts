
 // Import the HomePage and AboutUsPage classes
import HomePage from '../../pageobjects/home.page'
import AboutUsPage from '../../pageobjects/aboutUs.page'

// Group all positive About Us tests
describe('About Us - Positive', () => {

    // Create instances of the HomePage and AboutUsPage
    const homePage = new HomePage()
    const aboutUsPage = new AboutUsPage()

    // Run before each test
    beforeEach(async () => {

        // Open the DemoBlaze website
        await homePage.open('index.html')

        // Click on the About Us link
        await homePage.aboutUsLink.click()

    })

    // Verify that the About Us modal opens successfully
    it('AU-01: About Us Modal Opens Successfully', async () => {

        // Verify that the modal is displayed
        await expect(aboutUsPage.aboutUsModal).toBeDisplayed()

    })

    // Verify that the About Us title is displayed
    it('AU-02: About Us Title Is Displayed', async () => {

        // Check that the modal title is displayed
        await expect(aboutUsPage.modalTitle).toBeDisplayed()

    })

    // Verify that the About Us title has the correct text
    it('AU-03: About Us Title Has Correct Text', async () => {

        // Check that the title text is correct
        await expect(aboutUsPage.modalTitle).toHaveText('About us')

    })

    // Verify that the Close button is displayed
    it('AU-04: Close Button Is Displayed', async () => {

        // Check that the Close button is displayed
        await expect(aboutUsPage.closeButton).toBeDisplayed()

    })

    // Verify that the footer Close button is displayed
    it('AU-05: Footer Close Button Is Displayed', async () => {

        // Check that the footer Close button is displayed
        await expect(aboutUsPage.closeModalButton).toBeDisplayed()

    })

    // Verify that the About Us modal closes successfully
    it('AU-06: About Us Modal Closes Successfully', async () => {

        // Click the Close button
        await aboutUsPage.closeModalButton.click()

        // Verify that the modal is no longer displayed
        await expect(aboutUsPage.aboutUsModal).not.toBeDisplayed()

    })

})
