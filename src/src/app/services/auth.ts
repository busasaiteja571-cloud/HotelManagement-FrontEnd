import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginCredentials,AuthResponse } from '../core/models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // Modern Angular dependency injection
  private http = inject(HttpClient);

  // Backend API URL
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

            // Store JWT token
            localStorage.setItem(
              'auth_token',
              response.token
            );

            // Store user role
            localStorage.setItem(
              'user_role',
              response.role
            );

            // Store username
            localStorage.setItem(
              'username',
              response.username
            );
          }
        })
      );
  }

  logout(): void {

    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('username');
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