import { $ } from '@wdio/globals'
import Page from './page.ts'
import { browser } from '@wdio/globals'

class LoginPage extends Page {
    get loginButtonNavBar() { return $('#login2'); }
    get usernameInput() { return $('#loginusername'); }
    get passwordInput(){return $('#loginpassword');}
    get loginButton() { return $('#logInModal'). $('button=Log in'); }
    get closeButton() { return $('#logInModal'). $('button=Close'); }
    get loggedInUser() { return $('#nameofuser'); }
    get logoutButtonNavBar() { return $('#logout2'); }

      async openLoginModal() {
        await this.loginButtonNavBar.click();
        await this.usernameInput.waitForStable();
        await browser.pause(400);
    }

   async login(username: string, password: string){
    await this.openLoginModal();
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();


   }
}

export default new LoginPage();