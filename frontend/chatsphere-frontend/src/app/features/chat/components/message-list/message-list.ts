
import { Component, inject } from '@angular/core';
import { RelativeTimePipe } from '../../../../shared/pipes/relative-time-pipe';
import { ChatService } from '../../services/chat';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [RelativeTimePipe],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css'
})
export class MessageList {

  protected readonly chatService = inject(ChatService);

}
