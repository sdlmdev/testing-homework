import { test, expect } from "@playwright/test";
import { Header } from "../pages/header/header";
import { HOME_PAGE } from "../constants";
import { MOBILE_RESOLUTION } from "../constants";

test.describe("В шапке отображаются ссылки на страницы магазина, а также ссылка на корзину", () => {
  test("ДАНО шапка страницы ТОГДА в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину", async ({
    page,
  }) => {
    const header = new Header(page);

    await header.goto(HOME_PAGE);

    await header.checkNavbarVisibility();
    await header.checkBrandLinkVisibility();
    await header.checkCatalogLinkVisibility();
    await header.checkDeliveryLinkVisibility();
    await header.checkContactsLinkVisibility();
    await header.checkCartLinkVisibility();
  });
});

test.describe("Название магазина в шапке должно быть ссылкой на главную страницу", () => {
  test("ДАНО шапка страницы ТОГДА название магазина в шапке должно быть ссылкой на главную страницу", async ({
    page,
  }) => {
    const header = new Header(page);

    await header.goto(HOME_PAGE);

    await header.checkNavbarVisibility();
    await header.checkBrandLinkVisibility();
    await expect(header.brandLink).toHaveAttribute("href", HOME_PAGE);
  });
});

test.describe("На ширине меньше 576px навигационное меню должно скрываться за гамбургер И при выборе элемента из меню гамбургера, меню должно закрываться", () => {
  test("ДАНО шапка страницы И ширина страницы <= 576px ТОГДА навигационное меню должно скрываться за гамбургером КОГДА нажимаем на гамбургер ТОГДА раскрывается меню навигации И КОГДА нажимаем на один из элементов навигации ТОГДА гамбургер сворачивается", async ({
    page,
  }) => {
    const header = new Header(page);

    await header.goto(HOME_PAGE);
    await page.setViewportSize({
      width: MOBILE_RESOLUTION.width,
      height: MOBILE_RESOLUTION.height,
    });

    await test.step("Шаг 1: проверить, что меню скрыто за гамбургером", async () => {
      await header.checkNavbarVisibility();
      await header.checkTogglerButtonVisibility();
      await header.checkNavbarItemsNotVisible();
    });

    await test.step("Шаг 2: раскрыть меню навигации", async () => {
      await header.clickOnBurger();
      await header.checkNavbarItemsVisibility();
    });

    await test.step("Шаг 3: проверить, что гамбургер сворачивается при выборе элемента навигации", async () => {
      await header.clickOnCartLink();
      await header.checkNavbarItemsNotVisible();
    });
  });
});
