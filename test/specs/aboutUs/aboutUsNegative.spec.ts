
 // Import the HomePage and AboutUsPage classes
import HomePage from '../../pageobjects/home.page'
import AboutUsPage from '../../pageobjects/aboutUs.page'

// Group all negative About Us tests
describe('About Us - Negative', () => {

    // Create instances of the HomePage and AboutUsPage
    const homePage = new HomePage()
    const aboutUsPage = new AboutUsPage()

    // Run before each test
    beforeEach(async () => {

        // Open the DemoBlaze website
        await homePage.open('index.html')

    })

    // Verify that the About Us modal is not displayed initially
    it('AU-07: About Us Modal Is Not Displayed Initially', async () => {

        // Check that the modal is not displayed
        await expect(aboutUsPage.aboutUsModal).not.toBeDisplayed()

    })

    // Verify that the modal title is not displayed initially
    it('AU-08: About Us Title Is Not Displayed Initially', async () => {

        // Check that the modal title is not displayed
        await expect(aboutUsPage.modalTitle).not.toBeDisplayed()

    })

    // Verify that the video is not displayed initially
    it('AU-09: About Us Video Is Not Displayed Initially', async () => {

        // Check that the video is not displayed
        await expect(aboutUsPage.video).not.toBeDisplayed()

    })

    // Verify that the About Us modal cannot be closed before opening
    it('AU-10: About Us Modal Cannot Be Closed Before Opening', async () => {

        // Check that the Close button is not displayed
        await expect(aboutUsPage.closeButton).not.toBeDisplayed()

    })

    // Verify that the footer Close button is not displayed initially
    it('AU-11: Footer Close Button Is Not Displayed Initially', async () => {

        // Check that the footer Close button is not displayed
        await expect(aboutUsPage.closeModalButton).not.toBeDisplayed()

    })

    // Verify that the About Us modal remains closed after page reload
    it('AU-12: About Us Modal Remains Closed After Page Reload', async () => {

        // Reload the website
        await browser.refresh()

        // Check that the modal is not displayed
        await expect(aboutUsPage.aboutUsModal).not.toBeDisplayed()

    })

})
