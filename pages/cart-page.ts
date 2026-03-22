import { Page, Locator } from "@playwright/test";
import { BasePage } from "@pages/base-page";
import { BurgerMenu } from "@pages/components/burger-menu";
import { ROUTES } from "@utils/routes";
import { CartValidator } from "@pages/cart/validators/cart.validator";

export class CartPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly cartItems: Locator;
  private readonly itemName: Locator;
  private readonly removeButton: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly checkoutButton: Locator;
  readonly burgerMenu: BurgerMenu;
  readonly url = ROUTES.cart;
  readonly screenshotFolder = "cart";
  readonly validator: CartValidator;

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
    this.validator = new CartValidator(page);
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
}
