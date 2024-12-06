
export interface ChatTableType {
  id: string;
  name: string;
}

export interface ChatMemberType {
  id: string;
  chatId: string;
  userId: string;
}
export interface ChatObject {
  ChatTable: ChatTableType;
  ChatMember: ChatMemberType;
}
