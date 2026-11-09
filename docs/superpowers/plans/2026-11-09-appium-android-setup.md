# Appium Android Mobile-Web Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Learning-mode note:** Donika executes the commands herself with coaching; the executor's job is to guide, verify output, and review — not to bulk-run everything.

**Goal:** Run the Demoblaze web tests in Chrome on an Android emulator alongside the existing desktop Chrome setup, with `@wdio/appium-service` managing the Appium server.

**Architecture:** Split `wdio.conf.ts` into a shared base (`wdio.shared.conf.ts`) plus two thin target configs: `wdio.conf.ts` (desktop Chrome, behavior unchanged) and `wdio.android.conf.ts` (Appium + UiAutomator2 driving Chrome on an emulator). A throwaway smoke spec verifies both targets since no real specs exist yet.

**Tech Stack:** WebdriverIO v10, TypeScript (`moduleResolution: bundler`, `.ts` imports allowed), Mocha, Appium 3 + UiAutomator2 driver, Android emulator (AVD already created).

**Spec:** `docs/superpowers/specs/2026-11-09-appium-android-setup-design.md`

---

### Task 1: Verify the Android environment

**Files:** none (environment only)

- [ ] **Step 1: Find the AVD name** (used in Task 6 — write it down)

Run: `~/Library/Android/sdk/emulator/emulator -list-avds`
Expected: at least one AVD name, e.g. `Pixel_8_API_35`. If `emulator` isn't at that path, run `echo $ANDROID_HOME` and use `$ANDROID_HOME/emulator/emulator -list-avds`.

- [ ] **Step 2: Confirm the emulator has Chrome**

Boot the AVD from Android Studio (Device Manager → ▶) and check the Chrome app exists on the device. Mobile-web testing drives real Chrome; an AVD image without Google APIs/Play may lack it. If missing, create an AVD from a "Google Play" system image.

- [ ] **Step 3: Confirm adb sees the emulator**

Run: `~/Library/Android/sdk/platform-tools/adb devices`
Expected: one `emulator-5554   device` line. Leave the emulator running.

### Task 2: Install Appium packages and driver

**Files:**
- Modify: `package.json` (devDependencies, via npm)

- [ ] **Step 1: Install npm packages**

Run: `npm install -D appium @wdio/appium-service`
Expected: both added to `devDependencies`, no errors.

- [ ] **Step 2: Verify the Appium server binary**

Run: `npx appium --version`
Expected: a version number (3.x).

- [ ] **Step 3: Install the UiAutomator2 driver** (with a project-local appium, APPIUM_HOME autodetects to the project root, so the driver installs into the project's `node_modules`)

Run: `npx appium driver install uiautomator2`
Expected: `✔ Installing 'uiautomator2'` … `successfully installed`.

- [ ] **Step 4: Verify the driver**

Run: `npx appium driver list --installed`
Expected: `- uiautomator2@x.y.z [installed (npm)]`

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "Add appium and @wdio/appium-service"
```

### Task 3: Learning detour — run the Appium server manually once

**Files:** none. This is the one-time look at what `@wdio/appium-service` automates. Nothing is committed.

- [ ] **Step 1: Start the server by hand**

Run: `npx appium --allow-insecure "uiautomator2:chromedriver_autodownload"`
Expected: banner with `Appium REST http interface listener started on http://0.0.0.0:4723`, and `uiautomator2` listed under available drivers.

- [ ] **Step 2: Observe, then stop**

Note the log lines: the HTTP endpoint, the driver list, the insecure-features warning. This is exactly what the service will start/stop around every `npm run wdio:android`. Stop with `Ctrl+C`.

### Task 4: Extract the shared base config + smoke spec

**Files:**
- Create: `wdio.shared.conf.ts`
- Create: `test/specs/smoke.e2e.ts`
- Modify: `tsconfig.json:28` (include list)

- [ ] **Step 1: Create `wdio.shared.conf.ts`** — everything target-independent moves here

```ts
export const config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    specs: ['./test/specs/**/*.ts'],
    exclude: [],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://www.demoblaze.com',
    // Demoblaze's demo API can intermittently take well over 10s to respond,
    // so give waits generous headroom to avoid latency flakes.
    waitforTimeout: 20000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },
} satisfies Omit<WebdriverIO.Config, 'capabilities'>
```

Note: `maxInstances` deliberately stays out of the base — desktop and Android need different values.

- [ ] **Step 2: Create the smoke spec `test/specs/smoke.e2e.ts`** (there are no specs yet; this verifies both targets and gets replaced by real tests later)

```ts
import { browser, expect } from '@wdio/globals'

describe('Demoblaze smoke', () => {
    it('opens the home page', async () => {
        await browser.url('/')
        await expect(browser).toHaveTitle('STORE')
    })
})
```

- [ ] **Step 3: Add the new config files to `tsconfig.json`**

Replace the `include` array with:

```json
    "include": [
        "test/specs",
        "test/pageobjects",
        "wdio.conf.ts",
        "wdio.shared.conf.ts",
        "wdio.android.conf.ts"
    ]
```

(`wdio.android.conf.ts` doesn't exist yet — that's fine, `include` tolerates missing entries. `test/pageobjects` is added because the existing `page.ts` must typecheck once specs import it.)

### Task 5: Rewrite the desktop config as a thin extension

**Files:**
- Modify: `wdio.conf.ts` (full rewrite — the 300-line commented boilerplate is replaced by this)

- [ ] **Step 1: Replace the entire contents of `wdio.conf.ts` with:**

```ts
import { config as shared } from './wdio.shared.conf.ts'

export const config: WebdriverIO.Config = {
    ...shared,
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome',
    }],
}
```

- [ ] **Step 2: Verify desktop behavior is unchanged**

Run: `npm run wdio`
Expected: Chrome opens, `Demoblaze smoke ✓ opens the home page`, `1 passing`. This proves the shared/desktop split is behavior-neutral (spec acceptance criterion 1).

- [ ] **Step 3: Commit**

```bash
git add wdio.conf.ts wdio.shared.conf.ts test/specs/smoke.e2e.ts tsconfig.json
git commit -m "Split wdio config into shared base and desktop target"
```

### Task 6: Add the Android config

**Files:**
- Create: `wdio.android.conf.ts`
- Modify: `package.json` (scripts)

- [ ] **Step 1: Create `wdio.android.conf.ts`** — replace `AVD_NAME_FROM_TASK_1` with the name recorded in Task 1 Step 1 (e.g. `Pixel_8_API_35`)

```ts
import { config as shared } from './wdio.shared.conf.ts'

export const config: WebdriverIO.Config = {
    ...shared,
    // one emulator = one session at a time
    maxInstances: 1,
    hostname: 'localhost',
    port: 4723,
    capabilities: [{
        platformName: 'Android',
        browserName: 'Chrome',
        'appium:automationName': 'UiAutomator2',
        'appium:avd': 'AVD_NAME_FROM_TASK_1',
        'appium:avdLaunchTimeout': 180000,
        'appium:chromedriverAutodownload': true,
    }],
    services: [
        ['appium', {
            args: {
                allowInsecure: ['uiautomator2:chromedriver_autodownload'],
            },
        }],
    ],
}
```

- [ ] **Step 2: Add the npm script** — in `package.json`, change the `scripts` block to:

```json
  "scripts": {
    "wdio": "wdio run ./wdio.conf.ts",
    "wdio:android": "wdio run ./wdio.android.conf.ts"
  }
```

- [ ] **Step 3: Run the mobile smoke test** (emulator may be running from Task 1 — that's fine, `appium:avd` reuses a booted AVD)

Run: `npm run wdio:android`
Expected: Appium starts (service log lines), chromedriver auto-downloads on first run (can take a minute), Chrome opens on the emulator, `Demoblaze smoke ✓ opens the home page`, `1 passing` (spec acceptance criterion 2).

Known failure modes:
- `Could not find a driver for automationName 'UiAutomator2'` → Task 2 Step 3 was skipped/failed.
- `No Chromedriver found that can automate Chrome 'NNN'` → the insecure-feature flag isn't reaching Appium; check the `services` block matches Step 1 exactly.
- Timeout waiting for AVD → raise `appium:avdLaunchTimeout`, or pre-boot the emulator from Android Studio.

- [ ] **Step 4: Re-run desktop to confirm no regression**

Run: `npm run wdio`
Expected: still `1 passing`.

- [ ] **Step 5: Commit**

```bash
git add wdio.android.conf.ts package.json
git commit -m "Add Android emulator target via appium service"
```

### Task 7: Finish the branch

- [ ] **Step 1: Push the branch**

```bash
git push -u origin test/donika-demoblaze-appium-setup
```

- [ ] **Step 2: Decide integration** — merge into `test/donika-demoblaze-tests` (her working main) when she's happy, so the login-tests branch can rebase onto it.
