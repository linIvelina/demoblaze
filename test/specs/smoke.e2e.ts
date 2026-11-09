import { browser, expect } from '@wdio/globals'

describe('Demoblaze smoke', () => {
    it('opens the home page', async () => {
        await browser.url('/')
        await expect(browser).toHaveTitle('STORE')
    })
})
