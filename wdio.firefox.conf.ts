import { config as baseConfig } from './wdio.conf.ts'

// Runs all specs in Firefox. Everything except the browser comes from wdio.conf.ts.
export const config: WebdriverIO.Config = {
    ...baseConfig,
    capabilities: [{
        browserName: 'firefox',
    }],
}
