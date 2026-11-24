import { expect } from '@wdio/globals'
import AboutUs from '../pageobjects/about-us.page'


describe('About Us Page', () => {
    it('should navigate to the About Us page', async () => {
        await AboutUs.btnAboutNav.click()
        await browser.pause(1000)
        await expect(AboutUs.modal).toBeDisplayed()


    })

    it('should close thhe modal by clicking close button', async () => {
        await AboutUs.btnAboutNav.click()
        await browser.pause(1000)
        await expect(AboutUs.modal).toBeDisplayed()
        await AboutUs.btnClose.click()
        await expect(AboutUs.modal).not.toBeDisplayed()
    })


    it('should opne in full screen mode and close the modal by clicking close button', async () => {
        await AboutUs.btnAboutNav.click()
        await browser.pause(1000)
        await expect(AboutUs.modal).toBeDisplayed()
        await AboutUs.btnFullscreen.click()
        await AboutUs.btnClose.click()
        await expect(AboutUs.modal).not.toBeDisplayed()
    })

    it('should display video progress bar', async () => {
        await AboutUs.btnAboutNav.click()
        await browser.pause(1000)
        await AboutUs.btnPlayVideo.click()
        await expect(AboutUs.videoProgressBar).toBeDisplayed()
    })
})

