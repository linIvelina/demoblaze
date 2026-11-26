
// Import the AboutUsPage class
import AboutUsPage from '../../pageobjects/aboutUs.page'
import HomePage from '../../pageobjects/home.page'

// Group all positive About Us tests
describe('About Us - Positive', () => {

    // Create an instance of the AboutUsPage
    const aboutUsPage = new AboutUsPage()
    const homePage = new HomePage()

    // Run before each test
    beforeEach(async () => {

        // Open the DemoBlaze website
        await aboutUsPage.open('index.html')

        // Click on the About Us link
        await homePage.aboutUsLink.click()

    })

    // Verify that the About Us modal is displayed
    it('AU-01: About Us Modal Is Displayed', async () => {

        // Check that the modal is displayed
        await expect(aboutUsPage.aboutUsModal).toBeDisplayed()

    })

    // Verify that the modal title is displayed
    it('AU-02: Modal Title Is Displayed', async () => {

        // Check that the modal title is displayed
        await expect(aboutUsPage.modalTitle).toBeDisplayed()

    })

    // Verify that the video is displayed
    it('AU-03: Video Is Displayed', async () => {

        // Check that the video element is displayed
        await expect(aboutUsPage.video).toBeDisplayed()

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

    // Verify that the modal can be closed using the Close button
    it('AU-06: Modal Closes Using Close Button', async () => {

        // Click on the Close button
        await aboutUsPage.closeButton.click()

        // Check that the modal is no longer displayed
        await expect(aboutUsPage.aboutUsModal).not.toBeDisplayed()

    })

    // Verify that the modal can be closed using the footer Close button
    it('AU-07: Modal Closes Using Footer Close Button', async () => {

        // Click on the footer Close button
        await aboutUsPage.closeModalButton.click()

        // Check that the modal is no longer displayed
        await expect(aboutUsPage.aboutUsModal).not.toBeDisplayed()

    })

})
