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
        return (browser as unknown as { url: (url: string) => Promise<void> }).url(`/${path}`)
    }

    /**
    * Starts listening for the next browser alert, accepts it and resolves with its text.
    * Call it BEFORE the action that triggers the alert and await the result after it:
    *   const alertText = page.waitForAlertText();
    *   await button.click();
    *   expect(await alertText).toBe('...');
    * @param timeout how long to wait for the alert, in ms
    */
    public waitForAlertText(timeout = 10000): Promise<string> {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                browser.removeAllListeners('dialog');
                reject(new Error(`Expected an alert to appear within ${timeout}ms`));
            }, timeout);

            // WebdriverIO (BiDi) surfaces browser alerts as 'dialog' events
            browser.once('dialog', async (dialog) => {
                clearTimeout(timer);
                const message = dialog.message();
                await dialog.accept();
                resolve(message);
            });
        });
    }
}
