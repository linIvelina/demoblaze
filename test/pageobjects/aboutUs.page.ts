
import { $ } from '@wdio/globals'

// Import the base Page class
import Page from './page'

// Define the AboutUsPage class
export default class AboutUsPage extends Page {

    // Get the About Us modal
    public get aboutUsModal() {
        return $('#videoModal')
    }

    // Get the modal title
    public get modalTitle() {
        return $('#videoModalLabel')
    }

    // Get the video element
    public get video() {
        return $('#videoModal video')
    }

    // Get the Close button
    public get closeButton() {
        return $('#videoModal button.close')
    }

    // Get the Close footer button
    public get closeModalButton() {
        return $('#videoModal button.btn-secondary')
    }

}
