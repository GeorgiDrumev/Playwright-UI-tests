import { ProductData } from "@data/test-data/product-data";

export class CheckoutUtils {
  private static readonly TAX_RATE = 0.08;

  public static calculateSubtotalAmount(products: ProductData[]): number {
    return parseFloat(products.reduce((sum, p) => sum + p.price, 0).toFixed(2));
  }

  public static calculateTaxAmount(subtotal: number): number {
    return parseFloat((subtotal * this.TAX_RATE).toFixed(2));
  }

  public static calculateTotalAmount(subtotal: number, tax: number): number {
    return parseFloat((subtotal + tax).toFixed(2));
  }

  public static parsePrice(priceText: string, prefix: string): number {
    return parseFloat(priceText.replace(prefix, ""));
  }
}
