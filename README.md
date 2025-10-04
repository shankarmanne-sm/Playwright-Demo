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