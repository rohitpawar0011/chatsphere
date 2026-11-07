
import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChatService } from '../../services/chat';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css'
})
export class MessageList {

  protected readonly chatService = inject(ChatService);

}
