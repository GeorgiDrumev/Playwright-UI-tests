import { test as base } from "@playwright/test";
import { LoginPage } from "@/pages/login-page";
import { ProductsPage } from "@/pages/products/products-page";
import { ProductDetailsPage } from "@/pages/products/product-details-page";
import { CartPage } from "@/pages/cart-page";
import { CheckoutUserInformationPage } from "@/pages/checkout/checkout-user-information-page";
import { CheckoutDetailsPage } from "@/pages/checkout/checkout-details-page";
import { CheckoutSuccessPage } from "@/pages/checkout/checkout-success-page";
import { BurgerMenu } from "@/pages/components/burger-menu";
import { CheckoutFlow } from "@/flows/checkout-flow";

type PageFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
  checkoutUserInformationPage: CheckoutUserInformationPage;
  checkoutDetailsPage: CheckoutDetailsPage;
  checkoutSuccessPage: CheckoutSuccessPage;
  burgerMenu: BurgerMenu;
  checkoutFlow: CheckoutFlow;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutUserInformationPage: async ({ page }, use) => {
    await use(new CheckoutUserInformationPage(page));
  },

  checkoutDetailsPage: async ({ page }, use) => {
    await use(new CheckoutDetailsPage(page));
  },

  checkoutSuccessPage: async ({ page }, use) => {
    await use(new CheckoutSuccessPage(page));
  },

  burgerMenu: async ({ page }, use) => {
    await use(new BurgerMenu(page));
  },

  checkoutFlow: async (
    {
      productsPage,
      cartPage,
      checkoutUserInformationPage,
      checkoutDetailsPage,
      checkoutSuccessPage,
    },
    use,
  ) => {
    await use(
      new CheckoutFlow(
        productsPage,
        cartPage,
        checkoutUserInformationPage,
        checkoutDetailsPage,
        checkoutSuccessPage,
      ),
    );
  },
});

export { expect } from "@playwright/test";
