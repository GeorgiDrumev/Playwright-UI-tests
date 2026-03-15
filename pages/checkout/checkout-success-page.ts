import { Page, Locator, expect } from "@playwright/test";
import { WaitUtils } from "@/utils/wait-utils";
import { BasePage } from "@/pages/base-page";

export class CheckoutSuccessPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly waitUtils: WaitUtils;
  private readonly completeHeader: Locator;
  private readonly completeText: Locator;
  private readonly backHomeButton: Locator;
  readonly url = "https://www.saucedemo.com/checkout-complete.html";
  readonly screenshotFolder = "checkout";

  constructor(page: Page) {
    super(page);
    this.waitUtils = new WaitUtils(page);
    this.pageTitle = page.locator(".title");
    this.completeHeader = page.locator(".complete-header");
    this.completeText = page.locator(".complete-text");
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  public async clickBackHome() {
    await this.backHomeButton.click();
  }

  public async verifyPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText("Checkout: Complete!");
  }

  public async verifyOrderComplete() {
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toHaveText("Thank you for your order!");
  }
}
