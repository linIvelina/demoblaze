import { $, browser } from '@wdio/globals'
import Page from './page.ts'

export const SIGNUP_MESSAGES = {
    success: 'Sign up successful.',
    userExists: 'This user already exist.',
    emptyFields: 'Please fill out Username and Password.'
} as const

class SignupPage extends Page {
    public get navSignupLink() { return $('#signin2') }
    public get modal() { return $('#signInModal') }
    public get modalTitle() { return $('#signInModalLabel') }
    public get inputUsername() { return $('#sign-username') }
    public get inputPassword() { return $('#sign-password') }
    public get btnSignup() { return $('#signInModal button.btn-primary') }
    public get btnClose() { return $('#signInModal .modal-footer button.btn-secondary') }
    public get btnCloseX() { return $('#signInModal .modal-header button.close') }

    public open() {
        return super.open('index.html')
    }

    public async openModal() {
        await this.navSignupLink.click()
        await this.modal.waitForDisplayed()
        // Bootstrap ignores hide() while the fade-in is running, so wait for it to finish
        await browser.waitUntil(
            () => browser.execute(() => {
                const jq = (window as unknown as { jQuery: (s: string) => { data(k: string): { _isTransitioning?: boolean } | undefined } }).jQuery
                return !jq('#signInModal').data('bs.modal')?._isTransitioning
            }),
            { timeout: 5000, timeoutMsg: 'Sign up modal did not finish opening' }
        )
    }

    public async fillForm(username: string, password: string) {
        await this.inputUsername.setValue(username)
        await this.inputPassword.setValue(password)
    }

    public async submit() {
        await this.btnSignup.click()
    }

    public async signup(username: string, password: string) {
        await this.fillForm(username, password)
        await this.submit()
    }

    /** Fills the form, submits and returns the resulting alert text. */
    public signupAndGetAlert(username: string, password: string) {
        return this.getAlertTextAfter(() => this.signup(username, password))
    }

    /** Submits the form as-is and returns the resulting alert text. */
    public submitAndGetAlert() {
        return this.getAlertTextAfter(() => this.submit())
    }

    /** Unique username so each run creates a fresh account. */
    public static uniqueUsername(prefix = 'qa_user') {
        return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`
    }
}

export const signupPage = new SignupPage()
export default SignupPage
