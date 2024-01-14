import {test,expect } from "@playwright/test"
import { UserName } from "../prisma/fixtures/user"
import { login, url } from "./util"
test.describe("プロフィール編集ページ", () => { 
    const path = "/my/profile/edit"
    const userName: UserName = "User-MyProfileEdit"
    const newName = "NewName";

    test("プロフィール名称を編集すると、プロフィールに反映される", async ({ page, }) => {
        await page.goto(url(path))
        await login({ page, userName })
        
        await expect(page).toHaveURL(url(path))
        await expect(page).toHaveTitle(`${userName}さんのプロフィール編集`)
        await page.getByRole("textbox", { name: "ユーザー名" }).fill(newName)
        await page.getByRole("button", { name: "プロフィールを変更する" }).click();
        await page.waitForURL(url("/my/posts"))
        
        await expect(page).toHaveTitle(`${newName}さんの投稿記事一覧`)
        await expect(page.getByRole("region", { name: "プロフィール" })).toContainText(newName);
        await expect(page.locator("[aria-label='ログインユーザー']")).toContainText(newName);
     })
})