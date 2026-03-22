import { Page, expect } from "@playwright/test";
import type { ProductData } from "@dtos/product.dto";
import { SortOrder } from "../../../types/sort-types";

export class ProductsValidator {
  private readonly pageTitle: ReturnType<Page["locator"]>;
  private readonly inventoryItems: ReturnType<Page["locator"]>;
  private readonly cartBadge: ReturnType<Page["locator"]>;

  constructor(private readonly page: Page) {
    this.pageTitle = page.locator(".title");
    this.inventoryItems = page.locator(".inventory_item");
    this.cartBadge = page.locator(".shopping_cart_badge");
  }

  async expectPageLoaded() {
    await expect.soft(this.pageTitle).toBeVisible();
    await expect.soft(this.pageTitle).toHaveText("Products");
  }

  async expectProductsDisplayed() {
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async expectProductCount(expectedCount: number) {
    await expect(this.inventoryItems).toHaveCount(expectedCount);
  }

  async expectProductNames(expectedProducts: ProductData[]) {
    for (const product of expectedProducts) {
      await expect(
        this.page
          .locator(".inventory_item_name")
          .filter({ hasText: product.name }),
      ).toBeVisible();
    }
  }

  async expectCartBadgeCount(expectedCount: string) {
    await expect(this.cartBadge).toHaveText(expectedCount);
  }

  async expectProductInCart(productName: string) {
    await expect(
      this.inventoryItems
        .filter({ hasText: productName })
        .locator('[data-test^="remove"]'),
    ).toBeVisible();
  }

  async expectCartBadgeNotVisible() {
    await expect(this.cartBadge).not.toBeVisible();
  }

  async expectProductsSortedByName(
    expectedProducts: ProductData[],
    order: SortOrder,
  ) {
    const sorted = expectedProducts.map((p) => p.name).sort();
    const expectedOrder =
      order === SortOrder.ASCENDING ? sorted : [...sorted].reverse();
    await expect(this.page.locator(".inventory_item_name")).toHaveText(
      expectedOrder,
    );
  }

  async expectProductsSortedByPrice(
    expectedProducts: ProductData[],
    order: SortOrder,
  ) {
    const expectedPrices = expectedProducts
      .map((p) => p.price)
      .sort((a, b) => (order === SortOrder.ASCENDING ? a - b : b - a))
      .map((p) => `$${p.toFixed(2)}`);
    await expect(this.page.locator(".inventory_item_price")).toHaveText(
      expectedPrices,
    );
  }
}
