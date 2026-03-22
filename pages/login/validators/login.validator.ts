import { Page, expect } from "@playwright/test";

export class LoginValidator {
  private readonly loginButton: ReturnType<Page["locator"]>;
  private readonly usernameInput: ReturnType<Page["locator"]>;
  private readonly passwordInput: ReturnType<Page["locator"]>;
  private readonly errorMessage: ReturnType<Page["locator"]>;

  constructor(private readonly page: Page) {
    this.loginButton = page.locator('[data-test="login-button"]');
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async expectPageLoaded() {
    await expect.soft(this.loginButton).toBeVisible();
    await expect.soft(this.usernameInput).toBeVisible();
    await expect.soft(this.passwordInput).toBeVisible();
  }

  async expectErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}
