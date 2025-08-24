import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export type UserRole = 'admin' | 'user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private userKey = 'dynamicFormUser';


  login(username: string, role: UserRole) {
    const user = { username, role };
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.userKey);
    }
  }

  getUser() {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  isAdmin() {
    const user = this.getUser();
    return user?.role === 'admin';
  }

  isLoggedIn() {
    return !!this.getUser();
  }
}
