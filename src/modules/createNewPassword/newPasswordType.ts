import { nonempty } from "@/core/utils/formUtils";
import { z } from "zod";
export interface newPasswordType {
  resetToken: string;
  newPassword: string;
  confirmNewPassword: string;
}
export const newPasswordSchema = z.object({
  resetToken: z.string().pipe(nonempty),
  newPassword: z.string().pipe(nonempty),
  confirmNewPassword: z.string().pipe(nonempty),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ["confirmNewPassword"],
});
export type newPasswordFormValues = z.infer<typeof newPasswordSchema>;
