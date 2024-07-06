import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base-page/base.page";
import { PRODUCTS_CNT } from "../../constants";

class CatalogPage extends BasePage {
  readonly page: Page;
  readonly catalogPage: Locator;
  readonly catalogTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.catalogPage = page.locator(".Catalog");
    this.catalogTitle = page.locator("h1", { hasText: "Catalog" });
  }

  async getCatalogItemsLength(): Promise<number> {
    return await this.page.$$eval('.Catalog > .row:nth-child(2) > *', elements => elements.length) || 0;
  }

  async checkCatalogPageVisibility() {
    await expect(this.catalogPage).toBeVisible();
  }

  async checkCatalogTitleVisibility() {
    await expect(this.catalogTitle).toBeVisible();
  }

  async checkProductItemVisibility(dataTestid: string) {
    await expect(this.catalogPage.locator(`.ProductItem[data-testid="${dataTestid}"]`)).toBeVisible();
  }

  async checkProductItemNameVisibility(dataTestid: string) {
    await expect(this.catalogPage.locator(`.ProductItem[data-testid="${dataTestid}"] .ProductItem-Name`)).toBeVisible();
  }

  async checkProductItemPriceVisibility(dataTestid: string) {
    await expect(this.catalogPage.locator(`.ProductItem[data-testid="${dataTestid}"] .ProductItem-Price`)).toBeVisible();
  }

  async checkProductItemDetailsLinkVisibility(dataTestid: string) {
    await expect(this.catalogPage.locator(`.ProductItem[data-testid="${dataTestid}"] .ProductItem-DetailsLink`)).toBeVisible();
  }

  async checkProductItemCartBadgeVisibility(dataTestid: string) {
    await expect(this.catalogPage.locator(`.ProductItem[data-testid="${dataTestid}"] .CartBadge`)).toBeVisible();
  }

  async clickOnDetailsButton(dataTestid: string) {
    return await this.page
      .locator(`[data-testid="${dataTestid}"] .ProductItem-DetailsLink`)
      .click();
  }

  async checkProducts(productsCnt: number = PRODUCTS_CNT) {
    for (let i = 0; i <= productsCnt; i += 1) {
      await expect(
        this.page.locator(`.ProductItem[data-testid="${i}"]`)
      ).toBeVisible();
    }
  }

  async checkProductDetails(productsCnt: number = PRODUCTS_CNT) {
    for (let i = 0; i <= productsCnt; i += 1) {
      const productItem = this.page.locator(`.ProductItem[data-testid="${i}"]`);

      await expect(productItem).toBeVisible();
  
      await this.checkProductItemNameVisibility(String(i));
      await this.checkProductItemPriceVisibility(String(i));
      await this.checkProductItemDetailsLinkVisibility(String(i));
    }
  }
}

export { CatalogPage };
