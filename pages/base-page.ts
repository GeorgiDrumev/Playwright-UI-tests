import { Page } from "@playwright/test";
import { ScreenshotUtils, ScreenshotConfig } from "@utils/screenshot-utils";

export abstract class BasePage {
  readonly page: Page;
  abstract readonly url: string;
  abstract readonly screenshotFolder: string;
  private screenshotUtils: ScreenshotUtils;

  constructor(page: Page, screenshotConfig?: ScreenshotConfig) {
    this.page = page;
    this.screenshotUtils = new ScreenshotUtils(page, screenshotConfig);
  }

  public async goto() {
    await this.page.goto(this.url);
  }

  public async compareScreenshot(
    name: string,
    deviation?: number,
  ): Promise<void> {
    await this.screenshotUtils.compareScreenshot(
      name,
      this.screenshotFolder,
      deviation,
    );
  }
}
