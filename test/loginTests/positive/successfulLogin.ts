import { expect } from '@wdio/globals'
import Page from '../../pageobjects/page'
import { createNewUser } from '../../helpers/newUser';
import { API_URLS } from '../../helpers/apiUrls';

describe('Login page', () => {
    let page: Page;
    const newUser = createNewUser();

    before(async () => {
        page = new Page();
    });

    beforeEach(async () => {
        await browser.url('/');
    });

    it('should successfully login an exisitng user', async () => {
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
    })
})