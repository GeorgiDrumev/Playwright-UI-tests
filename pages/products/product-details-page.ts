import { Page, Locator } from "@playwright/test";
import { BasePage } from "@pages/base-page";
import { ROUTES } from "@utils/routes";
import { ProductDetailsValidator } from "@pages/products/validators/product-details.validator";

export class ProductDetailsPage extends BasePage {
  private readonly productName: Locator;
  private readonly productDescription: Locator;
  private readonly productPrice: Locator;
  private readonly addToCartButton: Locator;
  private readonly removeButton: Locator;
  private readonly backButton: Locator;
  readonly url = ROUTES.productDetails;
  readonly screenshotFolder = "product-details";
  readonly validator: ProductDetailsValidator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator(".inventory_details_name");
    this.productDescription = page.locator(".inventory_details_desc");
    this.productPrice = page.locator(".inventory_details_price");
    this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
    this.removeButton = page.locator('[data-test^="remove"]');
    this.backButton = page.locator('[data-test="back-to-products"]');
    this.validator = new ProductDetailsValidator(page);
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
}
