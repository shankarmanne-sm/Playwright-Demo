# Playwright-Demo

## Setup Steps

1. **Initialize Node.js project**
   - `npm init -y`
2. **Install Playwright and test runner**
   - `npm install --save-dev playwright @playwright/test`
3. **Install Playwright browsers**
   - `npx playwright install`
4. **Install system dependencies (Linux only, if prompted)**
   - `sudo npx playwright install-deps`

## Test Files

- `tests/example.spec.js`: Sample Playwright test for Playwright homepage.
- `tests/google-search.spec.js`: Test for searching "Playwright MCP in Copilot" on Google.

## Adding new tests

When you add a new test, follow these simple guidelines:

- Location: place test files under the `tests/` directory.
- Filename: use the pattern `<name>.spec.js` (Playwright will pick up `*.spec.js`).
- Contract: each test file should import Playwright's test helpers and export one or more `test()` cases. Keep tests small and deterministic.

Minimal example (save as `tests/my-new-test.spec.js`):

```js
const { test, expect } = require('@playwright/test');

test('short description of behavior', async ({ page }) => {
   await page.goto('https://example.com');
   // interactions and assertions
   expect(await page.title()).toContain('Example Domain');
});
```

Run a single test file locally:

```powershell
npx playwright test tests/my-new-test.spec.js -j 1
```

Commiting guidance:

- Add and commit only test source files (avoid committing run artifacts like `screenshots/` or `test-results/`).
- If you want to keep run artifacts locally, add a `.gitignore` entry for `screenshots/` and `test-results/`.


## Running Tests

- Run all tests:
  ```bash
  npx playwright test
  ```
- To see browser UI, set `headless: false` in your test and run locally (requires graphical environment).

## Notes
- Tests include logic to handle pop-ups and overlays.
- Debug screenshots are saved for troubleshooting failed selectors.
- All changes are pushed to the remote repository.

## Next Steps
- Clone or pull this repo to your local machine.
- Run Playwright tests in headed mode for interactive debugging.