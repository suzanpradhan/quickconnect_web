import { z } from "zod";
export interface MessageType {
  id: string;
  chatId: string;
  senderId: string;
  receiverId: string | null;
  name: string;
  message: string;
  messageType: string;
  createdAt: string;
  attachmentURL: string | null;
  mediaType: string | null;
}

export const CreateMessageSchema = z.object({
  chatId: z.string().nonempty(),
  message: z.string().nonempty(),
});

export type SendMessageValues = z.infer<typeof CreateMessageSchema>;

export type SendMessageRequest = {
  chatId: string;
  message: string;
  senderId: string;
};
