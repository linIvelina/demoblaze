import { config as desktopConfig } from './wdio.conf.ts'

export const config: WebdriverIO.Config = {
    ...desktopConfig,
    // one emulator = one session at a time
    maxInstances: 1,
    port: 4723,
    capabilities: [{
        platformName: 'Android',
        browserName: 'Chrome',
        'appium:automationName': 'UiAutomator2',
        'appium:avd': 'Pixel_9_API_VanillaIceCream',
        'appium:avdLaunchTimeout': 180000,
        'appium:chromedriverAutodownload': true,
    }],
    services: [
        ['appium', { args: { allowInsecure: 'uiautomator2:chromedriver_autodownload' } }],
    ],
}
