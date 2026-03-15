import { ProductsPage } from "@/pages/products/products-page";
import { CartPage } from "@/pages/cart-page";
import { CheckoutUserInformationPage } from "@/pages/checkout/checkout-user-information-page";
import { CheckoutDetailsPage } from "@/pages/checkout/checkout-details-page";
import { CheckoutSuccessPage } from "@/pages/checkout/checkout-success-page";
import { CheckoutInformation } from "@data/test-data/checkout-data";
import { ProductData } from "@data/test-data/product-data";

export class CheckoutFlow {
  constructor(
    private readonly productsPage: ProductsPage,
    private readonly cartPage: CartPage,
    private readonly checkoutUserInformationPage: CheckoutUserInformationPage,
    private readonly checkoutDetailsPage: CheckoutDetailsPage,
    private readonly checkoutSuccessPage: CheckoutSuccessPage,
  ) {}

  public async addProductsAndNavigateToCart(products: ProductData[]) {
    for (const product of products) {
      await this.productsPage.addProductToCart(product.name);
    }
    await this.productsPage.navigateToCart();
    await this.cartPage.verifyPageLoaded();
  }

  public async proceedToCheckoutInformation() {
    await this.cartPage.clickCheckout();
    await this.checkoutUserInformationPage.verifyPageLoaded();
  }

  public async fillInformationAndProceed(info: CheckoutInformation) {
    await this.checkoutUserInformationPage.fillCheckoutInformation(info);
    await this.checkoutUserInformationPage.clickContinue();
    await this.checkoutDetailsPage.verifyPageLoaded();
  }

  public async completeOrder() {
    await this.checkoutDetailsPage.clickFinish();
    await this.checkoutSuccessPage.verifyPageLoaded();
  }

  public async completeCheckoutFlow(
    products: ProductData[],
    info: CheckoutInformation,
  ) {
    await this.addProductsAndNavigateToCart(products);
    await this.proceedToCheckoutInformation();
    await this.fillInformationAndProceed(info);
    await this.completeOrder();
  }

  public async navigateToCheckoutDetails(info: CheckoutInformation) {
    await this.proceedToCheckoutInformation();
    await this.fillInformationAndProceed(info);
  }
}
