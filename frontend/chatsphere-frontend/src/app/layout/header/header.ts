import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatDialogModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {logout(): void {
  console.log('Logout clicked');
}
}