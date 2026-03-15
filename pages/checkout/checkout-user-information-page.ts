import { Page, Locator, expect } from "@playwright/test";
import { WaitUtils } from "@/utils/wait-utils";
import { BasePage } from "@/pages/base-page";
import { CheckoutInformation } from "@data/test-data/checkout-data";

export class CheckoutUserInformationPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly waitUtils: WaitUtils;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly cancelButton: Locator;
  private readonly errorMessage: Locator;
  readonly url = "https://www.saucedemo.com/checkout-step-one.html";
  readonly screenshotFolder = "checkout";

  constructor(page: Page) {
    super(page);
    this.waitUtils = new WaitUtils(page);
    this.pageTitle = page.locator(".title");
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
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

  public async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) || "";
  }

  public async verifyPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText("Checkout: Your Information");
  }

  public async verifyErrorMessageDisplayed(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    const actualMessage = await this.getErrorMessage();
    expect(actualMessage).toContain(expectedMessage);
  }
}
