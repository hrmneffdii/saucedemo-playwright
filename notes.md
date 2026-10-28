#### Important Lesson  

- `testIdAttribute: 'data-test'` in `playwright.config.ts` is equal to `page.locator('[data-test="username"'])` by using `page.getByTestId('username')`.
- `getByRole()` matches for identified element which have fix name and fix role such as Login button.
- `getByTestId()` mathes if the apps serves specific variabel for stable testing.
- `locator('.class')` is used for selecting css class
