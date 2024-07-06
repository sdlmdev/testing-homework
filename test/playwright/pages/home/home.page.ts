import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base-page/base.page';

class HomePage extends BasePage {
  readonly page: Page;
  readonly homePage: Locator;
  readonly welcomeMessage: Locator;
  readonly stabilitySection: Locator;
  readonly comfortSection: Locator;
  readonly designSection: Locator;
  readonly textSection: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.homePage = page.locator('.Home');
    this.welcomeMessage = page.locator('.display-3');
    this.stabilitySection = page.locator('.row.mb-4 .col-12.col-md-4.bg-light.py-3').nth(0);
    this.comfortSection = page.locator('.row.mb-4 .col-12.col-md-4.bg-light.py-3').nth(1);
    this.designSection = page.locator('.row.mb-4 .col-12.col-md-4.bg-light.py-3').nth(2);
    this.textSection = page.locator('.fs-1');
  }

  async checkHomePageVisibility() {
    await expect(this.homePage).toBeVisible();
  }

  async checkWelcomeMessageVisibility() {
    await expect(this.welcomeMessage).toBeVisible();
  }

  async checkStabilitySectionVisibility() {
    await expect(this.stabilitySection).toBeVisible();
  }

  async checkComfortSectionVisibility() {
    await expect(this.comfortSection).toBeVisible();
  }

  async checkDesignSectionVisibility() {
    await expect(this.designSection).toBeVisible();
  }

  async checkTextSectionVisibility() {
    await expect(this.textSection).toBeVisible();
  }
}

export { HomePage };