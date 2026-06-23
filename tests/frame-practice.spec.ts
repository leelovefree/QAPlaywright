import {test} from "@playwright/test"

test('work with iframe', async({page}) => {


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    const frameTest = page.frameLocator("#courses-iframe")

    await frameTest.locator("li a[href*='lifetime-access']:visible").click()
    const textCheck = await frameTest.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1])
    
})