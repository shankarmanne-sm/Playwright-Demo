const { test, expect, chromium } = require('@playwright/test');

test('Google search for Playwright MCP in Copilot (incognito, headless)', async () => {
  const browser = await require('playwright').chromium.launch({ channel: 'chrome', headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.google.com/');

  // Handle 'Stay signed out' popup if present
  const staySignedOutButton = await page.$('div#niO4u.VDgVie.SlP8xc');
  if (staySignedOutButton) {
    await staySignedOutButton.click();
  }

  // Take screenshot after page load for debugging
  await page.screenshot({ path: 'screenshots/step1-after-load.png' });

  // Handle Google's consent or popup dialogs if present
  // Try multiple selectors for different regions and languages
  const popupSelectors = [
    'button[aria-label="Accept all"]',
    'button:has-text("I agree")',
    'button:has-text("Accept all")',
    'button:has-text("Accept")',
    'button:has-text("AGREE")',
    'button:has-text("Yes, I agree")',
    'button:has-text("Alle akzeptieren")',
    'button:has-text("Tout accepter")',
    'button:has-text("Aceptar todo")',
    'button:has-text("Accept the use of cookies")',
    'div[role="dialog"] button',
    'form[action*="consent"] button',
  ];
  for (const selector of popupSelectors) {
    const button = await page.$(selector);
    if (button) {
      await button.click();
      break;
    }
  }

  // Take screenshot after attempting to close popup
  await page.screenshot({ path: 'screenshots/step2-after-popup.png' });

  // Wait for the search input to be visible
  await page.waitForSelector('input[name="q"]', { state: 'visible', timeout: 10000 });
  await page.fill('input[name="q"]', 'Playwright MCP in Copilot');
  await page.keyboard.press('Enter');

  // Wait for results to load
  await page.waitForSelector('#search', { timeout: 15000 });
  await page.screenshot({ path: 'screenshots/step3-after-search.png' });

  // Assert that results contain the search term
  const resultsText = await page.locator('#search').innerText();
  expect(resultsText).toContain('Playwright');

  await browser.close();
});