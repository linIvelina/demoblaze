import Page from './page'

export default class SignUpPage extends Page {

    public get signUpLink() {
        return $('#signin2')
    }
    public get usernameInput() {
        return $('#sign-username')
    }
    public get passwordInput() {
        return $('#sign-password')
    }
    public get signUpButton() {
        return $('button[onclick="register()"]')
    }
    public get closeButton() {
        return $('button[data-dismiss="modal"]')
    }
}