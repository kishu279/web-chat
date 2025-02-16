const { z } = require("zod");

const userSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  userName: z.string().nullable(),
});

module.exports = { userSchema };
