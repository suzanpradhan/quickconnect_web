import { z } from "zod"; 

export const CreateMessageSchema = z.object({
    message: z.string().nonempty("message is required"),
});

export type CreateMessageValues = z.infer<typeof CreateMessageSchema>;


