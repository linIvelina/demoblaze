import { browser, expect } from '@wdio/globals'
import HomePage from '../pageobjects/home.page.ts'
import LoginPage from '../pageobjects/login.page.ts'
import { type Breakpoint, setPageSize } from './home.ts'

/** Reads the test account from .env (USER_NAME, USER_PASSWORD). */
function credentials() {
    const username = process.env.USER_NAME
    const password = process.env.USER_PASSWORD
    if (!username || !password) {
        throw new Error('USER_NAME and USER_PASSWORD must be set in .env in the project root')
    }
    return { username, password }
}

/**
 * Tests for logging in to Demoblaze (https://www.demoblaze.com/index.html)
 * with the account from .env.
 *
 * The same tests run at every breakpoint: each spec in specs/desktop,
 * specs/tablet and specs/mobile calls this function with its own screen size.
 */
export function loginScenario(breakpoint: Breakpoint) {
    describe(`Demoblaze login (${breakpoint.name}, ${breakpoint.width}px)`, () => {
        let username: string
        let password: string

        // Once, before all tests: read the credentials and resize the page.
        before(async () => {
            ({ username, password } = credentials())
            await setPageSize(breakpoint)
        })

        // Before every test, start logged out on a freshly loaded home page.
        // (Demoblaze remembers the login in a cookie.)
        beforeEach(async () => {
            await browser.deleteCookies()
            await HomePage.open()
        })

        // Checks that the page really is shown at this breakpoint's width, so the
        // other tests are testing the right layout.
        it(`t1 - is shown at ${breakpoint.width}px wide`, async () => {
            expect(await browser.execute(() => window.innerWidth)).toBe(breakpoint.width)
        })

        // Clicks "Log in" in the top menu and checks the modal: its title, the
        // username and password fields (password hidden as dots) and the buttons.
        it('t2 - opens the "Log in" modal', async () => {
            await LoginPage.openModal()

            await expect(LoginPage.modal).toBeDisplayed()
            await expect(LoginPage.modalTitle).toHaveText('Log in')
            await expect(LoginPage.usernameInput).toBeDisplayed()
            await expect(LoginPage.passwordInput).toBeDisplayed()
            await expect(LoginPage.passwordInput).toHaveAttribute('type', 'password')
            await expect(LoginPage.submitButton).toBeClickable()
            await expect(LoginPage.submitButton).toHaveText('Log in')
            await expect(LoginPage.closeButton).toBeClickable()
        })

        // Logs in with the .env account and checks the top menu switches to the
        // logged-in state: "Welcome <username>" and "Log out" are shown,
        // "Log in" and "Sign up" are gone.
        it('t3 - logs in with the account from .env', async () => {
            await LoginPage.login(username, password)
            await LoginPage.waitForLoggedIn(username)
            await LoginPage.openMenuIfCollapsed()

            await expect(LoginPage.welcomeUser).toBeDisplayed()
            await expect(LoginPage.welcomeUser).toHaveText(`Welcome ${username}`)
            await expect(LoginPage.logoutLink).toBeDisplayed()
            await expect(HomePage.loginLink).not.toBeDisplayed()
            await expect(HomePage.signUpLink).not.toBeDisplayed()
        })

        // Logs in, then clicks "Log out" and checks the top menu goes back to the
        // logged-out state: "Log in" and "Sign up" are shown, and
        // "Welcome <username>" and "Log out" are gone.
        it('t4 - logs out', async () => {
            await LoginPage.login(username, password)
            await LoginPage.waitForLoggedIn(username)

            await LoginPage.logout()
            await LoginPage.waitForLoggedOut()
            await LoginPage.openMenuIfCollapsed()

            await expect(HomePage.loginLink).toBeDisplayed()
            await expect(HomePage.signUpLink).toBeDisplayed()
            await expect(LoginPage.welcomeUser).not.toBeDisplayed()
            await expect(LoginPage.logoutLink).not.toBeDisplayed()
        })
    })
}
