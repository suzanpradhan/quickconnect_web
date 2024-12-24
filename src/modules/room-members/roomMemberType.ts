type Chat = {
  id: string;
  name: string;
  isGroupChat: boolean;
  createdAt: string;
};

type Member = {
  id: string;
  chatId: string;
  userId: string;
  memberName: string;
  receiverId: string | null;
  isAdmin: boolean;
  joinedAt: string;
};

type Message = {
  id: string;
  chatId: string;
  senderId: string;
  receiverId: string | null;
  name: string;
  message: string;
  messageType: "text" | "attachment";
  timestamp: string;
  attachmentURL: string | null;
  mediaType: string | null;
};

type ChatData = {
  chat: Chat[];
  members: Member[];
  messages: Message[];
};
