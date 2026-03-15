import { Page, Locator, expect } from "@playwright/test";
import { WaitUtils } from "@/utils/wait-utils";
import { CheckoutUtils } from "@/utils/checkout-utils";
import { BasePage } from "@/pages/base-page";
import { ProductData } from "@data/test-data/product-data";

export class CheckoutDetailsPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly waitUtils: WaitUtils;
  private readonly cartItems: Locator;
  private readonly subtotalLabel: Locator;
  private readonly taxLabel: Locator;
  private readonly totalLabel: Locator;
  private readonly finishButton: Locator;
  private readonly cancelButton: Locator;
  readonly url = "https://www.saucedemo.com/checkout-step-two.html";
  readonly screenshotFolder = "checkout";

  constructor(page: Page) {
    super(page);
    this.waitUtils = new WaitUtils(page);
    this.pageTitle = page.locator(".title");
    this.cartItems = page.locator(".cart_item");
    this.subtotalLabel = page.locator(".summary_subtotal_label");
    this.taxLabel = page.locator(".summary_tax_label");
    this.totalLabel = page.locator(".summary_total_label");
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  public async clickFinish() {
    await this.finishButton.click();
  }

  public async clickCancel() {
    await this.cancelButton.click();
  }

  public async verifyPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText("Checkout: Overview");
  }

  public async verifyItemCount(expectedCount: number) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  public async verifyOrderSummaryDisplayed() {
    await expect(this.subtotalLabel).toBeVisible();
    await expect(this.taxLabel).toBeVisible();
    await expect(this.totalLabel).toBeVisible();
  }

  public async verifyTotalsCalculation(products: ProductData[]) {
    const expectedSubtotal = CheckoutUtils.calculateSubtotalAmount(products);
    const expectedTax = CheckoutUtils.calculateTaxAmount(expectedSubtotal);
    const expectedTotal = CheckoutUtils.calculateTotalAmount(
      expectedSubtotal,
      expectedTax,
    );

    const subtotalText = (await this.subtotalLabel.textContent()) || "";
    const taxText = (await this.taxLabel.textContent()) || "";
    const totalText = (await this.totalLabel.textContent()) || "";

    const actualSubtotal = CheckoutUtils.parsePrice(
      subtotalText,
      "Item total: $",
    );
    const actualTax = CheckoutUtils.parsePrice(taxText, "Tax: $");
    const actualTotal = CheckoutUtils.parsePrice(totalText, "Total: $");

    expect(actualSubtotal).toBe(expectedSubtotal);
    expect(actualTax).toBe(expectedTax);
    expect(actualTotal).toBe(expectedTotal);
  }
}
