import contactPage from '../pageobjects/contact.page.ts'
import { browser, expect } from '@wdio/globals'

describe('Contact modal', () => {
    beforeEach(async () => {
        await browser.deleteCookies();
        await contactPage.open();
    });

    it('should send a message with all fields filled', async () => {
        const alertText = await contactPage.triggerAndAcceptAlert(
            () => contactPage.sendMessage('donika@test.com', 'Donika', 'Hello from WDIO!')
        );
        expect(alertText).toBe('Thanks for the message!!');
    });

    // Known gap in Demoblaze: the contact form has no validation, so empty
    // fields still "succeed". In a real project this would be a bug report;
    // this test documents the current behavior.
    it('documents missing validation: empty fields still send the message', async () => {
        const alertText = await contactPage.triggerAndAcceptAlert(
            () => contactPage.sendMessage('', '', '')
        );
        expect(alertText).toBe('Thanks for the message!!');
    });

    it('should display title and all form fields when opened', async () => {
        await contactPage.openContactModal();
        await expect(contactPage.modalTitle).toHaveText('New message');
        await expect(contactPage.emailInput).toBeDisplayed();
        await expect(contactPage.nameInput).toBeDisplayed();
        await expect(contactPage.messageInput).toBeDisplayed();
        await expect(contactPage.sendMessageButton).toBeDisplayed();
    });

    it('should send a message with special characters and long text', async () => {
        const longMessage = 'Спец. символи: !@#$%^&*()_+ äöü 日本語 — '.repeat(10);
        const alertText = await contactPage.triggerAndAcceptAlert(
            () => contactPage.sendMessage('donika+test@test.com', 'Доника Ризова', longMessage)
        );
        expect(alertText).toBe('Thanks for the message!!');
    });

    it('should close the contact modal with Close button', async () => {
        await contactPage.openContactModal();
        await contactPage.closeButton.waitForStable();
        await contactPage.closeButton.click();
        await expect(contactPage.emailInput).not.toBeDisplayed();
    });

    it('should close the contact modal with the X button', async () => {
        await contactPage.openContactModal();
        await contactPage.closeXButton.waitForStable();
        await contactPage.closeXButton.click();
        await expect(contactPage.emailInput).not.toBeDisplayed();
    });

    it('should allow reopening the modal after closing it', async () => {
        await contactPage.openContactModal();
        await contactPage.closeButton.waitForStable();
        await contactPage.closeButton.click();
        await expect(contactPage.emailInput).not.toBeDisplayed();

        const alertText = await contactPage.triggerAndAcceptAlert(
            () => contactPage.sendMessage('donika@test.com', 'Donika', 'Second try after reopening')
        );
        expect(alertText).toBe('Thanks for the message!!');
    });
});
