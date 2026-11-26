import { appendFileSync, mkdirSync } from 'node:fs'
import { browser, expect } from '@wdio/globals'
import HomePage from '../pageobjects/home.page.ts'
import SignUpPage from '../pageobjects/signup.page.ts'
import { type Breakpoint, setPageSize } from './home.ts'

/** Password used for the accounts these tests create. */
const PASSWORD = 'Test1234!'

/**
 * A username nobody has taken yet. The three breakpoints run at the same time,
 * so a random part is added to the timestamp to keep them apart.
 */
function uniqueUsername() {
    return `test_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
}

/** File that keeps a list of every account these tests create (not committed). */
const CREATED_USERS_FILE = 'test-results/signup-users.txt'

/**
 * Adds a line to test-results/signup-users.txt for an account the tests just
 * signed up, so you can find it later. Example line:
 *   2026-11-26T14:03:12.000Z  desktop  test_1764158400123_k3f9  Test1234!
 */
function recordCreatedUser(breakpoint: Breakpoint, username: string) {
    mkdirSync('test-results', { recursive: true })
    appendFileSync(
        CREATED_USERS_FILE,
        `${new Date().toISOString()}  ${breakpoint.name}  ${username}  ${PASSWORD}\n`
    )
}

/**
 * Tests for signing up on Demoblaze (https://www.demoblaze.com/index.html).
 *
 * Note: t3 and t4 create real accounts on demoblaze.com each run (the site
 * has no way to delete them).
 *
 * The same tests run at every breakpoint: each spec in specs/desktop,
 * specs/tablet and specs/mobile calls this function with its own screen size.
 */
export function signUpScenario(breakpoint: Breakpoint) {
    describe(`Demoblaze sign up (${breakpoint.name}, ${breakpoint.width}px)`, () => {
        // Once, before all tests: resize the page to this breakpoint's width.
        before(async () => {
            await setPageSize(breakpoint)
        })

        // Before every test, start logged out on a freshly loaded home page.
        // (Demoblaze remembers a login in a cookie.)
        beforeEach(async () => {
            await browser.deleteCookies()
            await HomePage.open()
        })

        // Checks that the page really is shown at this breakpoint's width, so the
        // other tests are testing the right layout.
        it(`t1 - is shown at ${breakpoint.width}px wide`, async () => {
            expect(await browser.execute(() => window.innerWidth)).toBe(breakpoint.width)
        })

        // Clicks "Sign up" in the top menu and checks the modal: its title, the
        // username and password fields (password hidden as dots) and the buttons.
        it('t2 - opens the "Sign up" modal', async () => {
            await SignUpPage.openModal()

            await expect(SignUpPage.modal).toBeDisplayed()
            await expect(SignUpPage.modalTitle).toHaveText('Sign up')
            await expect(SignUpPage.usernameInput).toBeDisplayed()
            await expect(SignUpPage.passwordInput).toBeDisplayed()
            await expect(SignUpPage.passwordInput).toHaveAttribute('type', 'password')
            await expect(SignUpPage.submitButton).toBeClickable()
            await expect(SignUpPage.submitButton).toHaveText('Sign up')
            await expect(SignUpPage.closeButton).toBeClickable()
        })

        // Signs up with a brand-new username and checks the site says
        // "Sign up successful." and closes the modal.
        it('t3 - signs up a new user', async () => {
            const username = uniqueUsername()
            const alert = SignUpPage.nextAlert()
            await SignUpPage.signUp(username, PASSWORD)
            recordCreatedUser(breakpoint, username)

            expect(await alert).toBe('Sign up successful.')
            await SignUpPage.modal.waitForDisplayed({ reverse: true })
        })

        // Signs up a new username, then tries to sign up the same username again
        // and checks the site refuses with "This user already exist."
        // (that's the site's own wording).
        it('t4 - rejects a username that already exists', async () => {
            const username = uniqueUsername()
            const firstAlert = SignUpPage.nextAlert()
            await SignUpPage.signUp(username, PASSWORD)
            recordCreatedUser(breakpoint, username)
            expect(await firstAlert).toBe('Sign up successful.')

            await HomePage.open()
            const secondAlert = SignUpPage.nextAlert()
            await SignUpPage.signUp(username, PASSWORD)
            expect(await secondAlert).toBe('This user already exist.')
        })

        // Clicks "Sign up" in the modal without filling anything in and checks
        // the site asks for both fields.
        it('t5 - rejects empty username and password', async () => {
            await SignUpPage.openModal()
            const alert = SignUpPage.nextAlert()
            await SignUpPage.submitButton.click()

            expect(await alert).toBe('Please fill out Username and Password.')
        })
    })
}
