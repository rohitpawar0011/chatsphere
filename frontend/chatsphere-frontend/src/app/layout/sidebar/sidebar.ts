import { Component } from '@angular/core';
import {
  LucideMessageCircle,
  LucideUsers,
  LucideUserRound,
  LucideSettings
} from '@lucide/angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    LucideMessageCircle,
    LucideUsers,
    LucideUserRound,
    LucideSettings
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
}