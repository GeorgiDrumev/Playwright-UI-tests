import { Page, Locator, expect } from "@playwright/test";
import { ProductData } from "@data/test-data/product-data";
import { BasePage } from "@/pages/base-page";

export class ProductDetailsPage extends BasePage {
  private readonly productName: Locator;
  private readonly productDescription: Locator;
  private readonly productPrice: Locator;
  private readonly addToCartButton: Locator;
  private readonly removeButton: Locator;
  private readonly backButton: Locator;
  readonly url = "https://www.saucedemo.com/inventory-item.html";
  readonly screenshotFolder = "product-details";

  constructor(page: Page) {
    super(page);
    this.productName = page.locator(".inventory_details_name");
    this.productDescription = page.locator(".inventory_details_desc");
    this.productPrice = page.locator(".inventory_details_price");
    this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
    this.removeButton = page.locator('[data-test^="remove"]');
    this.backButton = page.locator('[data-test="back-to-products"]');
  }

  public async goto(productId?: number): Promise<void> {
    if (productId !== undefined) {
      await this.page.goto(`${this.url}?id=${productId}`);
    } else {
      await super.goto();
    }
  }

  public async addToCart() {
    await this.addToCartButton.click();
  }

  public async removeFromCart() {
    await this.removeButton.click();
  }

  public async clickBackButton() {
    await this.backButton.click();
  }

  public async verifyProductDetails(expectedProduct: ProductData) {
    await expect(this.productName).toHaveText(expectedProduct.name);
    await expect(this.productDescription).toHaveText(
      expectedProduct.description,
    );
    await expect(this.productPrice).toHaveText(`$${expectedProduct.price}`);
  }

  public async verifyProductIsInCart() {
    await expect(this.removeButton).toBeVisible();
  }

  public async verifyProductNotInCart() {
    await expect(this.removeButton).not.toBeVisible();
  }

  public async verifyPageNotLoaded() {
    await expect(this.productName).not.toBeVisible();
  }
}
