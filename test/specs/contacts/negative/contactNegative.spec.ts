// Import the ContactPage class
import ContactPage from '../../../pageobjects/contact.page'

// Group all negative Contact tests
describe('Contact - Negative', () => {

 // Create an instance of the ContactPage
 const contactPage = new ContactPage()

// Run before each test
beforeEach(async () => {

    // Open the Demoblaze website
    await contactPage.open('')

    // Click on the Contact link
    await contactPage.contactLink.click()
})

// Verify that the Contact form opens successfully
it('CF-04 – Contact Form Opens Successfully', async () => {

    // Check that the Email field is displayed
    await expect(contactPage.contactEmail).toBeDisplayed()

})

 // Verify that a message cannot be sent with an invalid email
it('CF-05 – Send Message With Invalid Email', async () => {

    // Enter an invalid email address
    await contactPage.contactEmail.setValue('nnn')

    // Enter the contact name
    await contactPage.contactName.setValue('Test User')

    // Enter the Message
    await contactPage.messageField.setValue('This is a test message.')

    // Click on the send message button
    await contactPage.sendMessageButton.click()

    // Get the alert text
    const alertText = await browser.getAlertText()

    // Verify that the success message is not displayed
    await expect(alertText).not.toBe('Thanks for the message!!')

    // Accept the alert
    await browser.acceptAlert()

})
