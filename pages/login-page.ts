import { Page, Locator, expect } from "@playwright/test";
import { testUsers, UserCredentials } from "@data/test-data/user-data";
import { BasePage } from "@/pages/base-page";

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  readonly url = "https://www.saucedemo.com/";
  readonly screenshotFolder = "login";

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  public async login(credentials: UserCredentials = testUsers.standardUser) {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
  }

  public async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) || "";
  }

  public async verifyPageLoaded() {
    await Promise.all([
      expect(this.loginButton).toBeVisible(),
      expect(this.usernameInput).toBeVisible(),
      expect(this.passwordInput).toBeVisible(),
    ]);
  }

  public async verifyErrorMessageIsDisplayed(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    const actualMessage = await this.getErrorMessage();
    expect(actualMessage).toContain(expectedMessage);
  }
}
