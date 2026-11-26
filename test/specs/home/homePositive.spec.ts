
 // Import the HomePage class
import HomePage from '../../pageobjects/home.page'

// Group all positive Home Page tests
describe('Home Page - Positive', () => {

    // Create an instance of the HomePage
    const homePage = new HomePage()

    // Run before each test
    beforeEach(async () => {

        // Open the DemoBlaze website
        await homePage.open('index.html')

    })

    // Verify that the Home page opens successfully
    it('HP-01: Home Page Opens Successfully', async () => {

        // Verify that the URL is correct
        await expect(browser).toHaveUrl(
            'https://www.demoblaze.com/index.html'
        )

    })

    // Verify that the logo is displayed
    it('HP-02: Logo Is Displayed', async () => {

        // Check that the logo is displayed
        await expect(homePage.logo).toBeDisplayed()

    })

    // Verify that the navigation menu is displayed
    it('HP-03: Navigation Menu Is Displayed', async () => {

        // Check that the navigation menu is displayed
        await expect(homePage.navigationMenu).toBeDisplayed()

    })

    // Verify that the Home link is displayed
    it('HP-04: Home Link Is Displayed', async () => {

        // Check that the Home link is displayed
        await expect(homePage.homeLink).toBeDisplayed()

    })
    
    // Verify that the Contact link is displayed
    it('HP-05: Contact Link Is Displayed', async () => {

        // Check that the Contact link is displayed
        await expect(homePage.contactLink).toBeDisplayed()

    })

    // Verify that the About Us link is displayed
    it('HP-06: About Us Link Is Displayed', async () => {

        // Check that the About Us link is displayed
        await expect(homePage.aboutUsLink).toBeDisplayed()

    })

    // Verify that the Cart link is displayed
    it('HP-07: Cart Link Is Displayed', async () => {

        // Check that the Cart link is displayed
        await expect(homePage.cartLink).toBeDisplayed()

    })

    // Verify that the product categories are displayed
    it('HP-08: Product Categories Are Displayed', async () => {

        // Check that the product categories are displayed
        await expect(homePage.categories).toBeDisplayed()

    })

    // Verify that the product list is displayed
    it('HP-09: Product List Is Displayed', async () => {

        // Check that the product list is displayed
        await expect(homePage.productList).toBeDisplayed()

    })


})
