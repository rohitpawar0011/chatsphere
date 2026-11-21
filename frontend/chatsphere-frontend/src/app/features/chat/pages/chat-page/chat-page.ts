import { Component } from '@angular/core';
import { ConversationList } from '../../components/conversation-list/conversation-list';
import { ChatWindow } from '../../components/chat-window/chat-window';
import { ChatService } from '../../services/chat';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [
    ConversationList,
    ChatWindow
  ],
  templateUrl: './chat-page.html'
})
export class ChatPage {

  constructor(
    public chatService: ChatService
  ) {}

}