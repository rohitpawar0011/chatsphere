import { Routes } from '@angular/router';

export const routes: Routes = [

  // Authentication routes (without MainLayout)
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.Login)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register')
        .then(m => m.Register)
  },

  // Main application layout
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout')
        .then(m => m.MainLayout),

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'chat'
      },
      {
        path: 'chat',
        loadComponent: () =>
          import('./features/chat/pages/chat-page/chat-page')
            .then(m => m.ChatPage)
      }
    ]
  },

  // Unknown routes
  {
    path: '**',
    redirectTo: 'login'
  }

];