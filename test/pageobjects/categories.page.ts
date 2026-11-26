import Page from './page'

class CategoriesPage extends Page {
    public get btnCategoriesNav() {
        return $('#categories')
    }

    public get btnMonitor() {
        return $('a[onclick="byCat(\'monitor\')"]')
    }

    public get linkAppleMonitor24() {
        return $('a[href="prod.html?idp_=10"]')
    }

    public get btnAddToCart() {
        return $('a[onclick="addToCart(10)"]')
    }

    public get btnLaptop() {
        return $('a[onclick="byCat(\'notebook\')"]')
    }

    public get linkDell2017Laptop() {
        return $('a[href="prod.html?idp_=13"]')
    }

    public get btnPhone() {
        return $('a[onclick="byCat(\'phone\')"]')
    }

    public get linkSamsungGalaxyS6() {
        return $('a[href="prod.html?idp_=1"]')
    }
}

export default new CategoriesPage()
