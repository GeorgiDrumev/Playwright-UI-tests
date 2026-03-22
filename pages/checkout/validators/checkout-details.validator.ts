import { Page, expect } from "@playwright/test";
import type { ProductData } from "@dtos/product.dto";
import { CheckoutUtils } from "@utils/checkout-utils";

export class CheckoutDetailsValidator {
  private readonly pageTitle: ReturnType<Page["locator"]>;
  private readonly cartItems: ReturnType<Page["locator"]>;
  private readonly subtotalLabel: ReturnType<Page["locator"]>;
  private readonly taxLabel: ReturnType<Page["locator"]>;
  private readonly totalLabel: ReturnType<Page["locator"]>;

  constructor(private readonly page: Page) {
    this.pageTitle = page.locator(".title");
    this.cartItems = page.locator(".cart_item");
    this.subtotalLabel = page.locator(".summary_subtotal_label");
    this.taxLabel = page.locator(".summary_tax_label");
    this.totalLabel = page.locator(".summary_total_label");
  }

  async expectPageLoaded() {
    await expect.soft(this.pageTitle).toBeVisible();
    await expect.soft(this.pageTitle).toHaveText("Checkout: Overview");
  }

  async expectItemCount(expectedCount: number) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async expectOrderSummaryDisplayed() {
    await expect.soft(this.subtotalLabel).toBeVisible();
    await expect.soft(this.taxLabel).toBeVisible();
    await expect.soft(this.totalLabel).toBeVisible();
  }

  async expectTotalsCalculation(products: ProductData[]) {
    const expectedSubtotal = CheckoutUtils.calculateSubtotalAmount(products);
    const expectedTax = CheckoutUtils.calculateTaxAmount(expectedSubtotal);
    const expectedTotal = CheckoutUtils.calculateTotalAmount(
      expectedSubtotal,
      expectedTax,
    );

    const subtotalText = (await this.subtotalLabel.textContent()) || "";
    const taxText = (await this.taxLabel.textContent()) || "";
    const totalText = (await this.totalLabel.textContent()) || "";

    expect
      .soft(CheckoutUtils.parsePrice(subtotalText, "Item total: $"))
      .toBe(expectedSubtotal);
    expect.soft(CheckoutUtils.parsePrice(taxText, "Tax: $")).toBe(expectedTax);
    expect
      .soft(CheckoutUtils.parsePrice(totalText, "Total: $"))
      .toBe(expectedTotal);
  }
}
