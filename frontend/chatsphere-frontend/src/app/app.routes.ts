
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout')
        .then(m => m.MainLayout),

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/chat/pages/chat-page/chat-page')
            .then(m => m.ChatPage)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
