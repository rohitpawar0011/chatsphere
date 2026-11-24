import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _isAuthenticated = signal(false);

  readonly isAuthenticated = this._isAuthenticated.asReadonly();

  login(email: string, password: string): boolean {

    // Temporary mock authentication
    this._isAuthenticated.set(true);

    return true;
  }

  register(name: string, email: string, password: string): boolean {

    // Temporary mock registration
    this._isAuthenticated.set(true);

    return true;
  }

  logout(): void {
    this._isAuthenticated.set(false);
  }

}