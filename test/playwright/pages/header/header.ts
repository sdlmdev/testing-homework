import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base-page/base.page';

class Header extends BasePage {
  readonly page: Page;
  readonly navbar: Locator;
  readonly brandLink: Locator;
  readonly togglerButton: Locator;
  readonly catalogLink: Locator;
  readonly deliveryLink: Locator;
  readonly contactsLink: Locator;
  readonly cartLink: Locator;
  readonly navbarItems: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.navbar = page.locator('.navbar');
    this.brandLink = page.locator('.Application-Brand');
    this.togglerButton = page.locator('.Application-Toggler');
    this.catalogLink = page.locator('.navbar-nav >> text=Catalog');
    this.deliveryLink = page.locator('.navbar-nav >> text=Delivery');
    this.contactsLink = page.locator('.navbar-nav >> text=Contacts');
    this.cartLink = page.locator('.navbar-nav >> text=/Cart(\\s\\(\\d+\\))?/');
    this.navbarItems = page.locator('.navbar-nav');
  }

  async checkNavbarItemsVisibility() {
    await expect(this.navbarItems).toBeVisible();
  }

  async checkNavbarItemsNotVisible() {
    await expect(this.navbarItems).not.toBeVisible();
  }

  async clickOnBurger() {
    await this.togglerButton.click();
  };

  async clickOnCartLink() {
    await this.cartLink.click();
  };

  async clickOnCatalogLink() {
    await this.catalogLink.click();
  };

  async checkNavbarVisibility() {
    await expect(this.navbar).toBeVisible();
  }

  async checkBrandLinkVisibility() {
    await expect(this.brandLink).toBeVisible();
  }

  async checkTogglerButtonVisibility() {
    await expect(this.togglerButton).toBeVisible();
  }

  async checkCatalogLinkVisibility() {
    await expect(this.catalogLink).toBeVisible();
  }

  async checkDeliveryLinkVisibility() {
    await expect(this.deliveryLink).toBeVisible();
  }

  async checkContactsLinkVisibility() {
    await expect(this.contactsLink).toBeVisible();
  }

  async checkCartLinkVisibility() {
    await expect(this.cartLink).toBeVisible();
  }

  async checkCatalogLinkNotVisible() {
    await expect(this.catalogLink).not.toBeVisible();
  }

  async checkCartLinkCounterValue(cnt: string | number) {
    await expect(this.cartLink).toContainText(`Cart${cnt ? ` (${cnt})` : ''}`);
  }
}

export { Header };