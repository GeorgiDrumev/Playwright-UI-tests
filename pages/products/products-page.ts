import { Page, Locator, expect } from "@playwright/test";
import { WaitUtils } from "@/utils/wait-utils";
import { SortOption, SortOrder } from "@/types/sort-types";
import { ProductData } from "@data/test-data/product-data";
import { BasePage } from "@/pages/base-page";
import { BurgerMenu } from "@/pages/components/burger-menu";

export class ProductsPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly inventoryItems: Locator;
  private readonly sortDropdown: Locator;
  private readonly cartBadge: Locator;
  private readonly cartIcon: Locator;
  readonly waitUtils: WaitUtils;
  readonly url = "https://www.saucedemo.com/inventory.html";
  readonly screenshotFolder = "products";
  readonly burgerMenu: BurgerMenu;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".title");
    this.inventoryItems = page.locator(".inventory_item");
    this.sortDropdown = page.locator(".product_sort_container");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartIcon = page.locator(".shopping_cart_link");
    this.waitUtils = new WaitUtils(page);
    this.burgerMenu = new BurgerMenu(page);
  }

  public async goto() {
    await super.goto();
  }

  public async getInventoryItemsCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  public async sortProducts(option: SortOption) {
    await this.sortDropdown.selectOption(option);
    await this.waitUtils.waitForDomContentLoaded();
  }

  public async getProductNames(): Promise<string[]> {
    const names = await this.page
      .locator(".inventory_item_name")
      .allTextContents();
    return names;
  }

  public async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.page
      .locator(".inventory_item_price")
      .allTextContents();
    return priceTexts.map((price) => parseFloat(price.replace("$", "")));
  }

  public async addProductToCart(productName: string) {
    await this.inventoryItems
      .filter({ hasText: productName })
      .locator('[data-test^="add-to-cart"]')
      .click();
  }

  public async addProductToCartByIndex(index: number) {
    await this.inventoryItems
      .nth(index)
      .locator('[data-test^="add-to-cart"]')
      .click();
  }

  public async removeProductFromCart(productName: string) {
    await this.inventoryItems
      .filter({ hasText: productName })
      .locator('[data-test^="remove"]')
      .click();
  }

  public async removeProductFromCartByIndex(index: number) {
    await this.inventoryItems
      .nth(index)
      .locator('[data-test^="remove"]')
      .click();
  }

  public async getCartBadgeCount(): Promise<string> {
    if (await this.cartBadge.isVisible()) {
      return (await this.cartBadge.textContent()) || "0";
    }
    return "0";
  }

  public async navigateToCart() {
    await this.cartIcon.click();
  }

  public async navigateToProductDetails(productName: string) {
    await this.page
      .locator(`.inventory_item_name:text("${productName}")`)
      .click();
  }

  public async navigateToProductDetailsByIndex(index: number) {
    await this.inventoryItems
      .nth(index)
      .locator(".inventory_item_name")
      .click();
  }

  public async isProductInCart(productName: string): Promise<boolean> {
    return await this.inventoryItems
      .filter({ hasText: productName })
      .locator('[data-test^="remove"]')
      .isVisible();
  }

  public async verifyPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText("Products");
  }

  public async verifyProductsAreDisplayed() {
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  public async verifyCartBadgeCount(expectedCount: string) {
    await expect(this.cartBadge).toHaveText(expectedCount);
  }

  public async verifyProductCount(expectedCount: number) {
    await expect(this.inventoryItems).toHaveCount(expectedCount);
  }

  public async verifyProductNames(expectedProducts: ProductData[]) {
    for (const product of expectedProducts) {
      await expect(
        this.page
          .locator(".inventory_item_name")
          .filter({ hasText: product.name }),
      ).toBeVisible();
    }
  }

  public async verifyProductIsInCart(productName: string) {
    await expect(
      this.inventoryItems
        .filter({ hasText: productName })
        .locator('[data-test^="remove"]'),
    ).toBeVisible();
  }

  public async verifyCartBadgeNotVisible() {
    await expect(this.cartBadge).not.toBeVisible();
  }

  public async verifyProductsSortedByName(
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

  public async verifyProductsSortedByPrice(
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
