import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
 
import { AuthService } from '../../../services/auth';
@Component({
  selector: 'app-login-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-dashboard.html',
  styleUrl: './login-dashboard.css',
})
export class LoginDashboard {

    

  private authService = inject(AuthService);
  private router = inject(Router);

  // Reactive UI state
  isLoading = false;

  errorMessage: string | null = null;

  // Login form model
  credentials = {
    username: '',
    password: ''
  };

  onLogin(): void {

    this.isLoading = true;

    this.errorMessage = null;

    this.authService
      .login(this.credentials)
      .subscribe({

        next: (response) => {

          this.isLoading = false;

          const role = response.role;

          // Role-based navigation
          switch (role) {

            case 'ADMIN':
              this.router.navigate(['/admin']);
              break;

            case 'CUSTOMER':
              this.router.navigate(['/customer']);
              break;

            case 'RECEPTION':
              this.router.navigate(['/reception']);
              break;

            case 'STAFF':
              this.router.navigate(['/staff']);
              break;

            default:
              this.router.navigate(['/login']);
          }
        },

        error: (err) => {

          this.isLoading = false;

          console.error(
            'Login Error:',
            err
          );

          this.errorMessage =
            err?.error?.message ||
            'Invalid username or password';
        }
      });
  }

}
