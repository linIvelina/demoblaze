import { expect } from '@wdio/globals'
import { createNewUser } from '../../helpers/newUser';
import { API_URLS } from '../../helpers/apiUrls';
import loginPage from '../../pageobjects/loginPage';

describe('Login page', () => {

    beforeEach(async () => {
        await browser.url('/');
    });

    it('should successfully login an exisitng user', async () => {
        const newUser = createNewUser();

        // precondition: register the user through the API
        const response = await fetch(API_URLS.signUp, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: newUser.username,
                // the UI base64-encodes the password on sign up and login, so the API must get it encoded too
                password: btoa(newUser.password)
            })
        });
        //throws an error if the response is different from 200 /OK/
        // Demoblaze returns 200 for both success and failure: the error is only in the body
        const body = await response.text();
        if (!response.ok || body.includes('errorMessage')) {
            throw new Error(`API sign-up failed: HTTP ${response.status}, body: ${body}`);
        };

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

        await expect($('#nameofuser')).toHaveText(`Welcome ${newUser.username}`);

    });
});
