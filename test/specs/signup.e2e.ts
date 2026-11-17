import signUpPage from '../pageobjects/signUp.page.ts'
import loginPage from '../pageobjects/login.page.ts'
import { browser, expect } from '@wdio/globals'

const existingUsername = process.env.TEST_USERNAME!;
const password = process.env.TEST_PASSWORD!;

const uniqueUsername = () => `donika_${Date.now()}`;

describe('Sign up', () => {
    beforeEach(async () => {
        await browser.deleteCookies();
        await signUpPage.open();
    });

    it('should sign up with a new unique username', async () => {
        const alertText = await signUpPage.triggerAndAcceptAlert(
            () => signUpPage.signUp(uniqueUsername(), password)
        );
        expect(alertText).toBe('Sign up successful.');
    });

    it('should show error for an already existing user', async () => {
        const alertText = await signUpPage.triggerAndAcceptAlert(
            () => signUpPage.signUp(existingUsername, password)
        );
        expect(alertText).toBe('This user already exist.');
    });

    it('should show error when both fields are empty', async () => {
        const alertText = await signUpPage.triggerAndAcceptAlert(
            () => signUpPage.signUp('', '')
        );
        expect(alertText).toBe('Please fill out Username and Password.');
    });

    it('should show error when password is empty', async () => {
        const alertText = await signUpPage.triggerAndAcceptAlert(
            () => signUpPage.signUp(uniqueUsername(), '')
        );
        expect(alertText).toBe('Please fill out Username and Password.');
    });

    it('should close the sign up modal with Close button', async () => {
        await signUpPage.openSignUpModal();
        await signUpPage.closeButton.waitForStable();
        await signUpPage.closeButton.click();
        await expect(signUpPage.usernameInput).not.toBeDisplayed();
    });

    it('newly signed up user can log in', async () => {
        const username = uniqueUsername();
        const alertText = await signUpPage.triggerAndAcceptAlert(
            () => signUpPage.signUp(username, password)
        );
        expect(alertText).toBe('Sign up successful.');

        await loginPage.login(username, password);
        await expect(loginPage.loggedInUser).toHaveText(`Welcome ${username}`);
    });
});
