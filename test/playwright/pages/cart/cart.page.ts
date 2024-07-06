import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base-page/base.page';

class CartPage extends BasePage {
  readonly page: Page;
  readonly cartContainer: Locator;
  readonly pageTitle: Locator;
  readonly cartEmptyMessage: Locator;
  readonly catalogLink: Locator;
  readonly cartTable: Locator;
  readonly cartTableColumnNumber: Locator;
  readonly cartTableColumnProduct: Locator;
  readonly cartTableColumnPrice: Locator;
  readonly cartTableColumnCount: Locator;
  readonly cartTableColumnTotal: Locator;
  readonly cartOrderPrice: Locator;
  readonly cartClearButton: Locator;
  readonly cartForm: Locator;
  readonly cartFormName: Locator;
  readonly cartFormPhone: Locator;
  readonly cartFormAddress: Locator;
  readonly cartFormSubmitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.cartContainer = page.locator('.Cart');
    this.pageTitle = this.cartContainer.locator('h1:has-text("Shopping cart")');
    this.cartEmptyMessage = this.cartContainer.locator('text=Cart is empty. Please select products in the catalog.');
    this.catalogLink = this.cartContainer.locator('a[href="/hw/store/catalog"]');
    this.cartTable = this.cartContainer.locator('.Cart-Table');
    this.cartTableColumnNumber = this.cartTable.locator('thead th:has-text("#")');
    this.cartTableColumnProduct = this.cartTable.locator('thead th:has-text("Product")');
    this.cartTableColumnPrice = this.cartTable.locator('thead th:has-text("Price")');
    this.cartTableColumnCount = this.cartTable.locator('thead th:has-text("Count")');
    this.cartTableColumnTotal = this.cartTable.locator('thead th:has-text("Total")');
    this.cartOrderPrice = page.locator('.Cart-OrderPrice');
    this.cartClearButton = page.locator('.Cart-Clear');
    this.cartForm = page.locator('.Form');
    this.cartFormName = this.cartForm.locator('input.Form-Field_type_name');
    this.cartFormPhone = this.cartForm.locator('input.Form-Field_type_phone');
    this.cartFormAddress = this.cartForm.locator('textarea.Form-Field_type_address');
    this.cartFormSubmitButton = this.cartForm.locator('button.Form-Submit');
  }

  async checkCartPageVisibility() {
    await expect(this.cartContainer).toBeVisible();
  }

  async checkCartPageTitleVisibility() {
    await expect(this.pageTitle).toBeVisible();
  }

  async checkCartEmptyMessageVisibility() {
    await expect(this.cartEmptyMessage).toBeVisible();
  }

  async checkCatalogLinkVisibility() {
    await expect(this.catalogLink).toBeVisible();
  }

  async checkCartTableVisibility() {
    await expect(this.cartTable).toBeVisible();
  }

  async checkCartTableColumnNumberVisibility() {
    await expect(this.cartTableColumnNumber).toBeVisible();
  }

  async checkCartTableColumnProductVisibility() {
    await expect(this.cartTableColumnProduct).toBeVisible();
  }

  async checkCartTableColumnPriceVisibility() {
    await expect(this.cartTableColumnPrice).toBeVisible();
  }

  async checkCartTableColumnCountVisibility() {
    await expect(this.cartTableColumnCount).toBeVisible();
  }

  async checkCartTableColumnTotalVisibility() {
    await expect(this.cartTableColumnTotal).toBeVisible();
  }

  async checkCartOrderPriceVisibility() {
    await expect(this.cartOrderPrice).toBeVisible();
  }

  async checkCartClearButtonVisibility() {
    await expect(this.cartClearButton).toBeVisible();
  }

  async cartClearButtonClick() {
    await this.cartClearButton.click();
  }

  async checkCartFormVisibility() {
    await expect(this.cartForm).toBeVisible();
  }

  async checkCartFormNameVisibility() {
    await expect(this.cartFormName).toBeVisible();
  }

  async checkCartFormPhoneVisibility() {
    await expect(this.cartFormPhone).toBeVisible();
  }

  async checkCartFormAddressVisibility() {
    await expect(this.cartFormAddress).toBeVisible();
  }

  async checkCartFormSubmitButtonVisibility() {
    await expect(this.cartFormSubmitButton).toBeVisible();
  }

  async checkCartItemCountVisibility(productId: number | string) {
    const cartCoutItem = this.page.locator(`.Cart-Table [data-testid="${productId}"] .Cart-Count`);

    await expect(cartCoutItem).toBeVisible();
  }

  async checkCartItemCount(count: number | string, productId: number | string) {
    const cartCoutItem = this.page.locator(`.Cart-Table [data-testid="${productId}"] .Cart-Count`);
    
    await expect(cartCoutItem).toBeVisible();
    await expect(cartCoutItem).toHaveText(String(count));
  }

  async checkCartItemPriceVisibility(productId: number | string) {
    const cartItemPrice = this.page.locator(`.Cart-Table [data-testid="${productId}"] .Cart-Price`);

    await expect(cartItemPrice).toBeVisible();
  }

  async checkCartItemPrice(price: string, productId: number | string) {
    const cartItemPrice = this.page.locator(`.Cart-Table [data-testid="${productId}"] .Cart-Price`);

    await expect(cartItemPrice).toBeVisible();
    await expect(cartItemPrice).toHaveText(price);
  }

  async checkCartItemTotalVisibility(productId: number | string) {
    const cartItemTotal = this.page.locator(`.Cart-Table [data-testid="${productId}"] .Cart-Total`);

    await expect(cartItemTotal).toBeVisible();
  }

  async checkCartItemTotal(total: string, productId: number | string) {
    const cartItemTotal = this.page.locator(`.Cart-Table [data-testid="${productId}"] .Cart-Total`);

    await expect(cartItemTotal).toBeVisible();
    await expect(cartItemTotal).toHaveText(total);
  }

  async checkCartItemNameVisibility(productId: number | string) {
    const cartItemName = this.page.locator(`.Cart-Table [data-testid="${productId}"] .Cart-Name`);

    await expect(cartItemName).toBeVisible();
  }

  async checkCartItemName(name: string, productId: number | string) {
    const cartItemName = this.page.locator(`.Cart-Table [data-testid="${productId}"] .Cart-Name`);

    await expect(cartItemName).toBeVisible();
    await expect(cartItemName).toHaveText(name);
  }

  async getCartProductName(productId: number | string) {
    const cartItemName = this.page.locator(`.Cart-Table [data-testid="${productId}"] .Cart-Name`);

    await expect(cartItemName).toBeVisible();

    return await cartItemName.textContent() || 'Продукт не найден';
  }

  async getCartProductPrice(productId: number | string) {
    const cartItemPrice = this.page.locator(`.Cart-Table [data-testid="${productId}"] .Cart-Price`);

    await expect(cartItemPrice).toBeVisible();

    return await cartItemPrice.textContent() || 'Продукт не найден';
  }

  async getCartProductCount(productId: number | string) {
    const cartItemCount = this.page.locator(`.Cart-Table [data-testid="${productId}"] .Cart-Count`);

    await expect(cartItemCount).toBeVisible();

    return await cartItemCount.textContent() || 'Продукт не найден';
  }

  async getCartProductTotal(productId: number | string) {
    const cartItemTotal = this.page.locator(`.Cart-Table [data-testid="${productId}"] .Cart-Total`);

    await expect(cartItemTotal).toBeVisible();

    return await cartItemTotal.textContent() || 'Продукт не найден';
  }

  async checkCartTableNotVisible() {
    await expect(this.cartTable).not.toBeVisible();
  }
}

export { CartPage };