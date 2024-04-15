import z from "zod";

/*
Validating only those data that is required during sign up process
This is not the validation tob store data in datbase

This is actually replacement for the manual validation that
we used to write whilw performing various operation
*/

//validating a simple primitive
export const verifyUserName = z
  .string()
  .min(4, "userName should be at least 4 characters")
  .max(20, "userName should be at most 20 characters")
  .regex(/[a-zA-Z0-9_]+$/, "userName must not contain special characters");

// validating a complex object
export const verifySignup = z.object({
  username: verifyUserName,
  email: z.string().email({ message: "email is not valid" }),
  password: z
    .string()
    .min(6, { message: "password should be at least 6 characters" }),
});
