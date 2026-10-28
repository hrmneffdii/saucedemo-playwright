# SauceDemo Playwright: E2E Test Automation

![Playwright Tests](https://github.com/hrmneffdii/saucedemo-playwright/actions/workflows/playwright.yml/badge.svg)

End-to-end test automation for the [SauceDemo](https://www.saucedemo.com) demo e-commerce site, built with **Playwright** and **TypeScript**. The project covers login, product inventory and sorting, shopping cart, and checkout, and includes bug reports and a test summary report. Tests run automatically on GitHub Actions.

> **Note:** SauceDemo is a public practice site. The `problem_user` account is intentionally faulty, so the bugs documented here are practice findings used to demonstrate defect reporting, not defects in a real product.

## Highlights

- **29 automated tests** across 5 areas, running on **Chromium and Firefox**.
- **Page Object Model** with custom **fixtures** (`loginAs`, `loggedInPage`) so tests stay short and readable.
- **Data-driven tests** for negative login cases, required checkout fields, and sorting options.
- **Boundary testing** on the cart (0, 1, and all 6 items).
- **Known bugs tracked as tests:** failing behaviour of `problem_user` is reproduced with `test.fail()`, so CI stays green while the bug exists and signals when it gets fixed.
- **No fixed sleeps.** Tests rely on Playwright auto-waiting, web-first assertions, and `expect.poll`.
- **Reporting:** HTML report, screenshots, video, and traces on failure, uploaded as CI artifacts.

## Tech stack

| Purpose | Tool |
| --- | --- |
| Test framework | Playwright (`@playwright/test`) |
| Language | TypeScript |
| Design pattern | Page Object Model, custom fixtures |
| Reporting | Playwright HTML report, trace viewer |
| CI | GitHub Actions |
| Runtime | Node.js 20+ |

## Project structure

```
saucedemo-playwright/
├─ pages/                  Page Objects
│  ├─ LoginPage.ts
│  ├─ InventoryPage.ts
│  ├─ CartPage.ts
│  └─ CheckoutPage.ts
├─ fixtures/index.ts       Custom fixtures
├─ data/                   Test data (users, products, customer)
├─ utils/money.ts          Helper functions
├─ tests/
│  ├─ login.spec.ts
│  ├─ inventory.spec.ts
│  ├─ cart.spec.ts
│  ├─ checkout.spec.ts
│  └─ known-bugs.spec.ts
├─ bug-reports/            BUG-001.md ... BUG-004.md
├─ evidence/               Screenshots and recordings
├─ playwright.config.ts
└─ .github/workflows/playwright.yml
```

## Getting started

**Prerequisites:** Node.js 20 or newer and Git.

```bash
git clone https://github.com/hrmneffdii/saucedemo-playwright.git
cd saucedemo-playwright
npm ci
npx playwright install --with-deps
npx playwright test
```

### Useful commands

| Command | What it does |
| --- | --- |
| `npm test` | Run all tests on all browsers |
| `npm run test:smoke` | Run only tests tagged `@smoke` |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run report` | Open the last HTML report |
| `npm run typecheck` | Type-check the TypeScript code |
| `npx playwright test --project=chromium` | Run on a single browser |
| `npx playwright test -g "successful login..."` | Run tests matching a name |
| `npx playwright test --repeat-each=5` | Repeat tests to detect flakiness |
| `npx playwright test --headed` | Run with a visible browser |

## Test coverage

| Area | Tests | What is covered |
| --- | --- | --- |
| Login | 7 | Valid login, wrong password, empty username, empty password, locked-out user, logout, access without login |
| Inventory and sorting | 6 | Product names and prices, unique images, sorting by name (A-Z, Z-A) and price (low-high, high-low) |
| Cart | 6 | Empty cart, add one item, remove from inventory, add all 6 items, persistence after refresh, remove from cart page |
| Checkout | 6 | Successful checkout, required-field validation (first name, last name, postal code), cancel keeps cart, item total, 8% tax and total calculation |
| Known bugs (`problem_user`) | 4 | Add to cart failure, sorting not working, identical product images, last name not saved |
| **Total** | **29** | |

Tests tagged `@smoke`: valid login, product list, add one item, and successful checkout.

## Known bugs

Full reports are in [`bug-reports/`](./bug-reports). All bugs were found with the intentionally faulty `problem_user` account.

| ID | Title | Severity | Priority | Status |
| --- | --- | --- | --- | --- |
| [BUG-001](./bug-reports/BUG-001.md) | Add to cart does not add certain products | High | P1 | Open |
| [BUG-002](./bug-reports/BUG-002.md) | Product sorting does not change the order | Medium | P2 | Open |
| [BUG-003](./bug-reports/BUG-003.md) | All products show the same image | Medium | P3 | Open |
| [BUG-004](./bug-reports/BUG-004.md) | Last Name in checkout is not saved, blocking checkout | High | P1 | Open |

Each bug has a matching test in `tests/known-bugs.spec.ts` marked with `test.fail()`. While the bug exists the test is reported as passing. Once the bug is fixed, the test fails, which is the signal to remove `test.fail()` and keep the test as a regression check.

## Test design approach

- **Black-box testing:** the application is tested from the user's side, without reading its source code.
- **Exploratory first, automation second:** findings from manual exploration are turned into automated tests, similar to writing a proof of concept for a security finding.
- **Stable locators:** `getByTestId` and `getByRole` are preferred over long CSS selectors.
- **Independent tests:** each test sets up its own state and can run in parallel.
- **Techniques used:** equivalence partitioning (valid, empty, invalid inputs), boundary value analysis (cart with 0, 1, and 6 items), and decision-style checks for price calculation.

## Reporting

- **Bug reports:** [`bug-reports/`](./bug-reports), one file per bug with steps, expected and actual results, evidence, impact, and retest criteria.
- **Test summary report:** [`test-summary.md`](./test-summary.md) with scope, methodology, results, bug list, remaining risks, and a go/no-go recommendation.
- **Automated reports:** each CI run uploads the Playwright HTML report (with screenshots, videos, and traces for failed tests) as an artifact in the **Actions** tab.

## CI/CD

The workflow in `.github/workflows/playwright.yml` runs on every push to `main`, every pull request, nightly on a schedule, and manually through `workflow_dispatch`. Failed runs keep the HTML report as a downloadable artifact for 14 days.

## Limitations

- Only Chromium. WebKit and mobile viewports are not tested.
- Only `standard_user`, `locked_out_user`, and `problem_user` are used. `error_user`, `visual_user`, and `performance_glitch_user` are not covered yet.
- No performance, accessibility, or deep security testing.
- SauceDemo may change over time, which can require updating locators or expected messages in the Page Objects.
