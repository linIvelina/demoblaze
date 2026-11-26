import { $, browser } from '@wdio/globals'
import HomePage from './home.page.ts'

/**
 * The "Sign up" modal and the browser alert the site shows after submitting it.
 */
class SignUpPage {
    public get menuToggle() { return $('button.navbar-toggler') }
    public get menu() { return $('#navbarExample') }

    public get modal() { return $('#signInModal') }
    public get modalTitle() { return $('#signInModalLabel') }
    public get usernameInput() { return $('#sign-username') }
    public get passwordInput() { return $('#sign-password') }
    public get submitButton() { return $('#signInModal button.btn-primary') }
    public get closeButton() { return $('#signInModal .modal-footer button.btn-secondary') }

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

    /** Clicks "Sign up" in the top menu and waits for the modal's fields to appear. */
    public async openModal() {
        await this.openMenuIfCollapsed()
        await HomePage.signUpLink.waitForClickable()
        await HomePage.signUpLink.click()
        await this.usernameInput.waitForDisplayed()
    }

    /** Opens the modal, fills in the fields and submits. */
    public async signUp(username: string, password: string) {
        await this.openModal()
        await this.usernameInput.setValue(username)
        await this.passwordInput.setValue(password)
        await this.submitButton.click()
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
                reject(new Error('No alert appeared within 30s after clicking "Sign up"'))
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

export default new SignUpPage()
