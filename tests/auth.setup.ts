import { test as setup } from "@playwright/test";
import { testUsers } from "@data/test-data/user-data";
import path from "path";

const authFile = path.join(".auth", "state.json");

setup("save session as standard_user", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page
    .locator('[data-test="username"]')
    .fill(testUsers.standardUser.username);
  await page
    .locator('[data-test="password"]')
    .fill(testUsers.standardUser.password);
  await page.locator('[data-test="login-button"]').click();
  await page.waitForURL("**/inventory.html");

  await page.context().storageState({ path: authFile });
});
