import Page from './page'

class CartPage extends Page {
    get productRow() {
        return $("//tr[td[2][normalize-space()='Samsung galaxy s6']]")
    }
    get productName() {
        return this.productRow.$('td:nth-child(2)')
    }
    get productPrice() {
        return this.productRow.$('td:nth-child(3)')
    }
    get deleteButton() {
        return this.productRow.$('td:nth-child(4) a')
    }
}

export default new CartPage()