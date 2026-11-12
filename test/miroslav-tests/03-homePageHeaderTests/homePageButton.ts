import { registerUserViaApi } from '../helpers/apiRequests';
import loginPage from '../pageobjects/loginPage';
import homePageHeader from '../pageobjects/homePageHeader';


describe('Home page header', () => {

    beforeEach(async () => {
        await browser.url('/');
    });

    it.only('Header home button has to redirect to the home page', async () => {

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

        await homePageHeader.homeButton.waitForClickable();
        await homePageHeader.homeButton.click();
        await expect(browser).toHaveUrl('index.html', { containing: true });

        await loginPage.logoutButton.waitForClickable();
        await loginPage.logoutButton.click();

        await expect(browser).toHaveUrl('index.html', { containing: true });
        await expect(loginPage.headerLoginButton).toBeDisplayed();
        await expect(loginPage.welcomeUserText).not.toBeDisplayed();

    });

});
