import { expect } from '@wdio/globals'
import signUpPage from '../../pageobjects/signUpPage';
import { createNewUser } from '../../helpers/newUser';
import loginPage from '../../pageobjects/loginPage';
import { registerUserViaApi } from '../../helpers/apiRequests';


describe('Unsuccessful login', () => {

    const newUser = createNewUser();

    before(async () => {
        await registerUserViaApi(newUser);
    });

    beforeEach(async () => {
        await browser.url('/');
    });

    it('should not login with an empty login form fields', async () => {

        await loginPage.headerLoginButton.waitForClickable();
        await loginPage.headerLoginButton.click();
        await loginPage.waitForLoginFormOpen();
        await loginPage.logInButton.waitForClickable();
        const alertText = signUpPage.waitForAlertText();
        await loginPage.logInButton.click();
        expect(await alertText).toBe('Please fill out Username and Password.');

    });

    it('Should not login without an username', async () => {

        await loginPage.headerLoginButton.waitForClickable();
        await loginPage.headerLoginButton.click();
        await loginPage.waitForLoginFormOpen();
        await loginPage.loginPasswordField.waitForClickable();
        await loginPage.setLoginPassword(newUser.password);
        await expect(loginPage.loginPasswordField).toHaveValue(newUser.password);
        await loginPage.logInButton.waitForClickable();
        const alertText = signUpPage.waitForAlertText();
        await loginPage.logInButton.click();
        expect(await alertText).toBe('Please fill out Username and Password.');

    });

    it('Should not login without a password', async () => {

        await loginPage.headerLoginButton.waitForClickable();
        await loginPage.headerLoginButton.click();
        await loginPage.waitForLoginFormOpen();
        await loginPage.loginUserNameField.waitForClickable();
        await loginPage.setLoginUserName(newUser.username);
        await expect(loginPage.loginUserNameField).toHaveValue(newUser.username);
        await loginPage.logInButton.waitForClickable();
        const alertText = signUpPage.waitForAlertText();
        await loginPage.logInButton.click();
        expect(await alertText).toBe('Please fill out Username and Password.');

    });

    it('Should not login with non-existing user', async () => {

        const existingUser = createNewUser();
        await loginPage.headerLoginButton.waitForClickable();
        await loginPage.headerLoginButton.click();
        await loginPage.waitForLoginFormOpen();
        await loginPage.loginUserNameField.waitForClickable();
        await loginPage.setLoginUserName(existingUser.username);
        await expect(loginPage.loginUserNameField).toHaveValue(existingUser.username);
        await loginPage.loginPasswordField.waitForClickable();
        await loginPage.setLoginPassword(existingUser.password);
        await expect(loginPage.loginPasswordField).toHaveValue(existingUser.password);
        await loginPage.logInButton.waitForClickable();
        const alertText = signUpPage.waitForAlertText();
        await loginPage.logInButton.click();
        expect(await alertText).toBe('User does not exist.');

    });
});
