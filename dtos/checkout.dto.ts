import { z } from "zod";

export const CheckoutInformationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  postalCode: z.string(),
});

export type CheckoutInformation = z.infer<typeof CheckoutInformationSchema>;
