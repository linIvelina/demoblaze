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
}

export default new HomePageHeader();
