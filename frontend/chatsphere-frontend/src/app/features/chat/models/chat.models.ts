
export interface Message {
  id: string;
  content: string;
  sender: 'me' | 'other';
  createdAt: Date;
  status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  name: string;
  initials: string;
  online: boolean;
  lastMessage: string;
  updatedAt: Date;
  unreadCount: number;
  messages: Message[];
}
export interface IncomingChatMessage {
  conversationId: string;
  content: string;
}