import {test, expect} from "@playwright/test"
import { UserName } from "../prisma/fixtures/user"
import { gotoAndCreatePostAsDraft, gotoAndCreatePostAsPublish } from "./studyPostUtil"
import { url } from "./util"

test.describe("投稿記事一覧ページ", () => {
    const path = "/my/posts"
    const userName: UserName = "TaroYamada"

    test("新規記事を下書き保存すると、投稿記事一覧に記事が追加される", async({ page }) => {
        const title = "下書き投稿一覧表示テスト!";
        await gotoAndCreatePostAsDraft({ page, title, userName })
        await page.goto(url(path))
        await expect(page.getByText(title)).toBeVisible();
    })
    
    test("新規記事を公開保存すると、投稿記事一覧に記事が追加される", async ({ page }) => { 
        const title = "公開投稿一覧表示テスト!"
        await gotoAndCreatePostAsPublish({ page, title, userName })
        await page.goto(url(path))
        await expect(page.getByText(title)).toBeVisible();
    })
})