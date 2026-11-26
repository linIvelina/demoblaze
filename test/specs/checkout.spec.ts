import { expect } from '@wdio/globals'
import CheckoutPage from '../pageobjects/checkout.page'

describe('Checkout', () => {
    it('should complete a purchase successfully', async () => {
        await browser.url('/')
        await $('a=Samsung galaxy s6').click()

        await $('a=Add to cart').click()
        await browser.pause(1000)
        if (await browser.isAlertOpen()) {
            await browser.acceptAlert()
        }
        await $('a=Cart').click()

        await CheckoutPage.placeOrderButton.click()

        await CheckoutPage.nameInput.setValue(process.env.CHECKOUT_NAME!)
        await CheckoutPage.countryInput.setValue(process.env.CHECKOUT_COUNTRY!)
        await CheckoutPage.cityInput.setValue(process.env.CHECKOUT_CITY!)
        await CheckoutPage.cardInput.setValue(process.env.CHECKOUT_CARD!)
        await CheckoutPage.monthInput.setValue(process.env.CHECKOUT_MONTH!)
        await CheckoutPage.yearInput.setValue(process.env.CHECKOUT_YEAR!)

        await CheckoutPage.purchaseButton.click()


        const confirmation = await $('div.sweet-alert h2')
        await expect(confirmation).toHaveText('Thank you for your purchase!')





    })
})