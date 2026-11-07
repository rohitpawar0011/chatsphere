
import { Component } from '@angular/core';
import { ConversationList } from '../../components/conversation-list/conversation-list';
import { ChatWindow } from '../../components/chat-window/chat-window';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [ConversationList, ChatWindow],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.css'
})
export class ChatPage {}
