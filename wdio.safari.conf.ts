import { config as baseConfig } from './wdio.conf.ts'

// Runs all specs in Safari. Everything except the browser comes from wdio.conf.ts.
//
// One-time setup on each Mac: run `sudo safaridriver --enable` and, in Safari,
// turn on Develop > Allow Remote Automation.
export const config: WebdriverIO.Config = {
    ...baseConfig,
    // safaridriver can only drive one Safari session at a time.
    maxInstances: 1,
    capabilities: [{
        browserName: 'safari',
    }],
}
