
import { $, $$ } from '@wdio/globals'

// Import the base Page class
import Page from './page'

// Define the CartPage class
export default class CartPage extends Page {

    // Get the cart table
    public get cartTable() {
        return $('#tbodyid')
    }

    // Get the cart products
    public get cartProducts() {
        return $('#tbodyid tr')
    }

    // Get the total price
    public get totalPrice() {
        return $('#totalp')
    }

    // Get the Place Order button
    public get placeOrderButton() {
        return $('button=Place Order')
    }

    // Get the Delete buttons
    public get deleteButtons() {
        return $$('#tbodyid a')
    }

}
