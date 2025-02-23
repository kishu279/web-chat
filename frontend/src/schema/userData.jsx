import { z } from "zod";

const userSchema = z.object({
  userName: z.string().nullable(),
  email: z.string().email(),
  password: z.string(),
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
