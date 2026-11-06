import { expect } from '@wdio/globals'
import Page from '../../../pageobjects/page'
import signUpPage from '../../pageobjects/signUpPage';
import { createNewUser } from '../../helpers/newUser';
import { API_URLS } from '../../helpers/apiUrls';

describe('Unsuccessful sign up', () => {
    let page: Page;
    const newUser = createNewUser();

    before(async () => {
        page = new Page();
    });

    beforeEach(async () => {
        await browser.url('/');
    });

    it('Unssucessful sign up with empty fields', async () => {
        await signUpPage.signUpButton.click();
        const alertText = signUpPage.waitForAlertText();
        await signUpPage.submitButton.click();
        expect(await alertText).toBe('Please fill out Username and Password.');
    });

    it('Unsuccessful sign up without a uswrname', async () => {
        await signUpPage.signUpButton.click();
        await signUpPage.passwordInput.waitForDisplayed();
        await signUpPage.setPassword(newUser.password);
        await expect(signUpPage.passwordInput).toHaveValue(newUser.password);
        const alertText = signUpPage.waitForAlertText();
        await signUpPage.submitButton.click();
        expect(await alertText).toBe('Please fill out Username and Password.');
    })

    it('Unsuccessful sign up without a password', async () => {
        await signUpPage.signUpButton.click();
        await signUpPage.usernameInput.waitForDisplayed();
        await signUpPage.setUserName(newUser.username);
        await expect(signUpPage.usernameInput).toHaveValue(newUser.username);
        const alertText = signUpPage.waitForAlertText();
        await signUpPage.submitButton.click();
        expect(await alertText).toBe('Please fill out Username and Password.');
    })

    /**
     * Precondition: the user must already exist.
     * Instead of relying on another test (spec files run in parallel, so their order
     * isn't guaranteed), the test registers its own user directly through the
     * Demoblaze sign-up API, then tries to register the same username through the UI.
     *
     * The password is sent as plain text. That's enough here, because the duplicate
     * check only looks at the username. Note that the UI base64-encodes the password,
     * so this user can't log in through the UI with this password.
     */
    it('Should not register a user that already exists', async () => {
        // create the credentials only once and reuse them for both the API and the UI,
        // every call of createNewUser() returns a different user
        const existingUser = createNewUser();

        // precondition: register the user through the API
        await fetch(API_URLS.signUp, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: existingUser.username,
                password: existingUser.password
            })
        });

        await signUpPage.signUpButton.click();
        await signUpPage.usernameInput.waitForDisplayed();
        await signUpPage.setUserName(existingUser.username);   // same user as the API one
        await signUpPage.setPassword(existingUser.password);

        const alertText = signUpPage.waitForAlertText();
        await signUpPage.submitButton.click();
        expect(await alertText).toBe('This user already exist.');
    });
});
