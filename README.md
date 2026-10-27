# SauceDemo Playwright: E2E Test Automation

![Playwright Tests](https://github.com/USERNAME/saucedemo-playwright/actions/workflows/playwright.yml/badge.svg)

E2E test automation project for demo website e-commerce [SauceDemo](https://www.saucedemo.com), using **Playwright** dan **TypeScript**. The project contains test cases, automation test with Page Object Model, bug report, and test summary report with pipeline CI in Github Actions.

> Note: SauceDemo is a public practice site. The `problem_user` account was intentionally created problematic by its provider, so the bug reported here was used as a report writing exercise, not a finding on a real product.

## Goals 

- Shows end-to-end QA workflows: exploration testing, test case design, automation, bug reporting, and summary results. 
- Build a test suite that is stable, structured, and easy to maintain. 

## Tech stack

| Requirement | Tools |
| --- | --- |
| Framework Test | Playwright (`@playwright/test`) |
| Language | TypeScript |
| Design Pattern | Page Object Model, fixtures |
| Report | Playwright HTML report, trace, screenshot, video |
| CI | GitHub Actions |
| Runtime | Node.js 20+ |

## Project Structure

```
saucedemo-playwright/
├─ pages/              Page Object (LoginPage, InventoryPage, ...)
├─ tests/              Test File (*.spec.ts)
├─ fixtures/           Fixture Custom
├─ data/               Data Test
├─ bug-reports/        Bug Report per File (BUG-001.md, ...)
├─ evidence/           Screenshot and Evidence Bug
├─ test-summary.md     Test Summary Report
├─ playwright.config.ts
└─ .github/workflows/playwright.yml
```

## Instalations

Prerequisites: Node.js 20+ and Git.

```bash
git clone https://github.com/hrmneffdii/saucedemo-playwright.git
cd saucedemo-playwright
npm ci
npx playwright install --with-deps
npx playwright test
```

Other commands:

```bash
npx playwright test --ui                     
npx playwright test --headed                 
npx playwright test tests/login.spec.ts      
npx playwright test -g "login valid"         
npx playwright show-report                   
```

## Test Plan

| Modul | Count of Test | Type | Status |
| --- | --- | --- | --- |
| Login | 6 | Positif, negatif | Done |
| Cart  | 5 | Positif, regression | Done |
| Checkout | 6 | Positif, boundary | Done |
| Checkout | 3 | Positif, negatif | Done |
| **Total** | **20** | | |
## Bugs Discovered

Detailed reports are available in the [`bug-reports/`](./bug-reports) folder.

| ID | Title | Severity | Priority | Status |
| --- | --- | --- | --- | --- |
| [BUG-001](./bug-reports/BUG-001.md) | [TO BE FILLED] | [TO BE FILLED] | [TO BE FILLED] | Open |
| [BUG-002](./bug-reports/BUG-002.md) | [TO BE FILLED] | [TO BE FILLED] | [TO BE FILLED] | Open |
| [BUG-003](./bug-reports/BUG-003.md) | [TO BE FILLED] | [TO BE FILLED] | [TO BE FILLED] | Open |

## CI/CD

The workflow defined in `.github/workflows/playwright.yml` runs automatically on every push and pull request. Once the run is complete, the HTML report, including screenshots, videos, and traces for failed tests, can be downloaded from the workflow artifacts.

## Testing Approach

- **Black-box testing:** Testing the application from the user's perspective without examining its source code.
- **Exploratory testing first, automation afterward:** Manually discovered issues are validated through automated tests.
- **Stable locators:** Prioritizing `data-test` attributes and accessible roles while avoiding brittle selectors.
- **No fixed sleeps:** Using Playwright's auto-waiting and web-first assertions to minimize flaky tests.
- **Independent tests:** Each test sets up its own preconditions and can run in parallel.
