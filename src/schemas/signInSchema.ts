import z from "zod";


// validate the input during sign in process
export const signInSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});
