
import { test } from '@playwright/test';

test('UI Controls', async({page}) => {
    await page.goto('');

    const dropdown = await page.locator("select.form-control")
    await dropdown.selectOption("consult")
    await page.pause()
    
})