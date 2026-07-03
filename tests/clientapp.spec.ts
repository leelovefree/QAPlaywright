import {expect, test} from "@playwright/test"

test('@App login', async ({page})=>{
    const selectedProduct  = 'ZARA COAT 3'
    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('#userEmail').fill("linhdn.test001@gmail.com")
    await page.locator('#userPassword').fill("Gaia@361452")
    await page.locator("[value='Login']").click()
    await page.waitForLoadState('networkidle')

    const products = await page.locator('.card-body')
    
    const productsList = await page.locator('.card-body b').allTextContents()
    console.log(productsList)
    // make some changes
    const count = await products.count()
    
    for(let i=0; i < count; i++){
        
        const productName = await products.nth(i).locator('b').textContent()
        console.log(productName)
        if(selectedProduct==productName){
            await products.nth(i).locator('text= Add To Cart').click()
        }
    }
    await page.locator("[routerlink*='cart']").click()

    await page.locator("div li.items").waitFor()
    const checkCart = await page.locator("h3:has-text('Zara Coat 3')").isVisible();
    expect(checkCart).toBeTruthy();
    await page.getByRole('button',{name:"Checkout"}).click()
    await page.locator("input[placeholder*='Country']").pressSequentially('Vie')
    await page.getByRole('button',{name:"Vietnam"}).click()
    await page.locator("div.actions a.action__submit").click()

    await page.locator('.hero-primary').waitFor()

    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ')

    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent()
    console.log(orderId)
    const orderIdValue = orderId?.replace(/\|/g, '').trim();
    console.log(orderIdValue)
    await page.getByRole('button',{name:"ORDERS"}).click()

    await page.locator("tbody").waitFor();
    expect(page.locator('h1.ng-star-inserted')).toBeVisible()
    const listOrdersSection = page.locator('tr.ng-star-inserted')

    const listOrders = await listOrdersSection.count()

    console.log(listOrders)

    /*
    for(let i=0; i<listOrders;i++){
        const orderId = await listOrdersSection.nth(i).locator('th').textContent()
        console.log('orderID: '+ orderId)
        if( orderId == orderIdValue){
            console.log(orderId)
            await listOrdersSection.nth(i).locator('.btn.btn-primary').click()
        }
        break;
    }
    */

    //await page.locator(`//tr[th[text()='${orderIdValue}']]//button[text()='View']`).click()

    const row = page.locator('tr').filter({has: page.locator(`th:text("${orderIdValue}")`) })
    await row.locator('.btn.btn-primary').click()

    //const row = page.locator('tr', { hasText: orderIdValue })
    //await row.getByRole('button', { name: 'View' }).click()
    
    expect(await page.locator('.email-title').textContent()).toBe(' order summary ')
    expect(await page.locator('.col-text').textContent()).toBe(orderIdValue)
    await page.pause()
})

















