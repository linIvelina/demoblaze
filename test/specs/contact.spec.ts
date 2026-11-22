import { expect } from '@wdio/globals'
import ContactPage from '../pageobjects/contact.page'


describe('Contact Page', () => {
    beforeEach(async () => {
        await browser.url('/')
        await ContactPage.stubAlert()
    })
    // Open and close the contac modal by clicking X button
    it('should open and close the contact modal', async () => {
        await ContactPage.btnContactNav.click()
        await browser.pause(1000)
        await expect(ContactPage.modal).toBeDisplayed()
        await ContactPage.waitForModalOpen()
        await ContactPage.btnClose.click()
        await expect(ContactPage.modal).not.toBeDisplayed()

    })


    // Open and close the contac modal by clicking close  button
    it('should open and close the contact modal by clicking footer Close button ', async () => {
        await ContactPage.btnContactNav.click()
        await browser.pause(1000)
        await expect(ContactPage.modal).toBeDisplayed()
        await ContactPage.waitForModalOpen()
        await ContactPage.btnCloseFooter.click()
        await expect(ContactPage.modal).not.toBeDisplayed()

    })


    //Corrct modal title name to be displayed
    it('should display the correct contact modal title', async () => {
        await ContactPage.btnContactNav.click()
        await browser.pause(1000)
        await expect(ContactPage.modalTitle).toBeDisplayed()
        await expect(ContactPage.modalTitle).toHaveText('New message')
    })
    //Correct messgae to be displayed when the user
    it('should display the correct message, when the user sent message', async () => {
        await ContactPage.btnContactNav.click()
        await browser.pause(1000)
        await expect(ContactPage.modal).toBeDisplayed()
        await ContactPage.inputEmail.setValue('x@example.com')
        await ContactPage.inputName.setValue('Hatche')
        await ContactPage.inputMessage.setValue('Hello I have issue with the login page')
        await ContactPage.btnSendMessage.click()
        const text = await ContactPage.getCapturedAlertText()
        await expect(text).toEqual('Thanks for the message!!')
    })
})

