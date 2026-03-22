import { Page, expect } from "@playwright/test";

export class CheckoutSuccessValidator {
  private readonly pageTitle: ReturnType<Page["locator"]>;
  private readonly completeHeader: ReturnType<Page["locator"]>;

  constructor(private readonly page: Page) {
    this.pageTitle = page.locator(".title");
    this.completeHeader = page.locator(".complete-header");
  }

  async expectPageLoaded() {
    await expect.soft(this.pageTitle).toBeVisible();
    await expect.soft(this.pageTitle).toHaveText("Checkout: Complete!");
  }

  async expectOrderComplete() {
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toHaveText("Thank you for your order!");
  }
}
