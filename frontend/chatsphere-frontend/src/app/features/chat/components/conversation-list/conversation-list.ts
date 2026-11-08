import { Component, inject } from '@angular/core';
import { ChatService } from '../../services/chat';
import { RelativeTimePipe } from '../../../../shared/pipes/relative-time-pipe';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [
    RelativeTimePipe
  ],
  templateUrl: './conversation-list.html',
  styleUrl: './conversation-list.css'
})
export class ConversationList {

  protected readonly chatService = inject(ChatService);

  selectConversation(id: string): void {
    this.chatService.selectConversation(id);
  }

  updateSearchTerm(value: string): void {
    this.chatService.searchTerm.set(value);
  }
}