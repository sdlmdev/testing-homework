import { test } from "@playwright/test";
import { HomePage } from "../pages/home/home.page";
import { CatalogPage } from "../pages/catalog/catalog.page";
import { DeliveryPage } from "../pages/delivery/delivery.page";
import { ContactsPage } from "../pages/contacts/contacts.page";
import {
  HOME_PAGE,
  CATALOG_PAGE,
  DELIVERY_PAGE,
  CONTACTS_PAGE,
  BASE_THRESHOLD,
} from "../constants";

test.describe("В магазине должны быть страницы: главная, каталог, условия доставки, контакты", () => {
  test("ДАНО старницы магазина: главная, каталог, условия доставки, контакты ТОГДА все страницы должны быть доступны", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const catalogPage = new CatalogPage(page);
    const deliveryPage = new DeliveryPage(page);
    const contactsPage = new ContactsPage(page);

    await homePage.goto(HOME_PAGE);
    await homePage.checkHomePageVisibility();

    await catalogPage.goto(CATALOG_PAGE);
    await catalogPage.checkCatalogPageVisibility();

    await deliveryPage.goto(DELIVERY_PAGE);
    await deliveryPage.checkDeliveryPageVisibility();

    await contactsPage.goto(CONTACTS_PAGE);
    await contactsPage.checkContactsPageVisibility();
  });
});

test.describe("Страницы главная, условия доставки, контакты должны иметь статическое содержимое", () => {
  test("ДАНО страницы магазина: главная, каталог, условия доставки, контакты ТОГДА все страницы должны иметь статическое содержимое", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const deliveryPage = new DeliveryPage(page);
    const contactsPage = new ContactsPage(page);

    await homePage.goto(HOME_PAGE);
    await homePage.toHaveScreenshot({
      fullPage: true,
      threshold: BASE_THRESHOLD,
    });

    await deliveryPage.goto(DELIVERY_PAGE);
    await deliveryPage.toHaveScreenshot({
      fullPage: true,
      threshold: BASE_THRESHOLD,
    });
    
    await contactsPage.goto(CONTACTS_PAGE);
    await contactsPage.toHaveScreenshot({
      fullPage: true,
      threshold: BASE_THRESHOLD,
    });
  });
});