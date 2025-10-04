/**
 * Scenario: Google search for "Playwright MCP in Copilot"
 *
 * Steps:
 * 1. Open Google in an incognito (new) browser context.
 * 2. Dismiss any consent/sign-in popups that may block the search input.
 * 3. Type "Playwright MCP in Copilot" into the search input and submit.
 * 4. Wait for search results to appear and assert that results contain the search term.
 * 5. Capture debug screenshots when helpful for failures.
 */
const { test, expect, chromium } = require('@playwright/test');

test('Google search for Playwright MCP in Copilot (incognito, headless)', async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.google.com/');

  // Wait for the search input to be visible
  await page.waitForSelector('input[name="q"]', { state: 'visible', timeout: 10000 });
  await page.fill('input[name="q"]', 'Playwright MCP in Copilot');
  await page.keyboard.press('Enter');

  // Wait for results to load
  await page.waitForSelector('#search', { timeout: 15000 });
  await page.screenshot({ path: 'debug-after-search.png' });

  // Assert that results contain the search term
  const resultsText = await page.locator('#search').innerText();
  expect(resultsText).toContain('Playwright');

  await browser.close();
});