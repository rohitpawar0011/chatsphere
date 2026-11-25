import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { ConfirmationDialog } from '../../shared/components/confirmation-dialog/confirmation-dialog';
import { Notification } from '../../core/services/notification';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    DatePipe,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  private readonly dialog = inject(MatDialog);

  protected readonly notificationService = inject(Notification);

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  markAsRead(id: string): void {
    this.notificationService.markAsRead(id);
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead();
  }

  clearNotifications(): void {
    this.notificationService.clearAll();
  }

  logout(): void {

    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '400px',
      data: {
        title: 'Logout',
        message: 'Are you sure you want to logout?',
        confirmText: 'Logout',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
      this.authService.logout();
      this.router.navigate(['/login']);
   }
    });

  
  }
  testNotification(): void {
  this.notificationService.addNotification(
    'New Message',
    'Amit Kumar sent you a message.'
  );
}

}