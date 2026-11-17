import loginPage from '../pageobjects/login.page.ts'
import { browser, expect } from '@wdio/globals'


const username = process.env.TEST_USERNAME!;
const password = process.env.TEST_PASSWORD!;

describe('Login', () => {
     beforeEach(async () => {
        await browser.deleteCookies();
        await loginPage.open();
    });

    it('should login with valid credentials', async () => {
        await loginPage.login(username, password);
        await expect(loginPage.loggedInUser).toHaveText(`Welcome ${username}`);
    });

       it('should show error for wrong password', async () => {
        const alertText = await loginPage.triggerAndAcceptAlert(
            () => loginPage.login(username, 'definitely-wrong')
        );
        expect(alertText).toBe('Wrong password.');
    });
    
        it('should show error for non-existing user', async () => {
        const alertText = await loginPage.triggerAndAcceptAlert(
            () => loginPage.login('no_such_user_xx_99', password)
        );
        expect(alertText).toBe('User does not exist.');
    });

        it('should close the login modal with Close button', async () => {
        await loginPage.openLoginModal();
        await loginPage.closeButton.waitForStable();
        await loginPage.closeButton.click();
        await expect(loginPage.usernameInput).not.toBeDisplayed();
    });

       it('user remains logged in after page refresh', async () => {
        await loginPage.login(username, password);
        await expect(loginPage.loggedInUser).toHaveText(`Welcome ${username}`);
        await browser.refresh();
        await expect(loginPage.loggedInUser).toHaveText(`Welcome ${username}`);
    });

    it('should show error when both fields are empty', async () => {
        const alertText = await loginPage.triggerAndAcceptAlert(
            () => loginPage.login('', '')
        );
        expect(alertText).toBe('Please fill out Username and Password.');
    });

    it('should show error when password is empty', async () => {
        const alertText = await loginPage.triggerAndAcceptAlert(
            () => loginPage.login(username, '')
        );
        expect(alertText).toBe('Please fill out Username and Password.');
    });

    it('should log the user out', async () => {
        await loginPage.login(username, password);
        await expect(loginPage.loggedInUser).toBeDisplayed();
        await loginPage.logoutButtonNavBar.click();
        await expect(loginPage.loginButtonNavBar).toBeDisplayed();
        await expect(loginPage.loggedInUser).not.toBeDisplayed();
    });

});
