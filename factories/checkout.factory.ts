import { faker } from "@faker-js/faker";
import type { CheckoutInformation } from "@dtos/checkout.dto";

export class CheckoutFactory {
  static build(
    overrides: Partial<CheckoutInformation> = {},
  ): CheckoutInformation {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode(),
      ...overrides,
    };
  }

  static buildMany(
    count: number,
    overrides: Partial<CheckoutInformation> = {},
  ): CheckoutInformation[] {
    return Array.from({ length: count }, () =>
      CheckoutFactory.build(overrides),
    );
  }
}
