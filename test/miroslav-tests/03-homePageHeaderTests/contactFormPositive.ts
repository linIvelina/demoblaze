import { expect } from '@wdio/globals'
import { createNewUser } from '../helpers/newUser';
import homePageHeader from '../pageobjects/homePageHeader';

describe('Header contact form', () => {

    beforeEach(async () => {
        await browser.url('/');
    });

    it('Should send a text message successfully', async () => {

        const newUser = createNewUser();
        const message = `Test message from ${newUser.userContactName}`;

        await homePageHeader.contactButton.waitForClickable();
        await homePageHeader.contactButton.click();
        await homePageHeader.waitForContactFormOpen();

        await homePageHeader.contactEmailField.waitForClickable();
        await homePageHeader.setContactFormEmail(newUser.userMail);
        await expect(homePageHeader.contactEmailField).toHaveValue(newUser.userMail);

        await homePageHeader.contactName.waitForClickable();
        await homePageHeader.setContactName(newUser.userContactName);
        await expect(homePageHeader.contactName).toHaveValue(newUser.userContactName);

        await homePageHeader.messageBox.waitForClickable();
        await homePageHeader.setMessage(message);
        await expect(homePageHeader.messageBox).toHaveValue(message);

        await homePageHeader.sendMessageButton.waitForClickable();
        const alertText = homePageHeader.waitForAlertText();
        await homePageHeader.sendMessageButton.click();
        expect(await alertText).toBe('Thanks for the message!!');

        await expect(homePageHeader.messageBox).not.toBeDisplayed();
    });
});
