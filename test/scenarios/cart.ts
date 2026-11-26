import { browser, expect } from '@wdio/globals'
import HomePage from '../pageobjects/home.page.ts'
import ProductPage from '../pageobjects/product.page.ts'
import CartPage from '../pageobjects/cart.page.ts'
import { type Breakpoint, setPageSize } from './home.ts'

// Products used by these tests, with Demoblaze's current prices.
// Update them if the site changes.
const SAMSUNG = { title: 'Samsung galaxy s6', price: '360' }
const NOKIA = { title: 'Nokia lumia 1520', price: '820' }

/**
 * Opens a product from the home page, clicks "Add to cart" and checks the
 * site's alert says "Product added" (no full stop). Goes back to the home page afterwards.
 */
async function addToCart(productTitle: string) {
    await HomePage.open()
    await ProductPage.openFromHome(productTitle)

    const alert = CartPage.nextAlert()
    await ProductPage.addToCartButton.click()
    expect(await alert).toBe('Product added')

    await HomePage.open()
}

/**
 * Tests for the Demoblaze cart (https://www.demoblaze.com/cart.html):
 * adding and removing products, the total, and placing an order.
 *
 * Note: t7 places a (fake) order on demoblaze.com each run.
 *
 * The same tests run at every breakpoint: each spec in specs/desktop,
 * specs/tablet and specs/mobile calls this function with its own screen size.
 */
export function cartScenario(breakpoint: Breakpoint) {
    describe(`Demoblaze cart (${breakpoint.name}, ${breakpoint.width}px)`, () => {
        // Once, before all tests: resize the page to this breakpoint's width.
        before(async () => {
            await setPageSize(breakpoint)
        })

        // Before every test, start with an empty cart on a freshly loaded home page.
        // (Demoblaze keeps the cart in a cookie, so clearing cookies empties it.)
        beforeEach(async () => {
            await browser.deleteCookies()
            await HomePage.open()
        })

        // Checks that the page really is shown at this breakpoint's width, so the
        // other tests are testing the right layout.
        it(`t1 - is shown at ${breakpoint.width}px wide`, async () => {
            expect(await browser.execute(() => window.innerWidth)).toBe(breakpoint.width)
        })

        // Opens Cart from the top menu without adding anything and checks it's
        // empty: no product rows, no total, and "Place Order" can be clicked.
        it('t2 - shows an empty cart', async () => {
            await CartPage.open()

            expect(await CartPage.getItems()).toEqual([])
            await expect(CartPage.total).toHaveText('')
            await expect(CartPage.placeOrderButton).toBeClickable()
        })

        // Opens Samsung galaxy s6 from the home page, checks its page shows the
        // right name and price, adds it to the cart, and checks the cart has
        // exactly that product and a total of 360.
        it('t3 - adds a product to the cart', async () => {
            await ProductPage.openFromHome(SAMSUNG.title)
            await expect(ProductPage.name).toHaveText(SAMSUNG.title)
            await expect(ProductPage.price).toHaveText(new RegExp(`^\\$${SAMSUNG.price} `))

            await addToCart(SAMSUNG.title)
            await CartPage.open()

            await CartPage.waitForItems([SAMSUNG])
            await expect(CartPage.total).toHaveText('360')
        })

        // Adds Samsung galaxy s6 (360) and Nokia lumia 1520 (820) and checks the
        // cart shows both and adds them up to 1180.
        it('t4 - adds two products and adds up the total', async () => {
            await addToCart(SAMSUNG.title)
            await addToCart(NOKIA.title)
            await CartPage.open()

            await CartPage.waitForItems([SAMSUNG, NOKIA])
            await expect(CartPage.total).toHaveText('1180')
        })

        // Adds both products, deletes Samsung galaxy s6, and checks only
        // Nokia lumia 1520 is left and the total drops to 820.
        it('t5 - removes a product from the cart', async () => {
            await addToCart(SAMSUNG.title)
            await addToCart(NOKIA.title)
            await CartPage.open()
            await CartPage.waitForItems([SAMSUNG, NOKIA])

            await CartPage.deleteLink(SAMSUNG.title).click()

            await CartPage.waitForItems([NOKIA])
            await expect(CartPage.total).toHaveText('820')
        })

        // Adds a product, opens the order form and clicks "Purchase" without
        // filling anything in. The site should ask for the name and card.
        it('t6 - won\'t place an order without name and card', async () => {
            await addToCart(SAMSUNG.title)
            await CartPage.open()
            await CartPage.waitForItems([SAMSUNG])
            await CartPage.openOrderForm()

            const alert = CartPage.nextAlert()
            await CartPage.purchaseButton.click()
            expect(await alert).toBe('Please fill out Name and Creditcard.')
        })

        // Adds a product, fills in the order form (with a standard test card
        // number) and buys it. Checks the confirmation shows the amount, card and
        // name, and that clicking OK goes back to the home page with an empty cart.
        it('t7 - places an order', async () => {
            const order = { name: 'Test User', card: '4111111111111111' }

            await addToCart(SAMSUNG.title)
            await CartPage.open()
            await CartPage.waitForItems([SAMSUNG])
            await CartPage.openOrderForm()

            await CartPage.orderNameInput.setValue(order.name)
            await CartPage.orderCountryInput.setValue('United Kingdom')
            await CartPage.orderCityInput.setValue('London')
            await CartPage.orderCardInput.setValue(order.card)
            await CartPage.orderMonthInput.setValue('12')
            await CartPage.orderYearInput.setValue('2030')
            await CartPage.purchaseButton.click()

            await CartPage.waitForConfirmation()
            await expect(CartPage.confirmationTitle).toHaveText('Thank you for your purchase!')
            await expect(CartPage.confirmationDetails).toHaveText(expect.stringContaining('Amount: 360 USD'))
            await expect(CartPage.confirmationDetails).toHaveText(expect.stringContaining(`Card Number: ${order.card}`))
            await expect(CartPage.confirmationDetails).toHaveText(expect.stringContaining(`Name: ${order.name}`))

            await CartPage.confirmationOkButton.click()
            await expect(browser).toHaveUrl(expect.stringContaining('index.html'))

            await HomePage.productCards[0].waitForDisplayed()
            await CartPage.open()
            expect(await CartPage.getItems()).toEqual([])
            await expect(CartPage.total).toHaveText('')
        })
    })
}
