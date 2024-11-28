import { nonempty } from "@/core/utils/formUtils";
import { z } from "zod";

// images
const imageFile = z.instanceof(File).refine(
  (file) => {
    const acceptedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
      "image/svg",
    ];
    return acceptedImageTypes.includes(file.type);
  },
  {
    message: "Invalid file type. Only image files are allowed.",
  }
);

export interface ProfileType<t> {
  id: string;
  avatar: File | string | null; 
  name: string;
  phoneNumber: string;
  email: string;
  gender: "Male" | "Female" | "Others";
}

export const profileSchema = z.object({
  name: z.string().pipe(nonempty),
  avatar: imageFile.optional().nullable(),
  phoneNumber: z.string(),
  email: z.string().pipe(nonempty),
  gender: z.enum(["Male", "Female", "Others"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export interface ProfileDataType {
  user: ProfileType<number>;
}

