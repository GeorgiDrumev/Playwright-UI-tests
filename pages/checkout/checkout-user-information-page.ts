import { Page, Locator } from "@playwright/test";
import { BasePage } from "@pages/base-page";
import { ROUTES } from "@utils/routes";
import type { CheckoutInformation } from "@dtos/checkout.dto";
import { CheckoutUserInformationValidator } from "@pages/checkout/validators/checkout-user-information.validator";

export class CheckoutUserInformationPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly cancelButton: Locator;
  private readonly errorMessage: Locator;
  readonly url = ROUTES.checkoutStep1;
  readonly screenshotFolder = "checkout";
  readonly validator: CheckoutUserInformationValidator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".title");
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.validator = new CheckoutUserInformationValidator(page);
  }

  public async fillCheckoutInformation(info: CheckoutInformation) {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
  }

  public async clickContinue() {
    await this.continueButton.click();
  }

  public async clickCancel() {
    await this.cancelButton.click();
  }
}
