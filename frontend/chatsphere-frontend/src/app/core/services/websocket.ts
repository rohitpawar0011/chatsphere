
import { Injectable, inject } from '@angular/core';
import {
  Client,
  StompSubscription
} from '@stomp/stompjs';

import { environment } from '../../../environments/environment';
import {
  Notification as NotificationService,
  IncomingNotification
} from './notification';
import { ChatService } from '../../features/chat/services/chat';
import { IncomingChatMessage } from '../../features/chat/models/chat.models';

@Injectable({
  providedIn: 'root'
})
export class Websocket {

  private client!: Client;

  private readonly brokerURL = environment.websocketUrl;

  private readonly notificationService = inject(NotificationService);
  private readonly chatService = inject(ChatService);

  // Connect to WebSocket server
  connect(): void {

    if (this.client?.active) {
      return;
    }

    this.client = new Client({
      brokerURL: this.brokerURL,
      reconnectDelay: 5000,

      onConnect: () => {
        console.log('WebSocket connected successfully');
      },

      onStompError: (frame) => {
        console.error('STOMP error:', frame.headers['message']);
      },

      onWebSocketError: (error) => {
        console.error('WebSocket error:', error);
      }
    });

    this.client.activate();
  }

  // Subscribe to a destination
  subscribe(
    destination: string,
    callback: (message: string) => void
  ): StompSubscription | undefined {

    if (!this.client?.connected) {
      console.error('WebSocket is not connected');
      return undefined;
    }

    return this.client.subscribe(
      destination,
      message => callback(message.body)
    );
  }

  // Subscribe to incoming notifications
  subscribeToNotifications(
    destination: string
  ): StompSubscription | undefined {

    return this.subscribe(destination, (message) => {
      try {
        const notification: IncomingNotification = JSON.parse(message);

        this.notificationService.addIncomingNotification(notification);

      } catch (error) {
        console.error('Invalid notification message:', error);
      }
    });
  }

  // Send a message
  send(destination: string, body: unknown): void {

    if (!this.client?.connected) {
      console.error('WebSocket is not connected');
      return;
    }

    this.client.publish({
      destination,
      body: JSON.stringify(body)
    });
  }
  subscribeToMessages(
  destination: string
): StompSubscription | undefined {

  return this.subscribe(destination, (message) => {
    try {
      const data: IncomingChatMessage = JSON.parse(message);

      this.chatService.receiveMessage(
        data.conversationId,
        data.content
      );

    } catch (error) {
      console.error('Invalid chat message:', error);
    }
  });
}

  // Disconnect
  disconnect(): void {

    if (this.client?.active) {
      void this.client.deactivate();
    }
  }

}
