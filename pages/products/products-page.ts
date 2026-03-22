import { Page, Locator } from "@playwright/test";
import { WaitUtils } from "@utils/wait-utils";
import { SortOption } from "../../types/sort-types";
import { BasePage } from "@pages/base-page";
import { BurgerMenu } from "@pages/components/burger-menu";
import { ROUTES } from "@utils/routes";
import { ProductsValidator } from "@pages/products/validators/products.validator";

export class ProductsPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly inventoryItems: Locator;
  private readonly sortDropdown: Locator;
  private readonly cartBadge: Locator;
  private readonly cartIcon: Locator;
  readonly waitUtils: WaitUtils;
  readonly url = ROUTES.products;
  readonly screenshotFolder = "products";
  readonly burgerMenu: BurgerMenu;
  readonly validator: ProductsValidator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".title");
    this.inventoryItems = page.locator(".inventory_item");
    this.sortDropdown = page.locator(".product_sort_container");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartIcon = page.locator(".shopping_cart_link");
    this.waitUtils = new WaitUtils(page);
    this.burgerMenu = new BurgerMenu(page);
    this.validator = new ProductsValidator(page);
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
}
