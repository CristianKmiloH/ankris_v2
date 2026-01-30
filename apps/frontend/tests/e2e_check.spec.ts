import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test('Deep Debug Login', async ({ page }) => {
    const logFile = 'debug_log.txt';
    // Clear previous log
    fs.writeFileSync(logFile, '--- TEST STARTED ---\n');

    // Helper to append log
    const log = (msg: string) => {
        // Also print to stdout for safety
        console.log(msg);
        fs.appendFileSync(logFile, msg + '\n');
    };

    page.on('console', msg => log(`[BROWSER CONSOLE] ${msg.type()}: ${msg.text()}`));
    page.on('pageerror', err => log(`[BROWSER ERROR] ${err.message}`));

    try {
        log('Navigating to http://localhost:5173...');
        await page.goto('http://localhost:5173');

        // Wait a moment for React to mount/crash
        await page.waitForTimeout(3000);

        const title = await page.title();
        log(`Page Title: ${title}`);

        // Dump DOM State
        const rootHTML = await page.innerHTML('#root');
        log('--- ROOT HTML START ---');
        log(rootHTML);
        log('--- ROOT HTML END ---');

        // Screenshot on success state check (before assertion)
        await page.screenshot({ path: 'debug_screenshot.png', fullPage: true });
        log('Screenshot saved to debug_screenshot.png');

        // Verification - SPECIFIC LOCATOR
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible({ timeout: 5000 });
    } catch (e) {
        log(`Test Failed: ${e}`);
        await page.screenshot({ path: 'debug_failure_screenshot.png', fullPage: true });
        throw e;
    }
});
