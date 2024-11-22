import { nonempty } from "@/core/utils/formUtils";
import { z } from "zod";

export interface ProfileType{
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
   gender: "Male" | "Female" | "Others"; 
  }
export const profileSchema = z.object({
    name: z.string().pipe(nonempty),
    phoneNumber: z.string(),
    email: z.string().pipe(nonempty),
    gender: z.enum(["Male", "Female", "Others"], { errorMap: () => ({ message: "Gender is required" }) }),
  });
  
  export type ProfileFormValues = z.infer<typeof profileSchema>;

  export interface ProfileDataType {
    user: ProfileType
  } 