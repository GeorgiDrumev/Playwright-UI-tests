import { z } from "zod";

export const ProductDataSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  price: z.number().positive(),
  description: z.string().min(1),
  imageName: z.string().min(1),
});

export type ProductData = z.infer<typeof ProductDataSchema>;
