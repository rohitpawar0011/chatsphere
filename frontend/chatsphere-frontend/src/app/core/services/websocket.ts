import { Injectable } from '@angular/core';
import {
  Client,
  StompSubscription
} from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class Websocket {

  private client!: Client;

  private readonly brokerURL = 'ws://localhost:8080/ws';

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
        console.error(
          'STOMP error:',
          frame.headers['message']
        );
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

  // Disconnect
  disconnect(): void {

    if (this.client?.active) {
      void this.client.deactivate();
    }
  }

}