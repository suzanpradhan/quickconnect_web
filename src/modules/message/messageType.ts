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
    chatId: z.string().nonempty(),  
    message: z.string().nonempty(), 
  });
  
  export type SendMessageValues = z.infer<typeof CreateMessagechema>;
  
  export type SendMessageRequest = {
    chatId: string;
    token: string;
    message:string;
    // senderName: string;
  };