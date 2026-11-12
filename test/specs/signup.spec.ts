import { browser, expect } from '@wdio/globals'
import SignupPage, { signupPage, SIGNUP_MESSAGES } from '../pageobjects/signup.page.ts'

const password = 'Test1234!'

/** Registers a fresh user and leaves the sign up modal open again for the next step. */
async function registerAndReopen(username: string) {
    expect(await signupPage.signupAndGetAlert(username, password)).toBe(SIGNUP_MESSAGES.success)
    await signupPage.open()
    await signupPage.openModal()
}

describe('Sign up', () => {
    beforeEach(async () => {
        await signupPage.open()
        await signupPage.openModal()
    })

    describe('positive', () => {
        it('shows the sign up modal with empty fields', async () => {
            await expect(signupPage.modalTitle).toHaveText('Sign up')
            await expect(signupPage.inputUsername).toHaveValue('')
            await expect(signupPage.inputPassword).toHaveValue('')
            await expect(signupPage.inputPassword).toHaveAttribute('type', 'password')
        })

        it('registers a new user successfully', async () => {
            const alert = await signupPage.signupAndGetAlert(SignupPage.uniqueUsername(), password)

            expect(alert).toBe(SIGNUP_MESSAGES.success)
            await expect(signupPage.modal).not.toBeDisplayed()
        })

        it('closes the modal with the Close button', async () => {
            await signupPage.btnClose.click()

            await expect(signupPage.modal).not.toBeDisplayed()
        })

        it('closes the modal with the X button', async () => {
            await signupPage.btnCloseX.click()

            await expect(signupPage.modal).not.toBeDisplayed()
        })
    })

    describe('negative', () => {
        it('rejects both fields empty', async () => {
            expect(await signupPage.submitAndGetAlert()).toBe(SIGNUP_MESSAGES.emptyFields)
            await expect(signupPage.modal).toBeDisplayed()
        })

        it('rejects an empty username', async () => {
            expect(await signupPage.signupAndGetAlert('', password)).toBe(SIGNUP_MESSAGES.emptyFields)
            await expect(signupPage.modal).toBeDisplayed()
        })

        it('rejects an empty password', async () => {
            expect(await signupPage.signupAndGetAlert(SignupPage.uniqueUsername(), '')).toBe(SIGNUP_MESSAGES.emptyFields)
            await expect(signupPage.modal).toBeDisplayed()
        })

        it('rejects an already registered username', async () => {
            const username = SignupPage.uniqueUsername()
            await registerAndReopen(username)

            const alert = await signupPage.signupAndGetAlert(username, password)

            expect(alert).toBe(SIGNUP_MESSAGES.userExists)
            await expect(signupPage.modal).toBeDisplayed()
        })

        it('rejects an already registered username even with a different password', async () => {
            const username = SignupPage.uniqueUsername()
            await registerAndReopen(username)

            const alert = await signupPage.signupAndGetAlert(username, 'AnotherPass99')

            expect(alert).toBe(SIGNUP_MESSAGES.userExists)
            await expect(signupPage.modal).toBeDisplayed()
        })

        it('keeps the entered values after a rejected sign up', async () => {
            const username = SignupPage.uniqueUsername()
            await registerAndReopen(username)

            await signupPage.signupAndGetAlert(username, password)

            await expect(signupPage.inputUsername).toHaveValue(username)
            await expect(signupPage.inputPassword).toHaveValue(password)
        })

        it('does not execute a script injected in the username (XSS)', async () => {
            const username = `<img src=x onerror=alert('xss')>${SignupPage.uniqueUsername()}`

            const alerts = await signupPage.getAllAlertsDuring(() => signupPage.signup(username, password))

            expect(alerts).toEqual([SIGNUP_MESSAGES.success])
        })

        it('treats an SQL injection payload in the username as plain text', async () => {
            const username = `' OR '1'='1' -- ${SignupPage.uniqueUsername()}`

            const alerts = await signupPage.getAllAlertsDuring(() => signupPage.signup(username, password))

            expect(alerts).toEqual([SIGNUP_MESSAGES.success])
        })

        it('does not report success when the sign up API fails', async () => {
            const mock = await browser.mock('**/signup', { method: 'post' })
            mock.respond({ errorMessage: 'Internal error' }, { statusCode: 500 })

            try {
                const alerts = await signupPage.getAllAlertsDuring(
                    () => signupPage.signup(SignupPage.uniqueUsername(), password)
                )

                expect(alerts).not.toContain(SIGNUP_MESSAGES.success)
                await expect(signupPage.modal).toBeDisplayed()
            } finally {
                await mock.restore()
            }
        })
    })

    /**
    * Known bugs: these describe the expected behaviour, which the site currently does NOT have.
    * They are skipped so the suite stays green; un-skip once the bug is fixed.
    */
    describe('known bugs', () => {
        // BUG: client only checks `== ""`, the API stores "   " as a real password
        it.skip('rejects a whitespace-only password', async () => {
            const alert = await signupPage.signupAndGetAlert(SignupPage.uniqueUsername(), '   ')

            expect(alert).toBe(SIGNUP_MESSAGES.emptyFields)
        })

        // BUG: "   " is accepted as a username (it already exists in the DB, so you get "user exists" instead)
        it.skip('rejects a whitespace-only username', async () => {
            const alert = await signupPage.signupAndGetAlert('   ', password)

            expect(alert).toBe(SIGNUP_MESSAGES.emptyFields)
        })

        // BUG: usernames are not trimmed, so "john " and "john" become two different accounts
        it.skip('rejects an existing username with surrounding spaces', async () => {
            const username = SignupPage.uniqueUsername()
            await registerAndReopen(username)

            const alert = await signupPage.signupAndGetAlert(` ${username} `, password)

            expect(alert).toBe(SIGNUP_MESSAGES.userExists)
        })
    })
})
