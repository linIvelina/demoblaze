import { $ } from '@wdio/globals'
import Page from './page.ts'
import { browser } from '@wdio/globals'

class ContactPage extends Page {
    get contactButtonNavBar() { return $('a=Contact'); }
    get emailInput() { return $('#recipient-email'); }
    get nameInput() { return $('#recipient-name'); }
    get messageInput() { return $('#message-text'); }
    get sendMessageButton() { return $('#exampleModal').$('button=Send message'); }
    get closeButton() { return $('#exampleModal').$('button=Close'); }
    get closeXButton() { return $('#exampleModal').$('button.close'); }
    get modalTitle() { return $('#exampleModalLabel'); }

    async openContactModal() {
        await this.contactButtonNavBar.click();
        await this.emailInput.waitForStable();
        await browser.pause(400);
    }

    async sendMessage(email: string, name: string, message: string) {
        await this.openContactModal();
        await this.emailInput.setValue(email);
        await this.nameInput.setValue(name);
        await this.messageInput.setValue(message);
        await this.sendMessageButton.click();
    }
}

export default new ContactPage();
