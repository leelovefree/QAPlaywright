
import {test as base} from "@playwright/test"
import users from '../test-data/user-authen.json'

export const test = base.extend<{ userData: { username: string; password: string } }>({
    userData: async ({}, use) => {
        await use({
            username: users.username,
            password: users.password,
        })
    }
})