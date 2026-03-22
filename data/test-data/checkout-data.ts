export type { CheckoutInformation } from "@dtos/checkout.dto";

export const checkoutInformation = {
  validInfo: {
    firstName: "John",
    lastName: "Doe",
    postalCode: "12345",
  },
  emptyFirstName: {
    firstName: "",
    lastName: "Doe",
    postalCode: "12345",
  },
  emptyLastName: {
    firstName: "John",
    lastName: "",
    postalCode: "12345",
  },
  emptyPostalCode: {
    firstName: "John",
    lastName: "Doe",
    postalCode: "",
  },
  allEmpty: {
    firstName: "",
    lastName: "",
    postalCode: "",
  },
  specialCharacters: {
    firstName: "John@#$%",
    lastName: "Doe!&*()",
    postalCode: "@#$%^",
  },
  longNames: {
    firstName: "A".repeat(100),
    lastName: "B".repeat(100),
    postalCode: "12345",
  },
};
