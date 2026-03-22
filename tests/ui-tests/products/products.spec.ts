import { test } from "@fixtures/base-ui-test";
import { expectedProducts } from "@data/test-data/product-data";
import { SortOrder, SortOption } from "../../../types/sort-types";

test.describe("Products Tests", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
  });

  test(
    "should display all expected products on the page",
    { tag: ["@products", "@positive"] },
    async ({ productsPage }) => {
      await test.step("Given", async () => {});

      await test.step("When", async () => {});

      await test.step("Then", async () => {
        await productsPage.validator.expectProductsDisplayed();
        await productsPage.validator.expectProductCount(
          expectedProducts.length,
        );
        await productsPage.validator.expectProductNames(expectedProducts);
      });
    },
  );

  test(
    "should add product to cart and update cart badge",
    { tag: ["@products", "@positive"] },
    async ({ productsPage }) => {
      const productToAdd = expectedProducts[0].name;

      await test.step("Given", async () => {});

      await test.step("When", async () => {
        await productsPage.addProductToCart(productToAdd);
      });

      await test.step("Then", async () => {
        await productsPage.validator.expectCartBadgeCount("1");
        await productsPage.validator.expectProductInCart(productToAdd);
      });
    },
  );

  test(
    "should add multiple products to cart and update badge count",
    { tag: ["@products", "@positive"] },
    async ({ productsPage }) => {
      await test.step("Given", async () => {});

      await test.step("When", async () => {
        await productsPage.addProductToCart(expectedProducts[0].name);
        await productsPage.addProductToCart(expectedProducts[1].name);
        await productsPage.addProductToCart(expectedProducts[2].name);
      });

      await test.step("Then", async () => {
        await productsPage.validator.expectCartBadgeCount("3");
      });
    },
  );

  test(
    "should remove product from cart and update badge count",
    { tag: ["@products", "@positive"] },
    async ({ productsPage }) => {
      const productToAdd = expectedProducts[0].name;

      await test.step("Given", async () => {
        await productsPage.addProductToCart(productToAdd);
      });

      await test.step("When", async () => {
        await productsPage.removeProductFromCart(productToAdd);
      });

      await test.step("Then", async () => {
        await productsPage.validator.expectCartBadgeNotVisible();
      });
    },
  );

  test(
    "should sort products by name A to Z",
    { tag: ["@products", "@positive"] },
    async ({ productsPage }) => {
      await test.step("Given", async () => {});

      await test.step("When", async () => {
        await productsPage.sortProducts(SortOption.NAME_AZ);
      });

      await test.step("Then", async () => {
        await productsPage.validator.expectProductsSortedByName(
          expectedProducts,
          SortOrder.ASCENDING,
        );
      });
    },
  );

  test(
    "should sort products by name Z to A",
    { tag: ["@products", "@positive"] },
    async ({ productsPage }) => {
      await test.step("Given", async () => {});

      await test.step("When", async () => {
        await productsPage.sortProducts(SortOption.NAME_ZA);
      });

      await test.step("Then", async () => {
        await productsPage.validator.expectProductsSortedByName(
          expectedProducts,
          SortOrder.DESCENDING,
        );
      });
    },
  );

  test(
    "should sort products by price low to high",
    { tag: ["@products", "@positive"] },
    async ({ productsPage }) => {
      await test.step("Given", async () => {});

      await test.step("When", async () => {
        await productsPage.sortProducts(SortOption.PRICE_LOW_HIGH);
      });

      await test.step("Then", async () => {
        await productsPage.validator.expectProductsSortedByPrice(
          expectedProducts,
          SortOrder.ASCENDING,
        );
      });
    },
  );

  test(
    "should sort products by price high to low",
    { tag: ["@products", "@positive"] },
    async ({ productsPage }) => {
      await test.step("Given", async () => {});

      await test.step("When", async () => {
        await productsPage.sortProducts(SortOption.PRICE_HIGH_LOW);
      });

      await test.step("Then", async () => {
        await productsPage.validator.expectProductsSortedByPrice(
          expectedProducts,
          SortOrder.DESCENDING,
        );
      });
    },
  );
});
