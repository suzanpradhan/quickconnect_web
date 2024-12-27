import { nonempty } from "@/core/utils/formUtils";
import { z } from "zod";

export interface ForgotType {
  email: string;
}
export const forgotSchema = z.object({
  email: z.string().email("Invalid email format").pipe(nonempty),
});

export type ForgotFormValues = z.infer<typeof forgotSchema>;
