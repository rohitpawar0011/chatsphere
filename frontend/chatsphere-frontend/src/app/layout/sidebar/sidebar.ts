import { Component } from '@angular/core';
import {
  LucideMessageCircle,
  LucideUsers,
  LucideUserRound,
  LucideSettings
} from '@lucide/angular';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    LucideMessageCircle,
    LucideUsers,
    LucideUserRound,
    LucideSettings,
    MatTooltipModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
}