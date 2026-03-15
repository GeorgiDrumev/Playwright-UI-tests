import { Page } from "@playwright/test";

export class WaitUtils {
  constructor(private page: Page) {}

  public async waitForDomContentLoaded() {
    await this.page.waitForLoadState("domcontentloaded");
  }

  public async waitForNetworkIdle() {
    await this.page.waitForLoadState("networkidle");
  }
}
