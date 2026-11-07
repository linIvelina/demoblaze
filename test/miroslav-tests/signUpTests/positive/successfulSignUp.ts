import { expect } from '@wdio/globals'
import signUpPage from '../../pageobjects/signUpPage';
import { createNewUser } from '../../helpers/newUser';

describe('Sign up page', () => {

    const newUser = createNewUser();

    beforeEach(async () => {
        await browser.url('/');
    });

    it('should register a new user with valid credentials', async () => {
        
            await signUpPage.signUpButton.click();
            await signUpPage.waitForSignUpFormOpen();
            await signUpPage.setUserName(newUser.username);
            await expect(signUpPage.userNameInput).toHaveValue(newUser.username);

            await signUpPage.passwordInput.waitForDisplayed();
            await signUpPage.setPassword(newUser.password);
            await expect(signUpPage.passwordInput).toHaveValue(newUser.password);

            const alertText = signUpPage.waitForAlertText();
            await signUpPage.submitButton.click();
            expect(await alertText).toBe('Sign up successful.');
           
    });
});
