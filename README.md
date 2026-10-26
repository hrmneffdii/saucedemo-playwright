# SauceDemo Playwright: E2E Test Automation

![Playwright Tests](https://github.com/USERNAME/saucedemo-playwright/actions/workflows/playwright.yml/badge.svg)

E2E test automation project for demo website e-commerce [SauceDemo](https://www.saucedemo.com), using **Playwright** dan **TypeScript**. The project contains test cases, automation test with Page Object Model, bug report, and test summary report with pipeline CI in Github Actions.

> Note: SauceDemo is a public practice site. The `problem_user` account was intentionally created problematic by its provider, so the bug reported here was used as a report writing exercise, not a finding on a real product.

## Goals 

- Shows end-to-end QA workflows: exploration testing, test case design, automation, bug reporting, and summary results. 
- Build a test suite that is stable, structured, and easy to maintain. 
- Linking smart contract audit experience (finding loopholes and proving them with PoC) to QA practices: failed tests become evidence of bugs.




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

## Cakupan tes

Isi tabel ini sesuai tes yang sudah kamu tulis.

| Modul | Jumlah tes | Jenis | Status |
| --- | --- | --- | --- |
| Login | [ISI] | Positif, negatif | [ISI] |
| Inventory dan sorting | [ISI] | Positif, regression | [ISI] |
| Keranjang | [ISI] | Positif, batas | [ISI] |
| Checkout | [ISI] | Positif, negatif | [ISI] |
| **Total** | **[ISI]** | | |

## Bug yang ditemukan

Detail lengkap ada di folder [`bug-reports/`](./bug-reports).

| ID | Judul | Severity | Priority | Status |
| --- | --- | --- | --- | --- |
| [BUG-001](./bug-reports/BUG-001.md) | [ISI] | [ISI] | [ISI] | Open |
| [BUG-002](./bug-reports/BUG-002.md) | [ISI] | [ISI] | [ISI] | Open |
| [BUG-003](./bug-reports/BUG-003.md) | [ISI] | [ISI] | [ISI] | Open |

Tes yang mereproduksi bug ditandai dengan `test.fail()` agar CI tetap hijau selama bug masih ada. [Hapus bagian ini atau sesuaikan bila kamu memilih membiarkan tes gagal.]

## Laporan

- **Test summary report:** [`test-summary.md`](./test-summary.md): scope, metodologi, hasil eksekusi, daftar bug, risiko tersisa, dan rekomendasi.
- **Laporan otomatis:** setiap run CI menyimpan Playwright HTML report sebagai artifact di tab **Actions**.

## CI/CD

Workflow di `.github/workflows/playwright.yml` berjalan otomatis pada setiap push dan pull request. Setelah run selesai, laporan HTML (termasuk screenshot, video, dan trace untuk tes yang gagal) bisa diunduh dari artifact.

## Pendekatan pengujian

- **Black-box:** pengujian dari sisi pengguna tanpa membaca kode aplikasi.
- **Exploratory dulu, otomasi sesudahnya:** temuan manual dibuktikan dengan tes otomatis, mirip PoC pada audit keamanan.
- **Locator stabil:** mengutamakan atribut `data-test` dan role, menghindari selector rapuh.
- **Tanpa sleep tetap:** memakai auto-wait dan assertion web-first Playwright untuk menekan flaky test.
- **Tes independen:** setiap tes menyiapkan kondisinya sendiri dan bisa berjalan paralel.

## Yang akan saya kembangkan

- [ ] Menambah tes lintas browser (Firefox, WebKit)
- [ ] Tes API untuk Restful-Booker (repo terpisah)
- [ ] Visual regression dengan `toHaveScreenshot`
- [ ] Tes aksesibilitas dasar

## Tentang saya

[ISI: 2 sampai 3 kalimat. Contoh: Saya beralih dari audit smart contract ke QA Automation. Pengalaman menemukan celah lewat pengujian adversarial dan menulis PoC otomatis saya terapkan pada pengujian aplikasi web.]

- LinkedIn: [ISI]
- Email: [ISI]