import { Page, Locator } from "@playwright/test";
import { testUsers } from "@data/test-data/user-data";
import type { UserCredentials } from "@dtos/user.dto";
import { BasePage } from "@pages/base-page";
import { ROUTES } from "@utils/routes";
import { LoginValidator } from "@pages/login/validators/login.validator";

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  readonly url = ROUTES.login;
  readonly screenshotFolder = "login";
  readonly validator: LoginValidator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.validator = new LoginValidator(page);
  }

  public async login(credentials: UserCredentials = testUsers.standardUser) {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
  }
}
