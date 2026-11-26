import { $ } from '@wdio/globals'

/** A product's own page (prod.html), opened by clicking a product on the home page. */
class ProductPage {
    public get name() { return $('h2.name') }
    public get price() { return $('h3.price-container') }
    public get addToCartButton() { return $('a.btn-success=Add to cart') }

    /** Clicks the product with this name on the home page and waits for its page to load. */
    public async openFromHome(productName: string) {
        await $('#tbodyid').$(`a=${productName}`).click()
        await this.name.waitForDisplayed()
        await this.addToCartButton.waitForClickable()
    }
}

export default new ProductPage()
