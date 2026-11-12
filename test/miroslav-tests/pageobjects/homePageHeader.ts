import { $ } from '@wdio/globals'
import { ChainablePromiseElement } from 'webdriverio'
import Page from '../../pageobjects/page';

class HomePageHeader extends Page {

    get logo(): ChainablePromiseElement {
        return $('#nava');
    }

    get homeButton(): ChainablePromiseElement {
        return $('a*=Home');
    }

    get contactButton(): ChainablePromiseElement {
        return $('=Contact');
    }

    get aboutUsButton(): ChainablePromiseElement {
        return $('=About us');
    }

    get cartButton(): ChainablePromiseElement {
        return $('#cartur');
    }

    get contactEmailField(): ChainablePromiseElement {
        return $('#recipient-email')
    }

    get contactName(): ChainablePromiseElement {
        return $(`#recipient-name`)
    }

    get messageBox(): ChainablePromiseElement {
        return $(`#message-text`);
    }

    public async setContactFormEmail(email: string) {
        await this.contactEmailField.setValue(email);
    }

    public async setContactName(contactName: string) {
        await this.contactName.setValue(contactName);
    }

    public async setMessage(message: string) {
        await this.messageBox.setValue(message);
    }

}

export default new HomePageHeader();
