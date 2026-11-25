import { expect } from '@wdio/globals'
import ProductsPage from '../pageobjects/products.page'

describe('Products', () => {
    it('should display product cards', async () => {
        await browser.url('/')
        await expect(ProductsPage.productCards).toBeElementsArrayOfSize({ gte: 1 })
    })
    it('should display product names', async () => {
        await browser.url('/')
        await expect(ProductsPage.productNames).toBeElementsArrayOfSize({ gte: 1 })
    })
    it('should display Samsung Galaxy S6', async () => {
        await browser.url('/')
        await expect(ProductsPage.samsungGalaxyS6).toBeDisplayed()
    })
    it('should display product details', async () => {
        await browser.url('/')
        await ProductsPage.samsungGalaxyS6.click()
        await expect(ProductsPage.productTitle).toHaveText('Samsung galaxy s6')
        await expect(ProductsPage.productPrice).toHaveText('$360 *includes tax')
        await expect(ProductsPage.productDescription).toBeDisplayed()
        await expect(ProductsPage.addToCartButton).toBeDisplayed()

    })
    it('should display Add to cart button', async () => {
        await browser.url('/prod.html?idp_=1')

        await expect(ProductsPage.addToCartButton).toBeDisplayed()
        await expect(ProductsPage.addToCartButton).toBeClickable()
    })
    it('should add product to cart', async () => {
        await browser.url('/prod.html?idp_=1')

        browser.once('dialog', async (dialog) => {
            const alertMessage = await dialog.message()
            await dialog.accept()
            expect(alertMessage).toBe('Product added')

        })

        await ProductsPage.addProductToCart()
    })



})