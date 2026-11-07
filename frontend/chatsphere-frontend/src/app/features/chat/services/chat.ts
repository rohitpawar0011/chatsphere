
import { Injectable, signal, computed } from '@angular/core';
import { Conversation } from '../models/chat.models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // 1. Mock conversation data
  private _conversations = signal<Conversation[]>([
    {
      id: '1',
      name: 'Amit Kumar',
      initials: 'AK',
      online: true,
      lastMessage: 'Hey! How are you?',
      updatedAt: new Date(),
      unreadCount: 2,
      messages: [
        {
          id: 'm1',
          content: 'Hey! How are you?',
          sender: 'other',
          createdAt: new Date(Date.now() - 60000),
          status: 'read'
        },
        {
          id: 'm2',
          content: "I'm good! Working on ChatSphere.",
          sender: 'me',
          createdAt: new Date(Date.now() - 30000),
          status: 'read'
        }
      ]
    },
    {
      id: '2',
      name: 'Rahul Sharma',
      initials: 'RS',
      online: false,
      lastMessage: 'See you tomorrow!',
      updatedAt: new Date(Date.now() - 3600000),
      unreadCount: 0,
      messages: [
        {
          id: 'm3',
          content: 'Are we meeting tomorrow?',
          sender: 'me',
          createdAt: new Date(Date.now() - 3700000),
          status: 'read'
        },
        {
          id: 'm4',
          content: 'See you tomorrow!',
          sender: 'other',
          createdAt: new Date(Date.now() - 3600000),
          status: 'read'
        }
      ]
    },
    {
      id: '3',
      name: 'Priya Patel',
      initials: 'PP',
      online: true,
      lastMessage: 'Did you check the project?',
      updatedAt: new Date(Date.now() - 7200000),
      unreadCount: 1,
      messages: [
        {
          id: 'm5',
          content: 'Did you check the project?',
          sender: 'other',
          createdAt: new Date(Date.now() - 7200000),
          status: 'read'
        }
      ]
    }
  ]);

  // 2. Expose read-only conversation state
  readonly conversations = this._conversations.asReadonly();

  // 3. Store selected conversation ID
  readonly selectedConversationId = signal<string>('1');

  // 4. Get selected conversation automatically
  readonly selectedConversation = computed(() =>
    this.conversations().find(
      conversation =>
        conversation.id === this.selectedConversationId()
    ) ?? null
  );

  // 5. Select a conversation
  selectConversation(id: string): void {
    this.selectedConversationId.set(id);
  }

  sendMessage(content: string): void {

  const conversationId = this.selectedConversationId();

  const newMessage = {
    id: crypto.randomUUID(),
    content,
    sender: 'me' as const,
    createdAt: new Date(),
    status: 'sent' as const
  };

  this._conversations.update(conversations =>
    conversations.map(conversation =>
      conversation.id === conversationId
        ? {
            ...conversation,
            messages: [
              ...conversation.messages,
              newMessage
            ],
            lastMessage: content,
            updatedAt: new Date()
          }
        : conversation
    )
  );
}
}
