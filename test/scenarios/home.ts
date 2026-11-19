import { browser, expect } from '@wdio/globals'
import HomePage from '../pageobjects/home.page.ts'

/** A screen size the scenario runs at. */
export interface Breakpoint {
    name: string
    width: number
    height: number
}

export const desktop: Breakpoint = { name: 'desktop', width: 1024, height: 768 }
export const tablet: Breakpoint = { name: 'tablet', width: 900, height: 1200 }
export const mobile: Breakpoint = { name: 'mobile', width: 390, height: 844 }

/**
 * Makes the page area (not the whole browser window) exactly the breakpoint's size.
 *
 * Chrome and Firefox support setting the page area directly (WebDriver BiDi).
 * Safari doesn't, so there the browser window is resized instead, with the
 * window's borders and toolbars added on so the page area still ends up at the
 * right size. The "is shown at ...px wide" test checks the result either way.
 */
async function setPageSize({ width, height }: Breakpoint) {
    if (browser.isBidi) {
        await browser.setViewport({ width, height })
        return
    }
    await browser.setWindowSize(width, height)
    const [extraW, extraH] = await browser.execute(() => [
        window.outerWidth - window.innerWidth,
        window.outerHeight - window.innerHeight,
    ])
    await browser.setWindowSize(width + extraW, height + extraH)
}

/**
 * Tests for the Demoblaze home page (https://www.demoblaze.com/index.html).
 * They check that the store loads and its main features work.
 *
 * The same tests run at every breakpoint: each spec in specs/desktop,
 * specs/tablet and specs/mobile calls this function with its own screen size.
 */
export function homeScenario(breakpoint: Breakpoint) {
    describe(`Demoblaze home page (${breakpoint.name}, ${breakpoint.width}px)`, () => {
        // Once, before all tests: resize the page to this breakpoint's width.
        before(async () => {
            await setPageSize(breakpoint)
        })

        // Before every test, open the home page and wait for the products to load,
        // so each test starts from the same fresh state.
        beforeEach(async () => {
            await HomePage.open()
        })

        // Checks that the page really is shown at this breakpoint's width, so the
        // other tests are testing the right layout.
        it(`t1 - is shown at ${breakpoint.width}px wide`, async () => {
            expect(await browser.execute(() => window.innerWidth)).toBe(breakpoint.width)
        })

        // Checks that the page has loaded: the browser tab title is "STORE" and the
        // logo plus the Home, Contact, About us, Cart, Log in and Sign up links in
        // the top menu can actually be clicked by a user.
        //
        // "Clickable" means visible, on screen and not covered by anything else.
        // Just checking "displayed" isn't enough: at some widths the links are
        // hidden behind the carousel but still count as displayed.
        // The test lists every link that can't be clicked, not just the first one.
        it('t2 - loads the store', async () => {
            await expect(browser).toHaveTitle('STORE')

            const topMenu = {
                'Logo': HomePage.logo,
                'Home': HomePage.homeLink,
                'Contact': HomePage.contactLink,
                'About us': HomePage.aboutUsLink,
                'Cart': HomePage.cartLink,
                'Log in': HomePage.loginLink,
                'Sign up': HomePage.signUpLink,
            }
            const notClickable: string[] = []
            for (const [name, element] of Object.entries(topMenu)) {
                if (!(await element.isClickable())) notClickable.push(name)
            }
            expect(notClickable).toEqual([])
        })

        // Checks the CATEGORIES menu on the left: the "CATEGORIES" heading is shown,
        // followed by exactly three links (Phones, Laptops, Monitors) in that order.
        // Each link must be clickable and wired to filter by its category
        // (the site calls byCat('phone'), byCat('notebook') or byCat('monitor')).
        it('t3 - shows the categories menu', async () => {
            const expected = [
                { name: 'Phones', filter: "byCat('phone')" },
                { name: 'Laptops', filter: "byCat('notebook')" },
                { name: 'Monitors', filter: "byCat('monitor')" },
            ]

            await expect(HomePage.categoriesHeader).toBeDisplayed()
            await expect(HomePage.categoriesHeader).toHaveText('CATEGORIES')
            await expect(HomePage.categoryLinks).toBeElementsArrayOfSize(expected.length)

            for (const [i, { name, filter }] of expected.entries()) {
                const link = HomePage.categoryLinks[i]
                await expect(link).toHaveText(name)
                await expect(link).toBeClickable()
                await expect(link).toHaveAttribute('onclick', filter)
            }
        })

        // Filtering tests (t4-t7): clicking a category in the left-hand menu should
        // replace the product grid with exactly that category's products, in this order.
        // These lists are Demoblaze's current catalogue; update them if the site changes.

        // Clicks "Phones" and checks that only the phones are shown.
        it('t4 - shows only phones when "Phones" is selected', async () => {
            const phones = [
                'Samsung galaxy s6', 'Nokia lumia 1520', 'Nexus 6', 'Samsung galaxy s7',
                'Iphone 6 32gb', 'Sony xperia z5', 'HTC One M9',
            ]

            await HomePage.category('Phones').click()
            await HomePage.waitForProducts(phones)
            expect(await HomePage.getProductTitles()).toEqual(phones)
        })

        // Clicks "Laptops" and checks that only the laptops are shown.
        it('t5 - shows only laptops when "Laptops" is selected', async () => {
            const laptops = [
                'Sony vaio i5', 'Sony vaio i7', 'MacBook air', 'Dell i7 8gb',
                '2017 Dell 15.6 Inch', 'MacBook Pro',
            ]

            await HomePage.category('Laptops').click()
            await HomePage.waitForProducts(laptops)
            expect(await HomePage.getProductTitles()).toEqual(laptops)
        })

        // Clicks "Monitors" and checks that only the monitors are shown.
        it('t6 - shows only monitors when "Monitors" is selected', async () => {
            const monitors = ['Apple monitor 24', 'ASUS Full HD']

            await HomePage.category('Monitors').click()
            await HomePage.waitForProducts(monitors)
            expect(await HomePage.getProductTitles()).toEqual(monitors)
        })

        // Clicking the "CATEGORIES" heading reloads the page and clears the filter.
        // Filters to Monitors first, then checks that clicking CATEGORIES brings
        // back the same products the home page showed when it first loaded.
        it('t7 - shows all products again when "CATEGORIES" is selected', async () => {
            const allProducts = await HomePage.getProductTitles()

            await HomePage.category('Monitors').click()
            await HomePage.waitForProducts(['Apple monitor 24', 'ASUS Full HD'])

            await HomePage.categoriesHeader.click()
            await HomePage.waitForProducts(allProducts)
            expect(await HomePage.getProductTitles()).toEqual(allProducts)
        })

        // Checks the footer at the bottom of the page: the three columns
        // ("About Us", "Get in Touch" and "PRODUCT STORE" with its logo) and the
        // copyright line underneath. The logo must actually have loaded, not just
        // be present as a broken image.
        it('t8 - shows the footer', async () => {
            const headings = await HomePage.footerHeadings.map(h => h.getText())
            expect(headings).toEqual(['About Us', 'Get in Touch', 'PRODUCT STORE'])

            await expect(HomePage.footerAboutUsText).toBeDisplayed()
            await expect(HomePage.footerAboutUsText).toHaveText(
                expect.stringContaining('We believe performance needs to be validated')
            )

            const contactLines = await HomePage.footerContactLines.map(p => p.getText())
            expect(contactLines).toEqual([
                'Address: 2390 El Camino Real',
                'Phone: +440 123456',
                'Email: demo@blazemeter.com',
            ])

            await expect(HomePage.footerLogo).toBeDisplayed()
            expect(await HomePage.footerLogo.getProperty('naturalWidth')).toBeGreaterThan(0)

            await expect(HomePage.copyright).toBeDisplayed()
            await expect(HomePage.copyright).toHaveText('Copyright © Product Store')
        })
    })
}
