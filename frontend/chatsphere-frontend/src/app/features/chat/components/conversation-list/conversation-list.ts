
import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChatService } from '../../services/chat';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './conversation-list.html',
  styleUrl: './conversation-list.css'
})
export class ConversationList {

  // Inject ChatService
  protected readonly chatService = inject(ChatService);

  // Select a conversation
  selectConversation(id: string): void {
    this.chatService.selectConversation(id);
  }
}
