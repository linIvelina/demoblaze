import { expect } from '@wdio/globals'
import { registerUserViaApi } from '../../helpers/apiRequests';
import loginPage from '../../pageobjects/loginPage';

describe('Login page', () => {

    beforeEach(async () => {
        await browser.url('/');
    });

    it('should successfully login an exisitng user', async () => {
        // precondition: create a new user and register it through the API
        const newUser = await registerUserViaApi();

        await loginPage.headerLoginButton.waitForDisplayed();
        await loginPage.headerLoginButton.click();
        await loginPage.waitForLoginFormOpen();
        await loginPage.setLoginUserName(newUser.username);
        await expect(loginPage.loginUserNameField).toHaveValue(newUser.username);

        await loginPage.loginPasswordField.waitForClickable();
        await loginPage.setLoginPassword(newUser.password);
        await expect(loginPage.loginPasswordField).toHaveValue(newUser.password);
        await loginPage.logInButton.waitForDisplayed();
        await loginPage.logInButton.click();

        await expect(loginPage.welcomeUserText).toHaveText(`Welcome ${newUser.username}`);

        await loginPage.logoutButton.waitForClickable();
        await loginPage.logoutButton.click();

        await expect(browser).toHaveUrl('index.html', { containing: true });
        await expect(loginPage.headerLoginButton).toBeDisplayed();
        await expect(loginPage.logoutButton).not.toBeDisplayed();
        await expect(loginPage.welcomeUserText).not.toBeDisplayed();
    });
});
