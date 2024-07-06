import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home/home.page";
import { Header } from "../pages/header/header";
import {
  BASE_THRESHOLD,
  HOME_PAGE,
  CATALOG_PAGE,
  DELIVERY_PAGE,
  BASE_URL,
  CONTACTS_PAGE,
  CART_PAGE,
  MOBILE_RESOLUTION,
  TABLET_RESOLUTION,
  DESKTOP_RESOLUTION,
} from "../constants";
import { CatalogPage } from "../pages/catalog/catalog.page";
import { DeliveryPage } from "../pages/delivery/delivery.page";
import { ProductPage } from "../pages/product/product.page";
import { ContactsPage } from "../pages/contacts/contacts.page";
import { CartPage } from "../pages/cart/cart.page";

const resolutions = [
  MOBILE_RESOLUTION,
  TABLET_RESOLUTION,
  DESKTOP_RESOLUTION,
];

resolutions.forEach((resolution) => {
  test.describe("Вёрстка должна адаптироваться под ширину экрана", () => {
    test(`ДАНО шапка страницы И разрешение ${resolution.width}x${resolution.height} ТОГДА вёрстка должна адаптироваться под ширину экрана: ${resolution.name}`, async ({
      page,
    }) => {
      const header = new Header(page);

      await header.goto(HOME_PAGE);
      await page.setViewportSize({
        width: resolution.width,
        height: resolution.height,
      });

      await test.step("Шаг 1: проверить видимость элементов", async () => {
        await header.checkNavbarVisibility();

        if (resolution.width <= 576) {
          await header.checkTogglerButtonVisibility();
          await header.clickOnBurger();
        }

        await header.checkBrandLinkVisibility();
        await header.checkCatalogLinkVisibility();
        await header.checkDeliveryLinkVisibility();
        await header.checkContactsLinkVisibility();
        await header.checkCartLinkVisibility();
      });
    });

    test(`ДАНО страница ${HOME_PAGE} И разрешение ${resolution.width}x${resolution.height} ТОГДА вёрстка должна адаптироваться под ширину экрана: ${resolution.name}`, async ({
      page,
    }) => {
      const homePage = new HomePage(page);

      await homePage.goto(HOME_PAGE);
      await page.setViewportSize({
        width: resolution.width,
        height: resolution.height,
      });

      await test.step("Шаг 1: проверить видимость элементов", async () => {
        await homePage.checkHomePageVisibility();
        await homePage.checkWelcomeMessageVisibility();
        await homePage.checkStabilitySectionVisibility();
        await homePage.checkComfortSectionVisibility();
        await homePage.checkDesignSectionVisibility();
        await homePage.checkTextSectionVisibility();
      });

      await test.step("Шаг 2: сравнить скриншоты", async () => {
        await homePage.toHaveScreenshot({
          fullPage: true,
          threshold: BASE_THRESHOLD,
        });
      });
    });

    test(`ДАНО страница ${CATALOG_PAGE} И разрешение ${resolution.width}x${resolution.height} ТОГДА вёрстка должна адаптироваться под ширину экрана: ${resolution.name}`, async ({
      page,
    }) => {
      const catalogPage = new CatalogPage(page);

      await catalogPage.goto(CATALOG_PAGE);
      await page.setViewportSize({
        width: resolution.width,
        height: resolution.height,
      });

      await test.step("Шаг 1: проверить видимость элементов", async () => {
        await catalogPage.checkCatalogPageVisibility();
        await catalogPage.checkCatalogTitleVisibility();
      });

      await test.step("Шаг 2: проверить видимость каждого продукта по ID", async () => {
        await catalogPage.checkProducts();
      });
    });

    test(`ДАНО страница ${DELIVERY_PAGE} И разрешение ${resolution.width}x${resolution.height} ТОГДА вёрстка должна адаптироваться под ширину экрана: ${resolution.name}`, async ({
      page,
    }) => {
      const deliveryPage = new DeliveryPage(page);

      await deliveryPage.goto(DELIVERY_PAGE);
      await page.setViewportSize({
        width: resolution.width,
        height: resolution.height,
      });

      await test.step("Шаг 1: проверить видимость элементов", async () => {
        await deliveryPage.checkDeliveryPageVisibility();
        await deliveryPage.checkDeliveryTitleVisibility();
        await deliveryPage.checkSwiftAndSecureDeliverySectionVisibility();
        await deliveryPage.checkTrackYourPackageSectionVisibility();
        await deliveryPage.checkCustomerSatisfactionSectionVisibility();
        await deliveryPage.checkImageVisibility();
      });

      await test.step("Шаг 2: сравнить скриншоты", async () => {
        await deliveryPage.toHaveScreenshot({
          fullPage: true,
          threshold: BASE_THRESHOLD,
        });
      });
    });

    test(`ДАНО страница ${CATALOG_PAGE} И разрешение ${resolution.width}x${resolution.height} КОГДА нажимаем на кнопку Details первого товара ТОГДА открывается страница с подробным описанием продукта И вёрстка должна адаптироваться под ширину экрана: ${resolution.name}`, async ({
      page,
    }) => {
      const catalogPage = new CatalogPage(page);
      const productPage = new ProductPage(page);

      await productPage.goto(CATALOG_PAGE);
      await page.setViewportSize({
        width: resolution.width,
        height: resolution.height,
      });

      await test.step("Шаг 1: нажать на кнопку Details первого товара", async () => {
        await catalogPage.checkCatalogPageVisibility();
        await catalogPage.checkProductItemVisibility("0");
        await catalogPage.checkProductItemDetailsLinkVisibility("0");
        await catalogPage.clickOnDetailsButton("0");
        await expect(page).toHaveURL(`${BASE_URL}${CATALOG_PAGE}/0`);
      });

      await test.step("Шаг 2: проверить видимость элементов", async () => {
        await productPage.checkProductPageVisibility();
        await productPage.checkProductTitleVisibility();
        await productPage.checkProductDetailsVisibility();
        await productPage.checkProductPriceVisibility();
        await productPage.checkAddToCartButtonVisibility();
        await productPage.checkProductColorVisibility();
        await productPage.checkProductMaterialVisibility();
      });
    });

    test(`ДАНО страница ${CONTACTS_PAGE} И разрешение ${resolution.width}x${resolution.height} ТОГДА вёрстка должна адаптироваться под ширину экрана: ${resolution.name}`, async ({
      page,
    }) => {
      const contactsPage = new ContactsPage(page);

      await contactsPage.goto(CONTACTS_PAGE);
      await page.setViewportSize({
        width: resolution.width,
        height: resolution.height,
      });

      await test.step("Шаг 1: проверить видимость элементов", async () => {
        await contactsPage.checkContactsPageVisibility();
        await contactsPage.checkPageTitleVisibility();
        await contactsPage.checkFirstParagraphVisibility();
        await contactsPage.checkSecondParagraphVisibility();
        await contactsPage.checkThirdParagraphVisibility();
      });

      await test.step("Шаг 2: сравнить скриншоты", async () => {
        await contactsPage.toHaveScreenshot({
          fullPage: true,
          threshold: BASE_THRESHOLD,
        });
      });
    });

    test(`ДАНО страница ${CATALOG_PAGE} И разрешение ${resolution.width}x${resolution.height} КОГДА нажимаем на кнопку Details первого товара ТОГДА открывается страница с подробным описанием продукта И нажимаем на кнопку Add to Cart ТОГДА товар добавляется в корзину И нажимаем на вкладку Cart ТОГДА вёрстка должна адаптироваться под ширину экрана: ${resolution.name}`, async ({
        page,
      }) => {
        const catalogPage = new CatalogPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const header = new Header(page);
  
        await productPage.goto(CATALOG_PAGE);
        await page.setViewportSize({
          width: resolution.width,
          height: resolution.height,
        });
  
        await test.step("Шаг 1: нажать на кнопку Details первого товара", async () => {
          await catalogPage.checkCatalogPageVisibility();
          await catalogPage.checkProductItemVisibility("0");
          await catalogPage.checkProductItemDetailsLinkVisibility("0");
          await catalogPage.clickOnDetailsButton("0");
          await expect(page).toHaveURL(`${BASE_URL}${CATALOG_PAGE}/0`);
        });

        await test.step("Шаг 2: нажать на кнопку Add to Cart", async () => {
          await productPage.checkProductPageVisibility();
          await productPage.checkAddToCartButtonVisibility();
          await productPage.clickOnAddToCartButton();
          expect(await header.cartLink.textContent()).toBe('Cart (1)');
        });

        await test.step("Шаг 3: нажать на вкладку Cart", async () => {
          if (resolution.width <= 576) {
            await header.clickOnBurger();
          }

          await header.checkNavbarVisibility();
          await header.checkCartLinkVisibility();
          await header.clickOnCartLink();
          await expect(page).toHaveURL(`${BASE_URL}${CART_PAGE}`);
        });
  
        await test.step("Шаг 4: проверить видимость элементов", async () => {
          await cartPage.checkCartPageVisibility();
          await cartPage.checkCartTableVisibility();
          await cartPage.checkCartTableColumnNumberVisibility();
          await cartPage.checkCartTableColumnProductVisibility();
          await cartPage.checkCartTableColumnPriceVisibility();
          await cartPage.checkCartTableColumnCountVisibility();
          await cartPage.checkCartTableColumnTotalVisibility();
          await cartPage.checkCartOrderPriceVisibility();
          await cartPage.checkCartClearButtonVisibility();
          await cartPage.checkCartFormVisibility();
          await cartPage.checkCartFormNameVisibility();
          await cartPage.checkCartFormPhoneVisibility();
          await cartPage.checkCartFormAddressVisibility();
          await cartPage.checkCartFormSubmitButtonVisibility();
        });
      });
  });
});
