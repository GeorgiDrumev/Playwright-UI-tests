import { Page, Locator } from "@playwright/test";
import { BasePage } from "@pages/base-page";
import { ROUTES } from "@utils/routes";
import { CheckoutDetailsValidator } from "@pages/checkout/validators/checkout-details.validator";

export class CheckoutDetailsPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly cartItems: Locator;
  private readonly finishButton: Locator;
  private readonly cancelButton: Locator;
  readonly url = ROUTES.checkoutStep2;
  readonly screenshotFolder = "checkout";
  readonly validator: CheckoutDetailsValidator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".title");
    this.cartItems = page.locator(".cart_item");
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.validator = new CheckoutDetailsValidator(page);
  }

  public async clickFinish() {
    await this.finishButton.click();
  }

  public async clickCancel() {
    await this.cancelButton.click();
  }
}
