# Playwright-Demo

This repository contains Playwright tests for demo and exploration purposes.

## Quick setup

1. Install Node.js (LTS) from https://nodejs.org and restart your terminal.
2. Install dependencies:

```powershell
npm install
npx playwright install
```

## Test files

- `tests/example.spec.js` — a basic smoke test.
- `tests/google-search.spec.js` — an example that interacts with Google (may require popup handling).
- `tests/copilot-docs.spec.js` — tests that click the Copilot Studio call-to-action.

## Run tests

- Run all tests (headless):

```powershell
npx playwright test
```

- Run a single test (headed) to see the browser UI:

```powershell
npx playwright test tests/copilot-docs.spec.js --headed
```

## Per-test result folders

We create per-spec folders under `test-results/` with a small status file that makes it easy to see which tests passed or failed.

- After a test run you will find folders like `test-results/example.spec.js/` with a file named `example.spec.js - passed.txt` or `failed.txt`.
- The repository includes a helper script that runs tests and produces per-spec status files.

## Helper: run-and-record.ps1

Use the helper script to run tests and automatically write per-spec status files into `test-results/`.

```powershell
.\	ests\run-and-record.ps1          # run every test and record results
.\scripts\run-and-record.ps1 tests\copilot-docs.spec.js   # run single test and record
```

The script writes a JSON report and creates (or updates) folders under `test-results/` with files like:

- `test-results/copilot-docs.spec.js/copilot-docs.spec.js - passed.txt`

Each status file contains: status, title and file path (and duration if available).

## Inspecting failures

- Playwright saves per-run artifacts under `test-results/` (screenshots, videos, error-context.md).
- The helper script also copies the `.last-run.json` into each per-spec folder as `summary.last-run.json` for reference.

## Troubleshooting

- If Playwright cannot find a selector, run the test in headed mode (`--headed`) and watch the browser.
- Use `PWDEBUG=1 npx playwright test <spec>` to open the Playwright inspector for interactive debugging.

## Commit and push

If you want these changes pushed upstream, say so and I will commit and push the README and helper script for you.
