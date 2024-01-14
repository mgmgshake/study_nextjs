import { test, expect} from "@playwright/test"
import { login, url } from "./util";

test("他人の記事にLikeできる", async ({ page }) => { 
    await page.goto(url("/login"));
    await login({ page, userName: "TaroYamada" })
    await expect(page).toHaveURL(url("/"));

    await page.goto(url("/posts/10"))
    const buttonLike = page.getByRole("button", { name: "Like" })
    const buttonText = page.getByTestId("likeStatus")

    await expect(buttonLike).toBeEnabled()
    await expect(buttonLike).toHaveText("0")
    await expect(buttonText).toHaveText("Like")
    await buttonLike.click()

    await expect(buttonLike).toHaveText("1")
    await expect(buttonText).toHaveText("Liked")
})

test("自分の記事にLikeできない", async ({ page }) => {
    await page.goto(url("/login"))
    await login({ page, userName: "TaroYamada" })
    await expect(page).toHaveURL(url("/"))

    await page.goto(url("/posts/90"))
    const buttonLike = page.getByRole("button", { name: "Like" })
    const buttonText = page.getByTestId("likeStatus")

    await expect(buttonLike).toBeDisabled()
    await expect(buttonText).not.toHaveText("Like")
 })