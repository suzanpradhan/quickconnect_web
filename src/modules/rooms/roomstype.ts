import { z } from "zod"; 

export const CreateRoomSchema = z.object({
  chatName: z.string().nonempty("Chat name is required"),
});

export type CreateRoomValues = z.infer<typeof CreateRoomSchema>;


