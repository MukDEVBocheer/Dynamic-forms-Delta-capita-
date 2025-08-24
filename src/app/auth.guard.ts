import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate: CanActivateFn = () => {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  };
}

@Injectable({ providedIn: 'root' })
export class AdminGuard {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate: CanActivateFn = () => {
    if (!this.auth.isLoggedIn() || !this.auth.isAdmin()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  };
}
