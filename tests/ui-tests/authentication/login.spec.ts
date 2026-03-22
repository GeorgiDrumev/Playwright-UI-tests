import { test } from "@fixtures/base-unauth-ui-test";
import { testUsers, invalidCredentials } from "@data/test-data/user-data";
import { errorMessages } from "@data/test-data/error-messages";

test.describe("Login Tests", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test.describe("Positive Scenarios", () => {
    test(
      "should login successfully with valid credentials",
      { tag: ["@authentication", "@positive"] },
      async ({ loginPage, productsPage }) => {
        await test.step("Given", async () => {});

        await test.step("When", async () => {
          await loginPage.login();
        });

        await test.step("Then", async () => {
          await productsPage.validator.expectPageLoaded();
        });
      },
    );
  });

  test.describe("Negative Scenarios", () => {
    const negativeTestCases = [
      {
        name: "should show error with invalid username",
        credentials: invalidCredentials.invalidUser,
        expectedError: errorMessages.invalidCredentials,
      },
      {
        name: "should show error with invalid password",
        credentials: invalidCredentials.invalidPassword,
        expectedError: errorMessages.invalidCredentials,
      },
      {
        name: "should show error with empty username",
        credentials: invalidCredentials.emptyUsername,
        expectedError: errorMessages.usernameRequired,
      },
      {
        name: "should show error with empty password",
        credentials: invalidCredentials.emptyPassword,
        expectedError: errorMessages.passwordRequired,
      },
      {
        name: "should show error for locked out user",
        credentials: testUsers.lockedOutUser,
        expectedError: errorMessages.lockedOut,
      },
    ];

    negativeTestCases.forEach(({ name, credentials, expectedError }) => {
      test(
        name,
        { tag: ["@authentication", "@negative"] },
        async ({ loginPage }) => {
          await test.step("Given", async () => {});

          await test.step("When", async () => {
            await loginPage.login(credentials);
          });

          await test.step("Then", async () => {
            await loginPage.validator.expectErrorMessage(expectedError);
          });
        },
      );
    });

    test(
      "should redirect to login when accessing protected pages without authentication",
      { tag: ["@authentication", "@negative"] },
      async ({ checkoutUserInformationPage, loginPage }) => {
        await test.step("Given", async () => {});

        await test.step("When", async () => {
          await checkoutUserInformationPage.goto();
        });

        await test.step("Then", async () => {
          await loginPage.validator.expectPageLoaded();
        });
      },
    );
  });
});
