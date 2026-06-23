import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";

export class PagesManager
{
   
    loginPage: LoginPage

    constructor(page: Page) {

        this.loginPage = new LoginPage(page)
    }

    getLoginPage(){
        return this.loginPage
    }
}