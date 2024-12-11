import { nonempty } from "@/core/utils/formUtils";
import { z } from "zod";

export interface MessageType {
    id: string;
    chatId: string;
    senderId: string;
    receiverId: string | null;
    message: string;
    messageType: string; 
    createdAt: string; 
    attachmentURL: string | null;
    mediaType: string | null;
  }

  export const CreateMessagechema = z.object({
    message: z.string().pipe(nonempty),
  });
  
  export type CreateMessageValues = z.infer<typeof CreateMessagechema>;
  
  
  
