import { expect } from '@wdio/globals'
import CartPage from '../pageobjects/cart.page'
import ProductsPage from '../pageobjects/products.page'

describe('Cart', () => {
    beforeEach(async () => {
        await browser.deleteAllCookies()
        await browser.url('/')
        await ProductsPage.samsungGalaxyS6.waitForDisplayed()
        await ProductsPage.samsungGalaxyS6.click()
        await ProductsPage.addToCartButton.waitForDisplayed()
        await ProductsPage.addProductToCart()
        try {
            await browser.acceptAlert()
        } catch (e) {
            // алертът вече може да е обработен автоматично от браузъра
        }
        await browser.url('/cart.html')
        await CartPage.productRow.waitForDisplayed()
    })

    it('should display Samsung galaxy s6 in cart', async () => {
        await expect(CartPage.productName).toHaveText('Samsung galaxy s6')
        await expect(CartPage.productPrice).toHaveText('360')
        await expect(CartPage.deleteButton).toBeDisplayed()
        await expect(CartPage.deleteButton).toBeClickable()
    })

    it('should delete product from cart', async () => {
        await CartPage.deleteButton.click()
        await expect(CartPage.productRow).not.toBeDisplayed()
    })
})