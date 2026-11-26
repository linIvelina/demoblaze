import { $, browser } from '@wdio/globals'
import HomePage from './home.page.ts'

/**
 * The "Log in" modal and the logged-in parts of the top menu
 * ("Welcome <username>" and "Log out").
 */
class LoginPage {
    public get menuToggle() { return $('button.navbar-toggler') }
    public get menu() { return $('#navbarExample') }

    public get modal() { return $('#logInModal') }
    public get modalTitle() { return $('#logInModalLabel') }
    public get usernameInput() { return $('#loginusername') }
    public get passwordInput() { return $('#loginpassword') }
    public get submitButton() { return $('#logInModal button.btn-primary') }
    public get closeButton() { return $('#logInModal .modal-footer button.btn-secondary') }

    public get welcomeUser() { return $('#nameofuser') }
    public get logoutLink() { return $('#logout2') }

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

    /** Clicks "Log in" in the top menu and waits for the modal's fields to appear. */
    public async openModal() {
        await this.openMenuIfCollapsed()
        await HomePage.loginLink.waitForClickable()
        await HomePage.loginLink.click()
        await this.usernameInput.waitForDisplayed()
    }

    /** Opens the modal, fills in the credentials and submits. */
    public async login(username: string, password: string) {
        await this.openModal()
        await this.usernameInput.setValue(username)
        await this.passwordInput.setValue(password)
        await this.submitButton.click()
    }

    /**
     * Waits until the site shows "Welcome <username>". A successful login reloads
     * the page, so this reads the text directly (it's set even while the menu is folded).
     *
     * Waits up to 30s, not the usual 10s: Demoblaze's server can take longer than
     * 10s to answer a login, especially a second login shortly after the first.
     */
    public async waitForLoggedIn(username: string) {
        const expected = `Welcome ${username}`
        await browser.waitUntil(
            async () => (await this.welcomeUser.getProperty('textContent')) === expected,
            {
                timeout: 30000,
                timeoutMsg:
                    `Login did not succeed: "${expected}" never appeared. ` +
                    `Check that the account in .env exists on demoblaze.com and the password is right.`,
            }
        )
    }

    /** Opens the menu if it's folded and clicks "Log out". */
    public async logout() {
        await this.openMenuIfCollapsed()
        await this.logoutLink.waitForClickable()
        await this.logoutLink.click()
    }

    /**
     * Waits until the site has logged out. "Log out" reloads the page, and after
     * the reload "Welcome <username>" is empty. This reads the text directly, so it
     * works even while the menu is folded.
     */
    public async waitForLoggedOut() {
        await browser.waitUntil(
            async () => (await this.welcomeUser.getProperty('textContent')) === '',
            { timeoutMsg: 'Logout did not succeed: "Welcome <username>" is still shown' }
        )
    }
}

export default new LoginPage()
