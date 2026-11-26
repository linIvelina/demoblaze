
import CartPage from '../../pageobjects/cart.page'
import HomePage from '../../pageobjects/home.page'

// Group all negative Cart tests
describe('Cart Page - Negative', () => {

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

    // Verify that the cart is empty
    it('CP-NEG-01: Cart Is Empty When No Products Are Added', async () => {

        // Check that no products are displayed
        await expect(cartPage.cartProducts).toBeElementsArrayOfSize(0)

    })

    // Verify that the total price is zero when the cart is empty
    it('CP-NEG-02: Total Price Is Zero When Cart Is Empty', async () => {

        // Check that the total price is zero
        await expect(cartPage.totalPrice).toHaveText('')

    })

    // Verify that the cart table is empty
    it('CP-NEG-03: Cart Has No Product Rows When Empty', async () => {

        // Check that no product rows are displayed
        await expect(cartPage.cartProducts).toBeElementsArrayOfSize(0)

    })

})
