import { Page, Locator } from "@playwright/test";
import { WaitUtils } from "@utils/wait-utils";
import { BurgerMenuValidator } from "@pages/components/validators/burger-menu.validator";

export class BurgerMenu {
  private readonly page: Page;
  private readonly menuButton: Locator;
  private readonly closeButton: Locator;
  private readonly allItemsLink: Locator;
  private readonly aboutLink: Locator;
  private readonly logoutLink: Locator;
  private readonly resetAppLink: Locator;
  private readonly menuOverlay: Locator;
  private readonly waitUtils: WaitUtils;
  readonly validator: BurgerMenuValidator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator("#react-burger-menu-btn");
    this.closeButton = page.locator("#react-burger-cross-btn");
    this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
    this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.resetAppLink = page.locator('[data-test="reset-sidebar-link"]');
    this.menuOverlay = page.locator(".bm-overlay");
    this.waitUtils = new WaitUtils(page);
    this.validator = new BurgerMenuValidator(page);
  }

  public async open() {
    await this.waitUtils.waitForDomContentLoaded();
    await this.menuButton.click();
    await this.allItemsLink.waitFor({ state: "visible" });
  }

  public async close() {
    await this.closeButton.click();
  }

  public async clickAllItems() {
    await this.allItemsLink.click();
  }

  public async clickAbout() {
    await this.aboutLink.click();
  }

  public async clickLogout() {
    await this.logoutLink.click();
  }

  public async clickResetApp() {
    await this.resetAppLink.click();
  }
}
