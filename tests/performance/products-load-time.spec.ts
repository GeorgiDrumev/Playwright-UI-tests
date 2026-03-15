import { test } from "@/fixtures/base-unauth-ui-test";
import { PerformanceUtils } from "@/utils/performance-utils";

test.describe("Products Page Performance Tests", () => {
  let performance: PerformanceUtils;

  test.beforeEach(async ({ loginPage }) => {
    performance = new PerformanceUtils();
    await loginPage.goto();
  });

  test(
    "should load products page within 2 seconds after login",
    { tag: ["@performance", "@products"] },
    async ({ loginPage, productsPage }) => {
      performance.startTimer();

      await loginPage.login();
      await productsPage.verifyPageLoaded();

      performance.assertLoadTime(2000, "Products page load after login");
    },
  );
});
