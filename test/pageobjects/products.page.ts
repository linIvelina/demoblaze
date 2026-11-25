import Page from './page'

class ProductsPage extends Page {
    get productCards() {
        return $$('.card')
    }
    get productNames() {
        return $$('.card-title a')
    }
    get samsungGalaxyS6() {
        return $('a=Samsung galaxy s6')
    }
    get productTitle() {
        return $('h2.name')
    }
    get productPrice() {
        return $('h3.price-container')
    }
    get productDescription() {
        return $('#more-information')
    }
    get addToCartButton() {
        return $('a=Add to cart')
    }

    async addProductToCart() {
        await this.addToCartButton.click()
    }
}
export default new ProductsPage()