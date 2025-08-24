import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserRole } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  role: UserRole = 'user';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    if (this.username && this.role) {
      this.auth.login(this.username, this.role);
      this.router.navigate(['/']);
    }
  }
}
