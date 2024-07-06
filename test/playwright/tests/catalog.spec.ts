import { test, expect } from "@playwright/test";
import { CatalogPage } from "../pages/catalog/catalog.page";
import { ProductPage } from "../pages/product/product.page";
import { Header } from "../pages/header/header";
import { CartPage } from "../pages/cart/cart.page";
import { CATALOG_PAGE, BASE_URL } from "../constants";

test.describe("В каталоге должны отображаться товары, список которых приходит с сервера", () => {
  test(`ДАНО страница ${CATALOG_PAGE} ТОГДА товары должны отображаться`, async ({
    page,
  }) => {
    const catalogPage = new CatalogPage(page);

    await catalogPage.goto(CATALOG_PAGE);
    await catalogPage.checkCatalogPageVisibility();

    const productsLength = await catalogPage.getCatalogItemsLength();

    if (productsLength) {
      await catalogPage.checkProducts(productsLength - 1);
    } else {
      await catalogPage.checkProducts()
    }
  });
});

test.describe("Для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре", () => {
  test(`ДАНО страница ${CATALOG_PAGE} ТОГДА для каждого товара в каталоге отображается название, цена, ссылка на страницу с подробной информацией о товаре`, async ({
    page,
  }) => {
    const catalogPage = new CatalogPage(page);

    await catalogPage.goto(CATALOG_PAGE);
    await catalogPage.checkCatalogPageVisibility();

    const productsLength = await catalogPage.getCatalogItemsLength();
    
    if (productsLength) {
      await catalogPage.checkProductDetails(productsLength - 1);
    } else {
      await catalogPage.checkProductDetails();
    }
  });
});

test.describe("На странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка добавить в корзину", () => {
  test(`ДАНО страница ${CATALOG_PAGE} КОГДА нажимаем на кнопку Details первого товара ТОГДА открывается страница с подробным описанием продукта И отображаются: название товара, его описание, цена, цвет, материал и кнопка добавить в корзину`, async ({
    page,
  }) => {
    const catalogPage = new CatalogPage(page);
    const productPage = new ProductPage(page);

    await catalogPage.goto(CATALOG_PAGE);

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
      await productPage.checkProductColorVisibility();
      await productPage.checkProductMaterialVisibility();
      await productPage.checkAddToCartButtonVisibility();
    });
  });
});

test.describe("Если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом", () => {
  test(`ДАНО страница ${CATALOG_PAGE} КОГДА нажимаем на кнопку Details первого товара ТОГДА открывается страница с подробным описанием продукта КОГДА нажимаем кнопку Add to Cart ТОГДА появляется уведомление о том что товар добавлен в корзину И КОГДА переходим обратно в каталог ТОГДА на первом товаре отображается уведомление о том что товар добавлен в корзину`, async ({
    page,
  }) => {
    const catalogPage = new CatalogPage(page);
    const productPage = new ProductPage(page);
    const header = new Header(page);

    await catalogPage.goto(CATALOG_PAGE);

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
    });

    await test.step("Шаг 3: проверить видимость уведомления", async () => {
      await productPage.checkProductCardBadgeVisibility();
    });

    await test.step("Шаг 4: вернуться в каталог", async () => {
      await header.checkNavbarVisibility();
      await header.checkCatalogLinkVisibility();
      await header.clickOnCatalogLink();
    });

    await test.step("Шаг 5: проверить видимость уведомления на первом товаре", async () => {
      await catalogPage.checkCatalogPageVisibility();
      await catalogPage.checkProductItemVisibility("0");
      await catalogPage.checkProductItemCartBadgeVisibility("0");
    });
  });
});

test.describe("Если товар уже добавлен в корзину, повторное нажатие кнопки добавить в корзину должно увеличивать его количество", () => {
  test(`ДАНО страница ${CATALOG_PAGE} КОГДА нажимаем на кнопку Details первого товара ТОГДА открывается страница с подробным описанием продукта И КОГДА нажимаем кнопку Add to Cart 3 раза И переходим в корзину ТОГДА Count равен 3`, async ({
    page,
  }) => {
    const catalogPage = new CatalogPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const header = new Header(page);

    await catalogPage.goto(CATALOG_PAGE);

    await test.step("Шаг 1: нажать на кнопку Details первого товара", async () => {
      await catalogPage.checkCatalogPageVisibility();
      await catalogPage.checkProductItemVisibility("0");
      await catalogPage.checkProductItemDetailsLinkVisibility("0");
      await catalogPage.clickOnDetailsButton("0");
      await expect(page).toHaveURL(`${BASE_URL}${CATALOG_PAGE}/0`);
    });

    await test.step("Шаг 2: нажать на кнопку Add to Cart 3 раза", async () => {
      await productPage.checkProductPageVisibility();
      await productPage.checkAddToCartButtonVisibility();
      await productPage.clickOnAddToCartButton();
      await productPage.clickOnAddToCartButton();
      await productPage.clickOnAddToCartButton();
    });

    await test.step("Шаг 3: перейти в корзину", async () => {
      await header.checkNavbarVisibility();
      await header.checkCartLinkVisibility();
      await header.clickOnCartLink();
    });

    await test.step("Шаг 4: проверить количество товаров в корзине", async () => {
      await cartPage.checkCartPageVisibility();
      await cartPage.checkCartItemCount(3, 0);
    });
  });
});

test.describe("Содержимое корзины должно сохраняться между перезагрузками страницы", () => {
  test(`ДАНО страница ${CATALOG_PAGE} КОГДА нажимаем на кнопку Details первого товара ТОГДА открывается страница с подробным описанием продукта КОГДА нажимаем кнопку Add to Cart И переходим в корзину ТОГДА проверяем содержимое корзины И КОГДА перезагружаем страницу ТОГДА проверяем содержимае корзины еще раз`, async ({
    page,
  }) => {
    const catalogPage = new CatalogPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const header = new Header(page);

    await catalogPage.goto(CATALOG_PAGE);

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
    });

    await test.step("Шаг 3: перейти в корзину", async () => {
      await header.checkNavbarVisibility();
      await header.checkCartLinkVisibility();
      await header.clickOnCartLink();
    });

    let productItemName = '';
    let productItemPrice = '';
    let productItemCount = '';
    let productItemTotalPrice = '';

    await test.step("Шаг 4: проверить содержимое корзины", async () => {
      await cartPage.checkCartPageVisibility();
      await cartPage.checkCartTableVisibility();

      await cartPage.checkCartItemNameVisibility(0);
      productItemName = await cartPage.getCartProductName(0);

      await cartPage.checkCartItemPriceVisibility(0);
      productItemPrice = await cartPage.getCartProductPrice(0);

      await cartPage.checkCartItemCountVisibility(0);
      productItemCount = await cartPage.getCartProductCount(0);

      await cartPage.checkCartItemTotalVisibility(0);
      productItemTotalPrice = await cartPage.getCartProductTotal(0);
    });

    await test.step("Шаг 5: перезагрузить страницу", async () => {
      await page.reload();
    });

    await test.step("Шаг 6: проверить содержимое корзины еще раз", async () => {
      await cartPage.checkCartPageVisibility();
      await cartPage.checkCartTableVisibility();

      await cartPage.checkCartItemName(productItemName, 0);
      await cartPage.checkCartItemPrice(productItemPrice, 0);
      await cartPage.checkCartItemCount(productItemCount, 0);
      await cartPage.checkCartItemTotal(productItemTotalPrice, 0);
    });
  });
});
