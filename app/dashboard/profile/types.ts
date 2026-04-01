import { z } from "zod";
export const UserSchema = z.object({
  full_name: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof UserSchema>;