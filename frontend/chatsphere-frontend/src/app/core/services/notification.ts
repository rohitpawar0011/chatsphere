import { Injectable, computed, signal } from '@angular/core';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class Notification {

  private readonly _notifications = signal<AppNotification[]>([]);

  readonly notifications = this._notifications.asReadonly();

  readonly unreadCount = computed(() =>
    this._notifications().filter(notification => !notification.read).length
  );

  // Add notification
  addNotification(title: string, message: string): void {

    const notification: AppNotification = {
      id: crypto.randomUUID(),
      title,
      message,
      createdAt: new Date(),
      read: false
    };

    this._notifications.update(current => [
      notification,
      ...current
    ]);
  }

  // Mark notification as read
  markAsRead(id: string): void {

    this._notifications.update(current =>
      current.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  }

  // Mark all notifications as read
  markAllAsRead(): void {

    this._notifications.update(current =>
      current.map(notification => ({
        ...notification,
        read: true
      }))
    );
  }

  // Remove notification
  removeNotification(id: string): void {

    this._notifications.update(current =>
      current.filter(notification => notification.id !== id)
    );
  }

  // Clear all notifications
  clearAll(): void {
    this._notifications.set([]);
  }

}