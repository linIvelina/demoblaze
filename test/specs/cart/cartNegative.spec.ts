
// Import the AboutUsPage class
import AboutUsPage from '../../pageobjects/aboutUs.page'
import HomePage from '../../pageobjects/home.page'

// Group all negative About Us tests
describe('About Us - Negative', () => {

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

    // Verify that the modal is not displayed after clicking Close
    it('AU-08: Modal Is Not Displayed After Closing', async () => {

        // Click on the Close button
        await aboutUsPage.closeButton.click()

        // Check that the modal is not displayed
        await expect(aboutUsPage.aboutUsModal).not.toBeDisplayed()

    })

    // Verify that the modal title is not displayed after closing
    it('AU-09: Modal Title Is Not Displayed After Closing', async () => {

        // Click on the Close button
        await aboutUsPage.closeButton.click()

        // Check that the modal title is not displayed
        await expect(aboutUsPage.modalTitle).not.toBeDisplayed()

    })

    // Verify that the video is not displayed after closing
    it('AU-10: Video Is Not Displayed After Closing', async () => {

        // Click on the Close button
        await aboutUsPage.closeButton.click()

        // Check that the video is not displayed
        await expect(aboutUsPage.video).not.toBeDisplayed()

    })

    // Verify that the Close button is not displayed after closing
    it('AU-11: Close Button Is Not Displayed After Closing', async () => {

        // Click on the Close button
        await aboutUsPage.closeButton.click()

        // Check that the Close button is not displayed
        await expect(aboutUsPage.closeButton).not.toBeDisplayed()

    })

    // Verify that the footer Close button is not displayed after closing
    it('AU-12: Footer Close Button Is Not Displayed After Closing', async () => {

        // Click on the footer Close button
        await aboutUsPage.closeModalButton.click()

        // Check that the footer Close button is not displayed
        await expect(aboutUsPage.closeModalButton).not.toBeDisplayed()

    })

})
