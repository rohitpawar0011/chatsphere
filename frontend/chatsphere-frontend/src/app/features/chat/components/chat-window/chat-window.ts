
import { Component, inject } from '@angular/core';
import { ChatService } from '../../services/chat';

import { MessageList } from '../message-list/message-list';
import { MessageInput } from '../message-input/message-input';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [MessageList, MessageInput],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.css'
})
export class ChatWindow {

  protected readonly chatService = inject(ChatService);
  
  goBack(): void {
  this.chatService.clearSelectedConversation();
}

}
