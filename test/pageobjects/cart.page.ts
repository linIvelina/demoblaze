import { $, browser } from '@wdio/globals'
import HomePage from './home.page.ts'

/** One product row in the cart, as shown on the page. */
export interface CartItem {
    title: string
    price: string
}

/**
 * The Cart page (cart.html), the "Place order" form and the
 * "Thank you for your purchase!" confirmation.
 */
class CartPage {
    public get menuToggle() { return $('button.navbar-toggler') }
    public get menu() { return $('#navbarExample') }

    public get total() { return $('#totalp') }
    public get placeOrderButton() { return $('button[data-target="#orderModal"]') }

    public get orderModal() { return $('#orderModal') }
    public get orderNameInput() { return $('#name') }
    public get orderCountryInput() { return $('#country') }
    public get orderCityInput() { return $('#city') }
    public get orderCardInput() { return $('#card') }
    public get orderMonthInput() { return $('#month') }
    public get orderYearInput() { return $('#year') }
    public get purchaseButton() { return $('#orderModal button.btn-primary') }

    public get confirmation() { return $('.sweet-alert') }
    public get confirmationTitle() { return $('.sweet-alert h2') }
    public get confirmationDetails() { return $('.sweet-alert p.lead') }
    public get confirmationOkButton() { return $('.sweet-alert button.confirm') }

    /** The "Delete" link in the row for this product. */
    public deleteLink(title: string) {
        return $(`//tbody[@id="tbodyid"]/tr[td[2][normalize-space()="${title}"]]//a[text()="Delete"]`)
    }

    /**
     * On narrow screens the top menu is folded behind the ☰ button.
     * Opens it (like a user would) and waits for it to finish sliding open.
     * Does nothing when the menu is already shown in full.
     */
    public async openMenuIfCollapsed() {
        if (!(await this.menuToggle.isDisplayed())) return
        if ((await this.menu.getAttribute('class')).includes('show')) return

        await this.menuToggle.click()
        await browser.waitUntil(
            async () => {
                const cls = await this.menu.getAttribute('class')
                return cls.includes('show') && !cls.includes('collapsing')
            },
            { timeoutMsg: 'Top menu did not open after clicking the ☰ button' }
        )
    }

    /**
     * Waits until the site has finished talking to its server (no requests
     * still running). The cart's rows and total are loaded from the server
     * after the page appears, so reading them earlier can give a wrong answer.
     */
    public async waitForServer() {
        await browser.waitUntil(
            async () => browser.execute(() =>
                document.readyState === 'complete' &&
                // jQuery is how Demoblaze talks to its server
                (window as unknown as { jQuery?: { active: number } }).jQuery?.active === 0
            ),
            { timeout: 30000, timeoutMsg: 'The cart never finished loading from the server' }
        )
    }

    /** Clicks "Cart" in the top menu and waits for the cart to finish loading. */
    public async open() {
        await this.openMenuIfCollapsed()
        await HomePage.cartLink.waitForClickable()
        await HomePage.cartLink.click()
        await this.placeOrderButton.waitForDisplayed()
        await this.waitForServer()
    }

    /**
     * Products currently in the cart, in display order.
     * Read in one go inside the browser, as the table can be redrawn at any time.
     */
    public async getItems(): Promise<CartItem[]> {
        return browser.execute(() =>
            Array.from(document.querySelectorAll('#tbodyid tr'), row => ({
                title: (row.children[1]?.textContent ?? '').trim(),
                price: (row.children[2]?.textContent ?? '').trim(),
            }))
        )
    }

    /** Waits until the cart shows exactly these products (in any order) and the server is done. */
    public async waitForItems(expected: CartItem[]) {
        const sorted = (items: CartItem[]) => JSON.stringify([...items].sort((a, b) => a.title.localeCompare(b.title)))
        let actual: CartItem[] = []
        await browser.waitUntil(
            async () => {
                actual = await this.getItems()
                return sorted(actual) === sorted(expected)
            },
            { timeout: 30000, timeoutMsg: '' }
        ).catch(() => {
            throw new Error(
                `Cart never showed the expected products.\n` +
                `  Expected: ${JSON.stringify(expected)}\n  Actual:   ${JSON.stringify(actual)}`
            )
        })
        await this.waitForServer()
    }

    /** Clicks "Place Order" and waits for the order form to appear. */
    public async openOrderForm() {
        await this.placeOrderButton.click()
        await this.orderNameInput.waitForDisplayed()
    }

    /**
     * Waits until the "Thank you for your purchase!" pop-up has appeared AND
     * finished its opening animation (the site then adds the "visible" class).
     *
     * Clicking OK while the pop-up is still growing in closes it without going
     * back to the home page, so tests must wait for the animation to finish.
     */
    public async waitForConfirmation() {
        await browser.waitUntil(
            async () => browser.execute(() => {
                const cls = document.querySelector('.sweet-alert')?.className ?? ''
                return cls.includes('showSweetAlert') && cls.includes('visible')
            }),
            { timeoutMsg: 'The "Thank you for your purchase!" pop-up did not appear after clicking "Purchase"' }
        )
    }

    /**
     * Starts listening for the site's next browser alert. Call it BEFORE the
     * click that triggers the alert, then await the result: it resolves with the
     * alert's text once the alert has been closed with OK.
     *
     * WebdriverIO closes alerts automatically when nothing is listening for them,
     * so checking for the alert after the click is too late.
     *
     * Waits up to 30s, not the usual 10s: Demoblaze's server can take longer
     * than 10s to answer.
     */
    public nextAlert(): Promise<string> {
        const alert = new Promise<string>((resolve, reject) => {
            const timer = setTimeout(() => {
                browser.off('dialog', onDialog)
                reject(new Error('No alert appeared within 30s'))
            }, 30000)

            async function onDialog(dialog: { message(): string, accept(): Promise<void> }) {
                clearTimeout(timer)
                const text = dialog.message()
                await dialog.accept()
                resolve(text)
            }
            browser.once('dialog', onDialog)
        })
        // If the test fails before awaiting the alert, don't crash the run
        // with an unhandled rejection. Awaiting it still throws as normal.
        alert.catch(() => {})
        return alert
    }
}

export default new CartPage()
