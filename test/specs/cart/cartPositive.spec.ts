
import CartPage from '../../pageobjects/cart.page'
import HomePage from '../../pageobjects/home.page'

// Group all positive Cart tests
describe('Cart Page - Positive', () => {

    // Create an instance of the CartPage
    const cartPage = new CartPage()
    const homePage = new HomePage()

    // Run before each test
    beforeEach(async () => {

        // Open the DemoBlaze website
        await cartPage.open('index.html')

        // Click on the Cart link
        await homePage.cartLink.click()

    })

    // Verify that the Cart page opens successfully
    it('CP-01: Cart Page Opens Successfully', async () => {

        // Verify that the URL is correct
        await expect(browser).toHaveUrl(
            'https://www.demoblaze.com/cart.html'
        )

    })

    // Verify that the Place Order button is displayed
    it('CP-02: Place Order Button Is Displayed', async () => {

        // Check that the Place Order button is displayed
        await expect(cartPage.placeOrderButton).toBeDisplayed()

    })

    // Verify that the product table is displayed
    it('CP-03: Product Table Is Displayed', async () => {

        // Check that the product table is displayed
        await expect(cartPage.productTable).toBeDisplayed()

    })

    // Verify that the total price is displayed
    it('CP-04: Total Price Is Displayed', async () => {

        // Check that the total price is displayed
        await expect(cartPage.totalPrice).toBeDisplayed()

    })

})
