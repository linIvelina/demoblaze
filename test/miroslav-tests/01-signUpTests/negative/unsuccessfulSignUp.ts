import { expect } from '@wdio/globals'
import signUpPage from '../../pageobjects/signUpPage';
import { createNewUser } from '../../helpers/newUser';
import { registerUserViaApi } from '../../helpers/apiRequests';

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
     */
    it('Should not register a user that already exists', async () => {
        // precondition: create a new user and register it through the API,
        // then reuse the same credentials in the UI
        const existingUser = await registerUserViaApi();

        await signUpPage.signUpButton.click();
        await signUpPage.waitForSignUpFormOpen();
        await signUpPage.setUserName(existingUser.username);   // same user as the API one
        await signUpPage.setPassword(existingUser.password);
        const alertText = signUpPage.waitForAlertText();
        await signUpPage.submitButton.click();
        expect(await alertText).toBe('This user already exist.');

    });
});
