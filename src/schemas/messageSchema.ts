import z from "zod";

// validate the message schema during its processing
export const messageSchema = z.object({
  content: z
    .string()
    .min(1, { message: "content should be atleast one character" })
    .max(300, { message: "message should not exceed 300 characters" }),
});
