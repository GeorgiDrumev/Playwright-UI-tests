import { z } from "zod";

export const UserCredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type UserCredentials = z.infer<typeof UserCredentialsSchema>;
