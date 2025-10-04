#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function kebabCase(input) {
  return input
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

const [, , rawName] = process.argv;
if (!rawName) {
  console.error('Usage: node scripts/generate-test.js <test-name>');
  process.exit(2);
}

const name = kebabCase(rawName);
const testsDir = path.resolve(__dirname, '..', 'tests');
if (!fs.existsSync(testsDir)) fs.mkdirSync(testsDir, { recursive: true });

const filename = path.join(testsDir, `${name}.spec.js`);
if (fs.existsSync(filename)) {
  console.error(`Refusing to overwrite existing file: ${filename}`);
  process.exit(3);
}

const content = `const { test, expect } = require('@playwright/test');

// Generated test: ${rawName}
// Edit this file to add meaningful steps and assertions.

test('${rawName} - basic example', async ({ page }) => {
  await page.goto('https://example.com');
  // Replace the example assertion below with your real checks
  await expect(page).toHaveTitle(/Example Domain/);
});
`;

fs.writeFileSync(filename, content, { encoding: 'utf8' });
console.log(`Created: ${filename}`);
