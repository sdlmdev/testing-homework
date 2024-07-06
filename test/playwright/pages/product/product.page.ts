import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base-page/base.page';

class ProductPage extends BasePage {
  readonly page: Page;
  readonly productPage: Locator;
  readonly productTitle: Locator;
  readonly productDetails: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly productColor: Locator;
  readonly productMaterial: Locator;
  readonly productCartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.productPage = page.locator('.Product');
    this.productTitle = page.locator('.ProductDetails-Name');
    this.productDetails = page.locator('.ProductDetails-Description');
    this.productPrice = page.locator('.ProductDetails-Price');
    this.addToCartButton = page.locator('.ProductDetails-AddToCart');
    this.productColor = page.locator('.ProductDetails-Color');
    this.productMaterial = page.locator('.ProductDetails-Material');
    this.productCartBadge = page.locator('.CartBadge');
  }

  async clickOnAddToCartButton() {
    await this.addToCartButton.click();
  }

  async checkProductCardBadgeVisibility() {
    await expect(this.productCartBadge).toBeVisible();
  }

  async checkProductPageVisibility() {
    await expect(this.productPage).toBeVisible();
  }

  async checkProductTitleVisibility() {
    await expect(this.productTitle).toBeVisible();
  }

  async checkProductDetailsVisibility() {
    await expect(this.productDetails).toBeVisible();
  }

  async checkProductPriceVisibility() {
    await expect(this.productPrice).toBeVisible();
  }

  async checkProductColorVisibility() {
    await expect(this.productColor).toBeVisible();
  }

  async checkProductMaterialVisibility() {
    await expect(this.productMaterial).toBeVisible();
  }

  async checkAddToCartButtonVisibility() {
    await expect(this.addToCartButton).toBeVisible();
  }

  async getProductTitle() {
    return await this.productTitle.textContent() || '';
  }
}

export { ProductPage };