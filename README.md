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

## Adding new test cases (GitHub + Playwright)

Follow these simple steps to add a new test and deliver it via GitHub:

1. Create a new branch locally (use a descriptive name):

```powershell
git checkout -b feat/add-my-test
```

2. Add a new test file under `tests/`, e.g. `tests/my-feature.spec.js`.
	- Use the existing tests for style: `const { test, expect } = require('@playwright/test')`
	- Keep each `test()` focused and idempotent.

3. Run the new test locally and iterate until it passes:

```powershell
npx playwright test tests/my-feature.spec.js --headed   # for interactive debugging
npx playwright test tests/my-feature.spec.js            # headless CI-like run
```

4. Optionally use the helper to record per-spec results:

```powershell
.\scripts\run-and-record.ps1 tests\my-feature.spec.js
```

5. Commit and push your branch, then open a Pull Request on GitHub:

```powershell
git add tests/my-feature.spec.js
git commit -m "tests: add my-feature.spec.js"
git push --set-upstream origin feat/add-my-test
```

6. Review CI results and feedback, then merge the PR when green.

Tips:
- Name files with `.spec.js` and keep tests small (one assertion group per test).
- Use `--headed` and `PWDEBUG=1` for interactive debugging if selectors fail.
- Avoid committing large artifacts (screenshots, videos) — these are stored in `test-results/` and typically ignored.

