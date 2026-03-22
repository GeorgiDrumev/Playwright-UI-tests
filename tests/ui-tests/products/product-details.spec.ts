import { test } from "@fixtures/base-ui-test";
import { expectedProducts } from "@data/test-data/product-data";

test.describe("Product Details Tests", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
  });

  test(
    "should display correct product details when clicking on product",
    { tag: ["@products", "@positive"] },
    async ({ productsPage, productDetailsPage }) => {
      const expectedProduct = expectedProducts[0];

      await test.step("Given", async () => {});

      await test.step("When", async () => {
        await productsPage.navigateToProductDetails(expectedProduct.name);
      });

      await test.step("Then", async () => {
        await productDetailsPage.validator.expectProductDetails(
          expectedProduct,
        );
      });
    },
  );

  test(
    "should navigate to product details and add to cart",
    { tag: ["@products", "@positive"] },
    async ({ productsPage, productDetailsPage }) => {
      const product = expectedProducts[0];

      await test.step("Given", async () => {
        await productsPage.navigateToProductDetails(product.name);
      });

      await test.step("When", async () => {
        await productDetailsPage.addToCart();
      });

      await test.step("Then", async () => {
        await productDetailsPage.validator.expectProductInCart();
      });
    },
  );

  test(
    "should navigate back to products page",
    { tag: ["@products", "@positive"] },
    async ({ productsPage, productDetailsPage }) => {
      const product = expectedProducts[0];

      await test.step("Given", async () => {
        await productsPage.navigateToProductDetails(product.name);
      });

      await test.step("When", async () => {
        await productDetailsPage.clickBackButton();
      });

      await test.step("Then", async () => {
        await productsPage.validator.expectPageLoaded();
      });
    },
  );

  test(
    "should remove product from cart on details page",
    { tag: ["@products", "@positive"] },
    async ({ productsPage, productDetailsPage }) => {
      const product = expectedProducts[0];

      await test.step("Given", async () => {
        await productsPage.navigateToProductDetails(product.name);
        await productDetailsPage.addToCart();
      });

      await test.step("When", async () => {
        await productDetailsPage.removeFromCart();
      });

      await test.step("Then", async () => {
        await productDetailsPage.validator.expectProductNotInCart();
      });
    },
  );
});
