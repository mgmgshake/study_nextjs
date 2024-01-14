import { test } from "@playwright/test"
import { UserName } from "../prisma/fixtures/user";
import { gotoAndCreatePostAsDraft, gotoAndCreatePostAsPublish } from "./studyPostUtil";

test.describe("新規投稿ページ", () => { 
    const path = "/my/posts/create";
    const userName: UserName = "TaroYamada";

    test("新規記事を下書き保存できる", async ({page}) => {
        const title = "下書き投稿テスト";
        await gotoAndCreatePostAsDraft({page, title, userName})
    })

    test("新規記事を公開できる", async ({ page }) => { 
        const title = "公開投稿テスト";
        await gotoAndCreatePostAsPublish({page, title, userName})
    })
})