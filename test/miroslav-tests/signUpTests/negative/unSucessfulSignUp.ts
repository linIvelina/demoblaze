import { expect } from '@wdio/globals'
import signUpPage from '../../pageobjects/signUpPage';
import { createNewUser } from '../../helpers/newUser';
import { API_URLS } from '../../helpers/apiUrls';

describe('Unsuccessful sign up', () => {

    const newUser = createNewUser();

    beforeEach(async () => {
        await browser.url('/');
    });

    it('Unssucessful sign up with empty fields', async () => {
        await signUpPage.signUpButton.click();
        await signUpPage.waitForSignUpFormOpen();
        const alertText = signUpPage.waitForAlertText();
        await signUpPage.submitButton.click();
        expect(await alertText).toBe('Please fill out Username and Password.');

    });

    it('Unsuccessful sign up without a uswrname', async () => {
        await signUpPage.signUpButton.click();
        await signUpPage.waitForSignUpFormOpen();
        await signUpPage.passwordInput.waitForClickable();
        await signUpPage.setPassword(newUser.password);
        await expect(signUpPage.passwordInput).toHaveValue(newUser.password);
        const alertText = signUpPage.waitForAlertText();
        await signUpPage.submitButton.click();
        expect(await alertText).toBe('Please fill out Username and Password.');

    });

    it('Unsuccessful sign up without a password', async () => {
        await signUpPage.signUpButton.click();
        await signUpPage.waitForSignUpFormOpen();
        await signUpPage.userNameInput.waitForClickable();
        await signUpPage.setUserName(newUser.username);
        await expect(signUpPage.userNameInput).toHaveValue(newUser.username);
        const alertText = signUpPage.waitForAlertText();
        await signUpPage.submitButton.click();
        expect(await alertText).toBe('Please fill out Username and Password.');

    });

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
        const response = await fetch(API_URLS.signUp, {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: existingUser.username,
                password: existingUser.password
            })

        });
        //throws an error if the response is different from 200 /OK/
        // Demoblaze returns 200 for both success and failure: the error is only in the body
        const body = await response.text();
        if (!response.ok || body.includes('errorMessage')) {

            throw new Error(`API sign-up failed: HTTP ${response.status}, body: ${body}`);

        };

        await signUpPage.signUpButton.click();
        await signUpPage.waitForSignUpFormOpen();
        await signUpPage.setUserName(existingUser.username);   // same user as the API one
        await signUpPage.setPassword(existingUser.password);
        const alertText = signUpPage.waitForAlertText();
        await signUpPage.submitButton.click();
        expect(await alertText).toBe('This user already exist.');

    });
});
