import { Page, Locator } from "@playwright/test";
import { BasePage } from "@pages/base-page";
import { ROUTES } from "@utils/routes";
import { CheckoutSuccessValidator } from "@pages/checkout/validators/checkout-success.validator";

export class CheckoutSuccessPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly backHomeButton: Locator;
  readonly url = ROUTES.checkoutComplete;
  readonly screenshotFolder = "checkout";
  readonly validator: CheckoutSuccessValidator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".title");
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.validator = new CheckoutSuccessValidator(page);
  }

  public async clickBackHome() {
    await this.backHomeButton.click();
  }
}
