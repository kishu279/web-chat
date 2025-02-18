import { z } from "zod";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  // userName: z.string().nullable(),
});

const mssgSchema = z.object({
  group: z.string(),
  user: z.object({
    userName: z.string(),
    token: z.string(),
  }),
  data: z.string(),
  timestamp: z.string().datetime(),
});

export { userSchema, mssgSchema };
