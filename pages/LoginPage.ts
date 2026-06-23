import { Locator, Page } from "@playwright/test";

export class LoginPage {

    readonly page: Page;
    readonly loginInBtn: Locator;
    readonly passwordInput: Locator;
    readonly userNameInput: Locator;


    constructor(page:Page){
        this.page = page
        this.loginInBtn = page.getByText('Login')
        this.userNameInput = page.locator('#userEmail')
        this.passwordInput = page.locator('#userPassword')
    }

    async login(username: string, password){
        await this.userNameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginInBtn.click()
    }

    async goto(){
       
        await this.page.goto('https://rahulshettyacademy.com/client')
    }
}