import { test } from "@/fixtures/base-ui-test";
import { expectedProducts } from "@data/test-data/product-data";
import { SortOrder, SortOption } from "@/types/sort-types";

test.describe("Products Tests", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
    await productsPage.verifyPageLoaded();
  });

  test(
    "should display all expected products on the page",
    { tag: ["@products", "@positive"] },
    async ({ productsPage }) => {
      await productsPage.verifyProductsAreDisplayed();
      await productsPage.verifyProductCount(expectedProducts.length);
      await productsPage.verifyProductNames(expectedProducts);
    },
  );

  test(
    "should add product to cart and update cart badge",
    { tag: ["@products", "@positive"] },
    async ({ productsPage }) => {
      const productToAdd = expectedProducts[0].name;

      await productsPage.addProductToCart(productToAdd);
      await productsPage.verifyCartBadgeCount("1");
      await productsPage.verifyProductIsInCart(productToAdd);
    },
  );

  test(
    "should add multiple products to cart and update badge count",
    { tag: ["@products", "@positive"] },
    async ({ productsPage }) => {
      await productsPage.addProductToCart(expectedProducts[0].name);
      await productsPage.verifyCartBadgeCount("1");

      await productsPage.addProductToCart(expectedProducts[1].name);
      await productsPage.verifyCartBadgeCount("2");

      await productsPage.addProductToCart(expectedProducts[2].name);
      await productsPage.verifyCartBadgeCount("3");
    },
  );

  test(
    "should remove product from cart and update badge count",
    { tag: ["@products", "@positive"] },
    async ({ productsPage }) => {
      const productToAdd = expectedProducts[0].name;

      await productsPage.addProductToCart(productToAdd);
      await productsPage.verifyCartBadgeCount("1");
      await productsPage.verifyProductIsInCart(productToAdd);

      await productsPage.removeProductFromCart(productToAdd);
      await productsPage.verifyCartBadgeNotVisible();
    },
  );

  test(
    "should sort products by name A to Z",
    { tag: ["@products", "@positive"] },
    async ({ productsPage }) => {
      await productsPage.sortProducts(SortOption.NAME_AZ);
      await productsPage.verifyProductsSortedByName(
        expectedProducts,
        SortOrder.ASCENDING,
      );
    },
  );

  test(
    "should sort products by name Z to A",
    { tag: ["@products", "@positive"] },
    async ({ productsPage }) => {
      await productsPage.sortProducts(SortOption.NAME_ZA);
      await productsPage.verifyProductsSortedByName(
        expectedProducts,
        SortOrder.DESCENDING,
      );
    },
  );

  test(
    "should sort products by price low to high",
    { tag: ["@products", "@positive"] },
    async ({ productsPage }) => {
      await productsPage.sortProducts(SortOption.PRICE_LOW_HIGH);
      await productsPage.verifyProductsSortedByPrice(
        expectedProducts,
        SortOrder.ASCENDING,
      );
    },
  );

  test(
    "should sort products by price high to low",
    { tag: ["@products", "@positive"] },
    async ({ productsPage }) => {
      await productsPage.sortProducts(SortOption.PRICE_HIGH_LOW);
      await productsPage.verifyProductsSortedByPrice(
        expectedProducts,
        SortOrder.DESCENDING,
      );
    },
  );
});
