import { $, $$, browser } from '@wdio/globals'
import Page from './page.ts'

class HomePage extends Page {
    public get logo() { return $('#nava') }
    public get homeLink() { return $('a.nav-link[href="index.html"]') }
    public get contactLink() { return $('a.nav-link[data-target="#exampleModal"]') }
    public get aboutUsLink() { return $('a.nav-link[data-target="#videoModal"]') }
    public get cartLink() { return $('#cartur') }
    public get loginLink() { return $('#login2') }
    public get signUpLink() { return $('#signin2') }
    public get productCards() { return $$('#tbodyid .card') }
    public get productTitles() { return $$('#tbodyid .card-title a') }

    public get categoriesHeader() { return $('#cat') }
    public get categoryLinks() { return $$('.list-group a#itemc') }

    public get footerHeadings() { return $$('#fotcont h4') }
    public get footerAboutUsText() { return $('#fotcont .col-sm-4:first-child p') }
    public get footerContactLines() { return $$('#fotcont .col-sm-3 p') }
    public get footerLogo() { return $('#fotcont img') }
    public get copyright() { return $('footer p') }

    public category(name: 'Phones' | 'Laptops' | 'Monitors') {
        return $(`a.list-group-item=${name}`)
    }

    /**
     * Names of the products currently shown in the grid, in display order.
     * Read in one go inside the browser: reading element by element can fail
     * while the grid is being redrawn (e.g. when it shrinks from 9 to 2 items).
     */
    public async getProductTitles(): Promise<string[]> {
        return browser.execute(() =>
            Array.from(document.querySelectorAll('#tbodyid .card-title a'), a => (a.textContent ?? '').trim())
        )
    }

    /** Waits until the grid shows exactly these products (it updates asynchronously). */
    public async waitForProducts(expected: string[]) {
        let actual: string[] = []
        await browser.waitUntil(
            async () => {
                actual = await this.getProductTitles()
                return JSON.stringify(actual) === JSON.stringify(expected)
            },
            { timeoutMsg: '' }
        ).catch(() => {
            throw new Error(
                `Product grid never showed the expected products.\n` +
                `  Expected: ${expected.join(' | ')}\n  Actual:   ${actual.join(' | ')}`
            )
        })
    }

    public async open() {
        await super.open('index.html')
        await this.productCards[0].waitForDisplayed()
    }
}

export default new HomePage()
