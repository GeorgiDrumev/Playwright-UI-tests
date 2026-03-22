import { Page, expect } from "@playwright/test";

export class CheckoutUserInformationValidator {
  private readonly pageTitle: ReturnType<Page["locator"]>;
  private readonly errorMessage: ReturnType<Page["locator"]>;

  constructor(private readonly page: Page) {
    this.pageTitle = page.locator(".title");
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async expectPageLoaded() {
    await expect.soft(this.pageTitle).toBeVisible();
    await expect.soft(this.pageTitle).toHaveText("Checkout: Your Information");
  }

  async expectErrorMessageDisplayed(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}
