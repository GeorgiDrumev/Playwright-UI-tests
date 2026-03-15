import { test } from "@/fixtures/base-unauth-ui-test";
import { invalidCredentials } from "@data/test-data/user-data";

test.describe("Login Page Visual Tests", () => {
  test(
    "should match login page",
    { tag: ["@authentication", "@visual"] },
    async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.compareScreenshot("login-page");
    },
  );

  test(
    "should match login page with error",
    { tag: ["@authentication", "@visual"] },
    async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.login(invalidCredentials.invalidUser);
      await loginPage.compareScreenshot("login-page-with-error");
    },
  );
});
