import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base-page/base.page';

class DeliveryPage extends BasePage {
  readonly page: Page;
  readonly deliveryPage: Locator;
  readonly deliveryTitle: Locator;
  readonly swiftAndSecureDeliverySection: Locator;
  readonly trackYourPackageSection: Locator;
  readonly customerSatisfactionSection: Locator;
  readonly image: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.deliveryPage = page.locator('.Delivery');
    this.deliveryTitle = page.locator('h1:has-text("Delivery")');
    this.swiftAndSecureDeliverySection = page.locator('text=Swift and Secure Delivery').first();
    this.trackYourPackageSection = page.locator('text=Track Your Package with Ease').first();
    this.customerSatisfactionSection = page.locator('text=Customer Satisfaction Guaranteed').first();
    this.image = page.locator('.Image');
  }

  async checkDeliveryPageVisibility() {
    await expect(this.deliveryPage).toBeVisible();
  }

  async checkDeliveryTitleVisibility() {
    await expect(this.deliveryTitle).toBeVisible();
  }

  async checkSwiftAndSecureDeliverySectionVisibility() {
    await expect(this.swiftAndSecureDeliverySection).toBeVisible();
  }

  async checkTrackYourPackageSectionVisibility() {
    await expect(this.trackYourPackageSection).toBeVisible();
  }

  async checkCustomerSatisfactionSectionVisibility() {
    await expect(this.customerSatisfactionSection).toBeVisible();
  }

  async checkImageVisibility() {
    await expect(this.image).toBeVisible();
  }
}

export { DeliveryPage };