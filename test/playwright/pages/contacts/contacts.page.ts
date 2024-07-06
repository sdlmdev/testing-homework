import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base-page/base.page';

class ContactsPage extends BasePage {
  readonly page: Page;
  readonly contactsPage: Locator;
  readonly pageTitle: Locator;
  readonly firstParagraph: Locator;
  readonly secondParagraph: Locator;
  readonly thirdParagraph: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.contactsPage = page.locator('.Contacts');
    this.pageTitle = this.contactsPage.locator('h1:has-text("Contacts")');
    this.firstParagraph = this.contactsPage.locator('p').nth(0);
    this.secondParagraph = this.contactsPage.locator('p').nth(1);
    this.thirdParagraph = this.contactsPage.locator('p').nth(2);
  }

  async checkContactsPageVisibility() {
    await expect(this.contactsPage).toBeVisible();
  }

  async checkPageTitleVisibility() {
    await expect(this.pageTitle).toBeVisible();
  }

  async checkFirstParagraphVisibility() {
    await expect(this.firstParagraph).toBeVisible();
  }

  async checkSecondParagraphVisibility() {
    await expect(this.secondParagraph).toBeVisible();
  }

  async checkThirdParagraphVisibility() {
    await expect(this.thirdParagraph).toBeVisible();
  }
}

export { ContactsPage };