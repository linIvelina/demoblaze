import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. index.html), resolved against baseUrl
    */
    public open (path: string = 'index.html') {
        return browser.url(`/${path}`)
    }

    /**
     * Demoblaze reports most outcomes via native alert() popups that appear
     * shortly after an API round trip. WebdriverIO auto-dismisses dialogs
     * unless a 'dialog' listener is registered, so classic getAlertText()
     * cannot be used — run the triggering action with a listener in place,
     * accept the dialog and return its message.
     */
    public async triggerAndAcceptAlert (action: () => Promise<unknown>): Promise<string> {
        let message: string | undefined
        const onDialog = async (dialog: { message(): string, accept(): Promise<void> }) => {
            message = dialog.message()
            await dialog.accept()
        }
        browser.on('dialog', onDialog)
        try {
            await action()
            await browser.waitUntil(async () => message !== undefined, {
                timeoutMsg: 'expected a browser alert to appear'
            })
        } finally {
            browser.off('dialog', onDialog)
        }
        return message as string
    }
}
