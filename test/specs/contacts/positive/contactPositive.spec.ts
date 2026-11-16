// Import the ContactPage class
import ContactPage from '../../../pageobjects/contact.page'

// Group all positive  Contact tests
describe('Contact - Positive', () => {

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
    it('CF-01 – Contact Form Opens Successfully', async () => {

        // Check that the Email field is displayed
        await expect(contactPage.contactEmail).toBeDisplayed()

    })

    // Verify that all Contact form fields are displayed
    it('CF-02: should display all Contact form fields', async () => {

        // Check that the Email field is displayed
        await expect(contactPage.contactEmail).toBeDisplayed()

        // Check that the Name field is displayed
        await expect(contactPage.contactName).toBeDisplayed()

        // Check that the Message field is displayed
        await expect(contactPage.messageField).toBeDisplayed()

        // Check that the close button is displayed
        await expect(contactPage.closeButton).toBeDisplayed()

        // Check that the send message button is displayed
        await expect(contactPage.sendMessageButton).toBeDisplayed()

    })

    // Verify that a message can be sent successfully
    it('CF-03: Send Message Successfully', async () => {

        // Enter the email address
        await contactPage.contactEmail.setValue('test@example.com')

        // Enter the contact name
        await contactPage.contactName.setValue('Test User')

        // Enter the Message 
        await contactPage.messageField.setValue('This is a test message.')

        // Click on the send message button
        await contactPage.sendMessageButton.click()

        // Get the alert text
        const alertText = await browser.getAlertText()

        // Verify the success message
        await expect(alertText).toBe('Thanks for the message!!')

        // Accept the alert
        await browser.acceptAlert()

    })
        // Verify that the Contact form closes successfully
    it('CF-04: Close Contact Form', async () => {

        // Click on the Close button
        await contactPage.closeButton.click()

        // Verify that the Contact form is closed
        await expect(contactPage.contactEmail).not.toBeDisplayed()

    })

})