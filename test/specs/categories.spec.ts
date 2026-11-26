import { expect } from '@wdio/globals'
import CategoriesPage from '../pageobjects/categories.page'

describe('Categories Page', () => {
    beforeEach(async () => {
        await browser.url('/')
    })

    it('should show monitor products and allow adding one to cart', async () => {
        await CategoriesPage.btnCategoriesNav.click()
        await CategoriesPage.btnMonitor.click()
        await expect(CategoriesPage.linkAppleMonitor24).toBeDisplayed()
        await CategoriesPage.linkAppleMonitor24.click()
        await expect(CategoriesPage.btnAddToCart).toBeDisplayed()
        await CategoriesPage.btnAddToCart.click()
    })

    it('should show laptop products and allow adding one to cart', async () => {
        await CategoriesPage.btnCategoriesNav.click()
        await CategoriesPage.btnLaptop.click()
        await expect(CategoriesPage.linkDell2017Laptop).toBeDisplayed()
        await CategoriesPage.linkDell2017Laptop.click()
        await expect(CategoriesPage.btnAddToCart).toBeDisplayed()
        await CategoriesPage.btnAddToCart.click()
    })

    it('should show phone products and allow adding one to cart', async () => {
        await CategoriesPage.btnCategoriesNav.click()
        await CategoriesPage.btnPhone.click()
        await expect(CategoriesPage.linkSamsungGalaxyS6).toBeDisplayed()
        await CategoriesPage.linkSamsungGalaxyS6.click()
        await expect(CategoriesPage.btnAddToCart).toBeDisplayed()
        await CategoriesPage.btnAddToCart.click()
    })
})