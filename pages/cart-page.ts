import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "@/pages/base-page";
import { BurgerMenu } from "@/pages/components/burger-menu";

export class CartPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly cartItems: Locator;
  private readonly itemName: Locator;
  private readonly removeButton: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly checkoutButton: Locator;
  readonly burgerMenu: BurgerMenu;
  readonly url = "https://www.saucedemo.com/cart.html";
  readonly screenshotFolder = "cart";

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".title");
    this.cartItems = page.locator(".cart_item");
    this.itemName = page.locator(".inventory_item_name");
    this.removeButton = page.locator('[data-test^="remove"]');
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]',
    );
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.burgerMenu = new BurgerMenu(page);
  }

  public async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  public async getCartItemNames(): Promise<string[]> {
    return await this.itemName.allTextContents();
  }

  public async removeItemByName(productName: string) {
    await this.cartItems
      .filter({ hasText: productName })
      .locator(this.removeButton)
      .click();
  }

  public async removeItemByIndex(index: number) {
    await this.cartItems.nth(index).locator(this.removeButton).click();
  }

  public async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  public async clickCheckout() {
    await this.checkoutButton.click();
  }

  public async clickItemByName(productName: string) {
    await this.cartItems
      .filter({ hasText: productName })
      .locator(this.itemName)
      .click();
  }

  public async verifyPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText("Your Cart");
  }

  public async verifyCartItemCount(expectedCount: number) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  public async verifyCartIsEmpty() {
    await expect(this.cartItems).toHaveCount(0);
  }

  public async verifyProductInCart(productName: string) {
    await expect(this.cartItems.filter({ hasText: productName })).toBeVisible();
  }

  public async verifyProductsInCart(productNames: string[]) {
    for (const name of productNames) {
      await expect(this.cartItems.filter({ hasText: name })).toBeVisible();
    }
  }

  public async verifyCheckoutButtonNotVisible() {
    await expect(this.checkoutButton).not.toBeVisible();
  }
}
