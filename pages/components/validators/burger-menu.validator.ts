import { Page, expect } from "@playwright/test";

export class BurgerMenuValidator {
  private readonly closeButton: ReturnType<Page["locator"]>;
  private readonly allItemsLink: ReturnType<Page["locator"]>;
  private readonly aboutLink: ReturnType<Page["locator"]>;
  private readonly logoutLink: ReturnType<Page["locator"]>;
  private readonly resetAppLink: ReturnType<Page["locator"]>;

  constructor(private readonly page: Page) {
    this.closeButton = page.locator("#react-burger-cross-btn");
    this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
    this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.resetAppLink = page.locator('[data-test="reset-sidebar-link"]');
  }

  async expectMenuOpen() {
    await expect.soft(this.closeButton).toBeVisible();
    await expect.soft(this.allItemsLink).toBeVisible();
    await expect.soft(this.logoutLink).toBeVisible();
  }

  async expectMenuClosed() {
    await expect(this.closeButton).not.toBeVisible();
  }

  async expectAllMenuItemsVisible() {
    await expect.soft(this.allItemsLink).toBeVisible();
    await expect.soft(this.aboutLink).toBeVisible();
    await expect.soft(this.logoutLink).toBeVisible();
    await expect.soft(this.resetAppLink).toBeVisible();
  }
}
