import { Page, expect } from "@playwright/test";

export class CartValidator {
  private readonly pageTitle: ReturnType<Page["locator"]>;
  private readonly cartItems: ReturnType<Page["locator"]>;
  private readonly checkoutButton: ReturnType<Page["locator"]>;

  constructor(private readonly page: Page) {
    this.pageTitle = page.locator(".title");
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectPageLoaded() {
    await expect.soft(this.pageTitle).toBeVisible();
    await expect.soft(this.pageTitle).toHaveText("Your Cart");
  }

  async expectCartItemCount(expectedCount: number) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async expectCartEmpty() {
    await expect(this.cartItems).toHaveCount(0);
  }

  async expectProductInCart(productName: string) {
    await expect(this.cartItems.filter({ hasText: productName })).toBeVisible();
  }

  async expectProductsInCart(productNames: string[]) {
    for (const name of productNames) {
      await expect(this.cartItems.filter({ hasText: name })).toBeVisible();
    }
  }

  async expectCheckoutButtonNotVisible() {
    await expect(this.checkoutButton).not.toBeVisible();
  }
}
