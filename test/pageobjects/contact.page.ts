import { browser } from '@wdio/globals'
import Page from './page'

class ContactPage extends Page {
    public async waitForModalOpen() {
        await browser.waitUntil(
            async () => (await this.modal.getCSSProperty('opacity')).value === 1,
            { timeout: 3000, timeoutMsg: 'Modal did not finish opening animation' }
        )
        await browser.pause(200)
    }

    public get btnContactNav() {
        return $('a[data-target="#exampleModal"]')
    }

    public get modal() {
        return $('#exampleModal')
    }

    public get btnClose() {
        return $('#exampleModal .close')
    }

    public get btnCloseFooter() {
        return $('#exampleModal .modal-footer .btn-secondary')
    }

    public get btnSendMessage() {
        return $('button[onclick="send()"]')
    }

    public get modalTitle() {
        return $('#exampleModalLabel')
    }

    public get labelContactEmail() {
        return $('label*=Contact Email')
    }

    public get labelContactName() {
        return $('label*=Contact Name')
    }

    public get inputEmail() {
        return $('#recipient-email')
    }

    public get inputName() {
        return $('#recipient-name')
    }

    public get inputMessage() {
        return $('#message-text')
    }

    public async stubAlert() {
        await browser.execute(() => {
            sessionStorage.removeItem('__capturedAlert')
            window.alert = (msg?: any) => { sessionStorage.setItem('__capturedAlert', String(msg)) }
        })
    }

    public async getCapturedAlertText(timeout = 5000) {
        await browser.waitUntil(
            async () => (await browser.execute(() => sessionStorage.getItem('__capturedAlert'))) !== null,
            { timeout, timeoutMsg: 'Alert was not triggered in time' }
        )
        return browser.execute(() => sessionStorage.getItem('__capturedAlert'))
    }
}

export default new ContactPage()
