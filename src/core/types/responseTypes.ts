export interface PaginatedResponseType<T> {
  messages: T[];
  // pagination: PaginationInfo;
  limit: number;
  page: number;
  totalMessages: number;
  totalPages: number;
}

export interface PaginationInfo {}

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
