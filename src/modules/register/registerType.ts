import { nonempty } from "@/core/utils/formUtils";
import { z } from "zod";
export const registerSchema = z.object({
  name: z.string().pipe(nonempty),
  email: z.string().pipe(nonempty),
  password: z.string().pipe(nonempty),
  confirmPassword: z.string().pipe(nonempty)
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
export type RegisterFormInputs = z.infer<typeof registerSchema>;


