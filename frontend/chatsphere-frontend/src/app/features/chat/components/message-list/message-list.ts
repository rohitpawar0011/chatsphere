
import {
  Component,
  inject,
  ElementRef,
  ViewChild,
  effect,
  afterNextRender,
  Injector,
  runInInjectionContext
} from '@angular/core';

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

  private readonly injector = inject(Injector);

  @ViewChild('messageContainer')
  private messageContainer?: ElementRef<HTMLDivElement>;

  constructor() {

    effect(() => {

      // Track conversation and message changes
      this.chatService.selectedConversation();

      runInInjectionContext(this.injector, () => {

        afterNextRender(() => {

          const container = this.messageContainer?.nativeElement;

          if (container) {
            container.scrollTo({
              top: container.scrollHeight,
              behavior: 'smooth'
            });
          }

        });

      });

    });

  }

}
