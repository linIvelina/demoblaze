// Import the base Page class
import Page from './page'

class ContactPage extends Page {

    // Find the Contact link
    get contactLink() {
        return $('a=Contact')
    }

    // Find the Email field
    get contactEmail() {
        return $('#recipient-email')
    }

    // Find the Name field
    get contactName() {
        return $('#recipient-name')
    }

    // Find the Message field
    get messageField() {
        return $('#message-text')
    }

    // Find the Close button in the footer of the Contact modal
    get closeButton() {
        return $('#exampleModal .modal-footer button[data-dismiss="modal"]')
    }

    // Find the Send Message button
    get sendMessageButton() {
        return $('button[onclick="send()"]')
    }

}

export default ContactPage