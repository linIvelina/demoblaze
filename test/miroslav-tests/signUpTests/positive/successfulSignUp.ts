import { expect } from '@wdio/globals'
import Page from '../../../pageobjects/page'
import signUpPage from '../../pageobjects/signUpPage';
import { createNewUser } from '../../helpers/newUser';

describe('Sign up page', () => {

    let page: Page;
    const newUser = createNewUser();

    before(async () => {
        page = new Page();
    });

    beforeEach(async () => {
        await browser.url('/');
    });

    it('should register a new user with valid credentials', async () => {
        
            await signUpPage.signUpButton.click();
            await signUpPage.usernameInput.waitForDisplayed();
            await signUpPage.setUserName(newUser.username);
            await expect(signUpPage.usernameInput).toHaveValue(newUser.username);

            await signUpPage.passwordInput.waitForDisplayed();
            await signUpPage.setPassword(newUser.password);
            await expect(signUpPage.passwordInput).toHaveValue(newUser.password);

            const alertText = signUpPage.waitForAlertText();
            await signUpPage.submitButton.click();
            expect(await alertText).toBe('Sign up successful.');
           
    });
});
