import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat';
import { LucidePaperclip, LucideSend } from '@lucide/angular';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule, LucidePaperclip, LucideSend],
  templateUrl: './message-input.html',
  styleUrl: './message-input.css'
})
export class MessageInput {

  private readonly chatService = inject(ChatService);

  protected readonly message = signal('');

  sendMessage(): void {
    const content = this.message().trim();

    if (!content) {
      return;
    }

    this.chatService.sendMessage(content);

    this.message.set('');
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}