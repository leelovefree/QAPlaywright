import {expect, test} from "@playwright/test";

//let webContext
let storeContext

test.beforeAll(async({browser,page})=>{
    const context = await browser.newContext()
    //const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('#userEmail').fill("linhdn.test001@gmail.com")
    await page.locator('#userPassword').fill("Gaia@361452")
    await page.locator("[value='Login']").click()
    await page.waitForLoadState('networkidle')

    storeContext = await context.storageState({path:'storeState.json'})
   
})

test('Client app view product',async ({browser})=> {
    const webContext = await browser.newContext({storageState: 'storeState.json'})
    const page = await webContext.newPage()
    await page.goto('https://rahulshettyacademy.com/client')
    const selectedProduct  = 'ZARA COAT 3'
    const products = await page.locator('.card-body')
    
    const productsList = await page.locator('.card-body b').allTextContents()
    console.log(productsList)
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
})

test('Intercept api response',async ({page})=> {
    
   
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a2bba8917ee3e78bad45c46", 
        async route =>{
            const response = await route.fetch()
            let fakebody = {data:[], message:"No Orders"}
            await route.fulfill({
                response,
  
                json: fakebody
            })
    })
    
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/myorders')


    await page.pause()
})