
import { $ } from '@wdio/globals'

// Import the base Page class
import Page from './page'

// Define the HomePage class
export default class HomePage extends Page {

    // Get the logo
    public get logo() {
        return $('#nava')
    }

    // Get the navigation menu
    public get navigationMenu() {
        return $('#navbarExample')
    }

    // Get the Home link
    public get homeLink() {
        return $('a=Home')
    }

    // Get the Contact link
    public get contactLink() {
        return $('a=Contact')
    }

    // Get the About Us link
    public get aboutUsLink() {
        return $('a=About us')
    }

    // Get the Cart link
    public get cartLink() {
        return $('a=Cart')
    }

    // Get the Log In link
    public get logInLink() {
        return $('#login2')
    }

    // Get the Sign Up link
    public get signUpLink() {
        return $('#signin2')
    }

    // Get the Welcome username text
    public get welcomeUser() {
        return $('#nameofuser')
    }

    // Get the Log Out link
    public get logOutLink() {
        return $('#logout2')
    }

    // Get the product categories
    public get categories() {
        return $('#cat')
    }

    // Get the product list
    public get productList() {
        return $('#tbodyid')
    }

    // Get the Next button on the carousel
    public get carouselNextButton() {
        return $('a.carousel-control-next')
    }

    // Get the Previous button on the carousel
    public get carouselPreviousButton() {
        return $('a.carousel-control-prev')
    }

    // Get the Next button for products
    public get nextButton() {
        return $('#next2')
    }

    // Get the Previous button for products
    public get previousButton() {
        return $('#prev2')
    }
}
