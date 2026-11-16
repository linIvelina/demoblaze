
// Import the base Page class
import Page from './page'

// Define the LogInPage class
export default class LogInPage extends Page {

    // Get the Log In link
    public get logInLink() {
        return $('#login2')
    }
    // Get the Log Out link
    public get logOutLink() {
        return $('#logout2')
    }

    // Get the username input field
    public get usernameInput() {
        return $('#loginusername')
    }

    // Get the password input field
    public get passwordInput() {
        return $('#loginpassword')
    }

    // Get the Log In button
    public get logInButton() {
        return $('button[onclick="logIn()"]')
    }

    // Get the Close button
    public get closeButton() {
        return $('button[data-dismiss="modal"]')
    }

    // Get the welcome username text
    public get welcomeUser() {
        return $('#nameofuser')
    }
}
