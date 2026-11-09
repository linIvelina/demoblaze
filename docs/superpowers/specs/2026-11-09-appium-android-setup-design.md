# Appium Android Mobile-Web Setup — Design

**Date:** 2026-11-09
**Project:** demoblaze (WebdriverIO v10, TypeScript, Mocha)
**Goal:** Run the existing/upcoming Demoblaze web tests in Chrome on an Android emulator, alongside the current desktop Chrome setup.

## Decisions

- **Target:** mobile web — Demoblaze in Chrome on an Android emulator (no native app).
- **Device:** local Android emulator (AVD already created via Android Studio).
- **Appium lifecycle:** `@wdio/appium-service` starts/stops the Appium server per run (Approach A). As a learning exercise, Appium will be started manually once before the service is wired in.
- **Config layout:** separate config per target, sharing a common base. Desktop behavior is unchanged.

## New packages (devDependencies)

- `appium` — server, local to the project
- `@wdio/appium-service` — WDIO service that manages the server

The `uiautomator2` driver is installed with `npx appium driver install uiautomator2`; it lives in `~/.appium`, not in `package.json`.

## File layout

```
wdio.shared.conf.ts    common: specs path, framework, reporters, timeouts, baseUrl
wdio.conf.ts           desktop: extends shared, browserName: chrome (unchanged behavior)
wdio.android.conf.ts   mobile: extends shared, appium service + Android capabilities
```

## Android config essentials

```ts
capabilities: [{
    platformName: 'Android',
    browserName: 'Chrome',                    // mobile WEB session
    'appium:automationName': 'UiAutomator2',
    'appium:avd': '<AVD name>',               // from `emulator -list-avds`, filled in during implementation
    'appium:chromedriverAutodownload': true,  // match chromedriver to emulator Chrome
}],
services: [['appium', {
    args: { allowInsecure: 'chromedriver_autodownload' },
}]],
```

## npm scripts

- `npm run wdio` — desktop Chrome (as today)
- `npm run wdio:android` — Android emulator

## Invariants

- Specs and page objects are shared between desktop and mobile — no mobile-specific test code.
- Desktop test behavior must be identical before and after the config split.

## Known risks / gotchas

1. `chromedriverAutodownload` requires Appium's insecure-feature flag (`chromedriver_autodownload`) in the service args.
2. First emulator boot is slow — the Android config may need a raised connection/boot timeout (`appium:avdLaunchTimeout`, WDIO `waitforTimeout` already at ~20s for the slow Demoblaze API).
3. Existing Demoblaze gotchas (Bootstrap modal fade, WDIO v10 dialog auto-dismiss) apply on mobile too.

## Acceptance criteria

- `npm run wdio` passes exactly as before the change.
- `npm run wdio:android` boots the emulator, opens Demoblaze in Chrome, and runs the same spec files to green.
