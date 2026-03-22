import { Page, expect } from "@playwright/test";
import type { ProductData } from "@dtos/product.dto";

export class ProductDetailsValidator {
  private readonly productName: ReturnType<Page["locator"]>;
  private readonly productDescription: ReturnType<Page["locator"]>;
  private readonly productPrice: ReturnType<Page["locator"]>;
  private readonly removeButton: ReturnType<Page["locator"]>;

  constructor(private readonly page: Page) {
    this.productName = page.locator(".inventory_details_name");
    this.productDescription = page.locator(".inventory_details_desc");
    this.productPrice = page.locator(".inventory_details_price");
    this.removeButton = page.locator('[data-test^="remove"]');
  }

  async expectProductDetails(expectedProduct: ProductData) {
    await expect.soft(this.productName).toHaveText(expectedProduct.name);
    await expect
      .soft(this.productDescription)
      .toHaveText(expectedProduct.description);
    await expect
      .soft(this.productPrice)
      .toHaveText(`$${expectedProduct.price}`);
  }

  async expectProductInCart() {
    await expect(this.removeButton).toBeVisible();
  }

  async expectProductNotInCart() {
    await expect(this.removeButton).not.toBeVisible();
  }

  async expectPageNotLoaded() {
    await expect(this.productName).not.toBeVisible();
  }
}
