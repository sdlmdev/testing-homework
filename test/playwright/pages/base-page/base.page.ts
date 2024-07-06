import { Page, Locator } from '@playwright/test';
import { BASE_URL } from '../../constants';
import { expect } from '@playwright/test';

class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string, baseUrl: string = BASE_URL) {
    console.log(`Navigating to ${baseUrl + url}`);
    await this.page.goto(baseUrl + url);
  }

  async setViewportSize(size: { width: number, height: number }) {
    console.log(`Setting viewport size to ${size.width}x${size.height}`);
    await this.page.setViewportSize(size);
  }

  async screenshot(options: { path: string }) {
    console.log(`Taking screenshot to ${options.path}`);
    await this.page.screenshot(options);
  }

  async toHaveScreenshot(options: { fullPage: boolean, threshold: number }) {
    console.log(`Comparing screenshot with options ${options}`);
    await expect(this.page).toHaveScreenshot();
  }
}

export { BasePage };