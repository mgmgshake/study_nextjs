import { expect, test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { UserName } from "../prisma/fixtures/user";
import { gotoAndCreatePostAsPublish, gotoEditPostPage } from "./postUtil";
import { login, url } from "./util";
import { gotoEditpostPage } from "./studyPostUtil";

test.describe("トップページ", () => { 
    const path = "/";
    const userName: UserName = "TaroYamada";

    test("新規記事を公開保存すると、最新投稿一覧に表示される", async ({ page }) => { 
        const title = "公開投稿/最新投稿一覧表示テスト";
        await gotoAndCreatePostAsPublish({ page, title, userName });
        await page.goto(url(path));
        await expect(page.getByText(title)).toBeVisible();
    })

    test("公開記事を非公開にすると、最新投稿一覧は非表示になる", async ({ page }) => { 
        const title = "公開取り消し/最新投稿一覧表示テスト";
        await gotoAndCreatePostAsPublish({ page, title, userName })
        await gotoEditpostPage({ page, title })
        await page.getByText("公開ステータス").click();
        await page.getByRole("button", { name: "下書き保存する" }).click();
        await page.waitForNavigation();
        await expect(page).toHaveTitle(title);
        await page.goto(url(path));
        await expect(page.getByText(title)).not.toBeVisible();
    })
})