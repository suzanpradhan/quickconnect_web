export interface ChatTableType {
  id: string;
  name: string;
  isGroupChat: boolean;
  createdAt: string;
}

export interface ChatMemberType {
  id: string;
  chatId: string;
  userId: string;
  isAdmin: boolean;
  joinedAt: string;
}

export interface ChatObject {
  chat_table: ChatTableType;
  chat_member: ChatMemberType;
}
