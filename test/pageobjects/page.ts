import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    public open(path: string) {
        return browser.url(`/${path}`)
    }

    /**
    * Runs `action` and returns the text of the native JS alert it triggers.
    * WebdriverIO (BiDi) auto-accepts dialogs, so `isAlertOpen()` is unreliable;
    * we listen for the `dialog` event instead and accept it ourselves.
    */
    public async getAlertTextAfter(action: () => Promise<unknown>, timeout = 10000): Promise<string> {
        let message: string | undefined
        const listener = async (dialog: { message(): string, accept(): Promise<void> }) => {
            message = dialog.message()
            await dialog.accept()
        }
        browser.on('dialog', listener)
        try {
            await action()
            await browser.waitUntil(() => message !== undefined, {
                timeout,
                timeoutMsg: `Expected an alert within ${timeout}ms`
            })
            return message as string
        } finally {
            browser.off('dialog', listener)
        }
    }

    /**
    * Runs `action`, then keeps listening for `waitMs` and returns every alert text seen.
    * Useful to assert that an action triggers no alert, or no unexpected extra alert.
    */
    public async getAllAlertsDuring(action: () => Promise<unknown>, waitMs = 3000): Promise<string[]> {
        const messages: string[] = []
        const listener = async (dialog: { message(): string, accept(): Promise<void> }) => {
            messages.push(dialog.message())
            await dialog.accept()
        }
        browser.on('dialog', listener)
        try {
            await action()
            await browser.pause(waitMs)
            return messages
        } finally {
            browser.off('dialog', listener)
        }
    }
}
