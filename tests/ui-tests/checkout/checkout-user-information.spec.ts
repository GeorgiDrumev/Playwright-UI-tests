import { test } from "@/fixtures/base-ui-test";
import { checkoutInformation } from "@data/test-data/checkout-data";
import { errorMessages } from "@data/test-data/error-messages";
import { expectedProducts } from "@data/test-data/product-data";

test.describe("Checkout User Information Tests", () => {
  test.beforeEach(async ({ productsPage, checkoutFlow }) => {
    await productsPage.goto();
    await productsPage.verifyPageLoaded();

    await checkoutFlow.addProductsAndNavigateToCart([expectedProducts[0]]);
    await checkoutFlow.proceedToCheckoutInformation();
  });

  test.describe("Positive Tests", () => {
    const positiveTestCases = [
      {
        testName: "should accept valid information and proceed to details page",
        data: checkoutInformation.validInfo,
      },
      {
        testName: "should accept special characters in checkout information",
        data: checkoutInformation.specialCharacters,
      },
      {
        testName: "should accept long names in checkout information",
        data: checkoutInformation.longNames,
      },
    ];

    for (const { testName, data } of positiveTestCases) {
      test(
        testName,
        { tag: ["@checkout", "@positive"] },
        async ({ checkoutUserInformationPage, checkoutDetailsPage }) => {
          await checkoutUserInformationPage.verifyPageLoaded();

          await checkoutUserInformationPage.fillCheckoutInformation(data);
          await checkoutUserInformationPage.clickContinue();

          await checkoutDetailsPage.verifyPageLoaded();
        },
      );
    }

    test(
      "should cancel and return to cart",
      { tag: ["@checkout", "@positive"] },
      async ({ checkoutUserInformationPage, cartPage }) => {
        await checkoutUserInformationPage.verifyPageLoaded();

        await checkoutUserInformationPage.clickCancel();

        await cartPage.verifyPageLoaded();
        await cartPage.verifyCartItemCount(1);
      },
    );
  });

  test.describe("Negative Tests", () => {
    const negativeTestCases = [
      {
        testName: "should display error when first name is empty",
        data: checkoutInformation.emptyFirstName,
        expectedError: errorMessages.firstNameRequired,
      },
      {
        testName: "should display error when last name is empty",
        data: checkoutInformation.emptyLastName,
        expectedError: errorMessages.lastNameRequired,
      },
      {
        testName: "should display error when postal code is empty",
        data: checkoutInformation.emptyPostalCode,
        expectedError: errorMessages.postalCodeRequired,
      },
      {
        testName: "should display error when all fields are empty",
        data: checkoutInformation.allEmpty,
        expectedError: errorMessages.firstNameRequired,
      },
    ];

    for (const { testName, data, expectedError } of negativeTestCases) {
      test(
        testName,
        { tag: ["@checkout", "@negative"] },
        async ({ checkoutUserInformationPage }) => {
          await checkoutUserInformationPage.verifyPageLoaded();

          await checkoutUserInformationPage.fillCheckoutInformation(data);
          await checkoutUserInformationPage.clickContinue();

          await checkoutUserInformationPage.verifyErrorMessageDisplayed(
            expectedError,
          );
        },
      );
    }
  });
});
