import z from "zod";

//validate the verification code during OTP verification
export const verifySchema = z
  .string()
  .min(6, { message: "Verify token should be 6 digits" });
