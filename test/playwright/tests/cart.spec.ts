import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/cart/cart.page";
import { CatalogPage } from "../pages/catalog/catalog.page";
import { CART_PAGE, CATALOG_PAGE, BASE_URL } from "../constants";
import { Header } from "../pages/header/header";
import { ProductPage } from "../pages/product/product.page";

test.describe("В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней", () => {
  test(`ДАНО страница ${CATALOG_PAGE} КОГДА ни одного товара не добавлено в корзину ТОГДА рядом с кнопкой корзины нет счетчика КОГДА открываем подробное описание продукта И нажимаем кнопку Add to Cart ТОГДА в навигационной панели рядом с копкой корзины появляется счетчик`, async ({
    page,
  }) => {
    const catalogPage = new CatalogPage(page);
    const header = new Header(page);
    const productPage = new ProductPage(page);

    await catalogPage.goto(CATALOG_PAGE);

    await test.step("Шаг 1: проверить отсутствие счетчика", async () => {
      await header.checkNavbarVisibility();
      await header.checkCartLinkVisibility();
      await header.checkCartLinkCounterValue("");
    });

    await test.step("Шаг 2: нажать на кнопку Details первого товара", async () => {
      await catalogPage.checkCatalogPageVisibility();
      await catalogPage.checkProductItemVisibility("0");
      await catalogPage.checkProductItemDetailsLinkVisibility("0");
      await catalogPage.clickOnDetailsButton("0");
      await expect(page).toHaveURL(`${BASE_URL}${CATALOG_PAGE}/0`);
    });

    await test.step("Шаг 3: нажать на кнопку Add to Cart", async () => {
      await productPage.checkProductPageVisibility();
      await productPage.checkAddToCartButtonVisibility();
      await productPage.clickOnAddToCartButton();
    });

    await test.step("Шаг 4: проверить наличие счетчика", async () => {
      await header.checkCartLinkCounterValue(1);
    });
  });
});

test.describe("В корзине должна отображаться таблица с добавленными в нее товарами", () => {
  test(`ДАНО страница ${CATALOG_PAGE} КОГДА нажимаем на кнопку Details первого продукта ТОГДА открывается страница с подробным описание продукта КОГДА нажимаем на кнопку Add to Cart И возвращаемся обратно в каталог И нажимаем на кнопку Details второго продукта ТОГДА открывается страница с подробным описание продукта КОГДА нажимаем на кнопку Add to Cart И переходим на страницу корзины ТОГДА в корзине отображаются добавленные товары`, async ({
    page,
  }) => {
    const catalogPage = new CatalogPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const header = new Header(page);

    let firtProductName = '';
    let secondProductName = '';

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
      firtProductName = await productPage.getProductTitle();
    });

    await test.step("Шаг 3: вернуться обратно в каталог", async () => {
      await header.checkNavbarVisibility();
      await header.checkCatalogLinkVisibility();
      await header.clickOnCatalogLink();
    });

    await test.step("Шаг 4: нажать на кнопку Details второго товара", async () => {
      await catalogPage.checkCatalogPageVisibility();
      await catalogPage.checkProductItemVisibility("1");
      await catalogPage.checkProductItemDetailsLinkVisibility("1");
      await catalogPage.clickOnDetailsButton("1");
      await expect(page).toHaveURL(`${BASE_URL}${CATALOG_PAGE}/1`);
    });

    await test.step("Шаг 5: нажать на кнопку Add to Cart", async () => {
      await productPage.checkProductPageVisibility();
      await productPage.checkAddToCartButtonVisibility();
      await productPage.clickOnAddToCartButton();
      secondProductName = await productPage.getProductTitle();
    });

    await test.step("Шаг 6: перейти в корзину", async () => {
      await header.checkNavbarVisibility();
      await header.checkCartLinkVisibility();
      await header.clickOnCartLink();
      await expect(page).toHaveURL(`${BASE_URL}${CART_PAGE}`);
    });

    await test.step("Шаг 7: проверить наличие добавленных товаров в корзине", async () => {
      await cartPage.checkCartPageVisibility();
      await cartPage.checkCartItemName(firtProductName, 0);
      await cartPage.checkCartItemName(secondProductName, 1);
    });
  });
});

test.describe("Для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа", () => {
  test(`ДАНО страница ${CATALOG_PAGE} КОГДА нажимаем на кнопку Details первого продукта ТОГДА открывается страница с подробным описание продукта КОГДА нажимаем на кнопку Add to Cart И возвращаемся обратно в каталог И нажимаем на кнопку Details второго продукта ТОГДА открывается страница с подробным описание продукта КОГДА нажимаем на кнопку Add to Cart И переходим на страницу корзины ТОГДА в корзине отображаются названия, цены, количества , стоимости, а также должна отображаться общая сумма заказа`, async ({
    page,
  }) => {
    const catalogPage = new CatalogPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const header = new Header(page);

    let firtProductName = '';
    let secondProductName = '';

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
      firtProductName = await productPage.getProductTitle();
    });

    await test.step("Шаг 3: вернуться обратно в каталог", async () => {
      await header.checkNavbarVisibility();
      await header.checkCatalogLinkVisibility();
      await header.clickOnCatalogLink();
    });

    await test.step("Шаг 4: нажать на кнопку Details второго товара", async () => {
      await catalogPage.checkCatalogPageVisibility();
      await catalogPage.checkProductItemVisibility("1");
      await catalogPage.checkProductItemDetailsLinkVisibility("1");
      await catalogPage.clickOnDetailsButton("1");
      await expect(page).toHaveURL(`${BASE_URL}${CATALOG_PAGE}/1`);
    });

    await test.step("Шаг 5: нажать на кнопку Add to Cart", async () => {
      await productPage.checkProductPageVisibility();
      await productPage.checkAddToCartButtonVisibility();
      await productPage.clickOnAddToCartButton();
      secondProductName = await productPage.getProductTitle();
    });

    await test.step("Шаг 6: перейти в корзину", async () => {
      await header.checkNavbarVisibility();
      await header.checkCartLinkVisibility();
      await header.clickOnCartLink();
      await expect(page).toHaveURL(`${BASE_URL}${CART_PAGE}`);
    });

    await test.step("Шаг 7: проверить наличие добавленных товаров в корзине", async () => {
      await cartPage.checkCartPageVisibility();
      await cartPage.checkCartItemName(firtProductName, 0);
      await cartPage.checkCartItemName(secondProductName, 1);
    });

    await test.step("Шаг 8: проверить заполнение таблицы", async () => {
      await cartPage.checkCartItemNameVisibility(0);
      await cartPage.checkCartItemPriceVisibility(0);
      await cartPage.checkCartItemCountVisibility(0);
      await cartPage.checkCartItemTotalVisibility(0);

      await cartPage.checkCartItemNameVisibility(1);
      await cartPage.checkCartItemPriceVisibility(1);
      await cartPage.checkCartItemCountVisibility(1);
      await cartPage.checkCartItemTotalVisibility(1);

      await cartPage.checkCartOrderPriceVisibility();
    });
  });
});

test.describe("В корзине должна быть кнопка очистить корзину, по нажатию на которую все товары должны удаляться", () => {
  test(`ДАНО страница ${CATALOG_PAGE} КОГДА нажимаем на кнопку Details первого продукта ТОГДА открывается страница с подробным описание продукта КОГДА нажимаем на кнопку Add to Cart И возвращаемся обратно в каталог И нажимаем на кнопку Details второго продукта ТОГДА открывается страница с подробным описание продукта КОГДА нажимаем на кнопку Add to Cart И переходим на страницу корзины ТОГДА в корзине отображаются названия, цены, количества , стоимости, а также должна отображаться общая сумма заказа ТОГДА при нажатии кнопки Clear shopping cart корзина очищается`, async ({
    page,
  }) => {
    const catalogPage = new CatalogPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const header = new Header(page);

    let firtProductName = '';
    let secondProductName = '';

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
      firtProductName = await productPage.getProductTitle();
    });

    await test.step("Шаг 3: вернуться обратно в каталог", async () => {
      await header.checkNavbarVisibility();
      await header.checkCatalogLinkVisibility();
      await header.clickOnCatalogLink();
    });

    await test.step("Шаг 4: нажать на кнопку Details второго товара", async () => {
      await catalogPage.checkCatalogPageVisibility();
      await catalogPage.checkProductItemVisibility("1");
      await catalogPage.checkProductItemDetailsLinkVisibility("1");
      await catalogPage.clickOnDetailsButton("1");
      await expect(page).toHaveURL(`${BASE_URL}${CATALOG_PAGE}/1`);
    });

    await test.step("Шаг 5: нажать на кнопку Add to Cart", async () => {
      await productPage.checkProductPageVisibility();
      await productPage.checkAddToCartButtonVisibility();
      await productPage.clickOnAddToCartButton();
      secondProductName = await productPage.getProductTitle();
    });

    await test.step("Шаг 6: перейти в корзину", async () => {
      await header.checkNavbarVisibility();
      await header.checkCartLinkVisibility();
      await header.clickOnCartLink();
      await expect(page).toHaveURL(`${BASE_URL}${CART_PAGE}`);
    });

    await test.step("Шаг 7: проверить наличие добавленных товаров в корзине", async () => {
      await cartPage.checkCartPageVisibility();
      await cartPage.checkCartItemName(firtProductName, 0);
      await cartPage.checkCartItemName(secondProductName, 1);
    });

    await test.step("Шаг 8: проверить заполнение таблицы", async () => {
      await cartPage.checkCartItemNameVisibility(0);
      await cartPage.checkCartItemPriceVisibility(0);
      await cartPage.checkCartItemCountVisibility(0);
      await cartPage.checkCartItemTotalVisibility(0);

      await cartPage.checkCartItemNameVisibility(1);
      await cartPage.checkCartItemPriceVisibility(1);
      await cartPage.checkCartItemCountVisibility(1);
      await cartPage.checkCartItemTotalVisibility(1);

      await cartPage.checkCartOrderPriceVisibility();
    });

    await test.step("Шаг 9: очистить корзину", async () => {
      await cartPage.checkCartClearButtonVisibility();
      await cartPage.cartClearButtonClick();
      await cartPage.checkCartTableNotVisible();
    });
  });
});

test.describe("Если корзина пустая, должна отображаться ссылка на каталог товаров", () => {
  test(`ДАНО страница ${CART_PAGE} КОГДА товары в корзине отсутствуют ТОГДА отображается ссылка на каталог товаров`, async ({
    page,
  }) => {
    const cartPage = new CartPage(page);

    await cartPage.goto(CART_PAGE);

    await test.step("Шаг 1: проверить отсутствие товаров в корзине", async () => {
      await cartPage.checkCartPageVisibility();
      await cartPage.checkCartTableNotVisible();
    });

    await test.step("Шаг 2: проверить наличие ссылки на каталог товаров", async () => {
      await cartPage.checkCatalogLinkVisibility();
    });
  });
});