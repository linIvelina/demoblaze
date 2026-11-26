import Page from './page'

class CheckoutPage extends Page {
    get placeOrderButton() {
        return $('button=Place Order')
    }

    get nameInput() {
        return $('#name')
    }

    get countryInput() {
        return $('#country')
    }

    get cityInput() {
        return $('#city')
    }

    get cardInput() {
        return $('#card')
    }

    get monthInput() {
        return $('#month')
    }

    get yearInput() {
        return $('#year')
    }

    get purchaseButton() {
        return $('button[onclick="purchaseOrder()"]')
    }
}
export default new CheckoutPage()