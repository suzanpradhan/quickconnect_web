import { nonempty } from "@/core/utils/formUtils"; 
import { z } from "zod"; 

export interface resetPasswordType { 
  oldPassword: string; 
  newPassword: string; 
  confirmNewPassword: string; 
}
export const resetPasswordSchema = z.object({
  oldPassword: z.string().pipe(nonempty),
  newPassword: z.string().pipe(nonempty),
  confirmNewPassword: z.string().pipe(nonempty),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "New password and confirm password must match",
  path: ["confirmNewPassword"],
});

export type resetPasswordValues = z.infer<typeof resetPasswordSchema>;
