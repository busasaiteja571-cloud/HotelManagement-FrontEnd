import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import {
  LoginCredentials,
  AuthResponse
} from '../core/models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // Dependency Injection
  private http = inject(HttpClient);

  // ADD THIS
  private router = inject(Router);

  // Backend API
  private readonly apiUrl =
    'http://localhost:8080/api/auth';

  login(
    credentials: LoginCredentials
  ): Observable<AuthResponse> {

    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/login`,
        credentials
      )
      .pipe(
        tap((response: AuthResponse) => {

          if (response?.token) {

            // Store JWT Token
            localStorage.setItem(
              'auth_token',
              response.token
            );

            // Store Role
            localStorage.setItem(
              'user_role',
              response.role
            );

            // Store Username
            localStorage.setItem(
              'username',
              response.username
            );
          }
        })
      );
  }

  logout(): void {

    // Remove auth data
    localStorage.removeItem('auth_token');

    localStorage.removeItem('user_role');

    localStorage.removeItem('username');

    // Redirect to login
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem('auth_token');
  }

  getToken(): string | null {

    return localStorage.getItem('auth_token');
  }

  getRole(): string | null {

    return localStorage.getItem('user_role');
  }
}