export interface ChatType {
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

export interface MessagesType {
  id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  content: string;
  messageType: string;
  createdAt: string;
}

export interface MemberObject {
  chat: ChatType[]; 
  members: ChatMemberType[]; 
  messages: MessagesType[]; 
}
