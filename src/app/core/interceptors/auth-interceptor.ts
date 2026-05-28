import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';

import { Router } from '@angular/router';

import {
  catchError,
  throwError
} from 'rxjs';

import { AuthService } from '../../services/auth';

export const authInterceptor: HttpInterceptorFn = (

  req,
  next

) => {

  const authService = inject(AuthService);

  const router = inject(Router);

  const token = authService.getToken();

  // Clone original request
  let clonedRequest = req;

  // Add JWT token
  if (token) {

    clonedRequest = req.clone({

      setHeaders: {

        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(clonedRequest).pipe(

    catchError((error: HttpErrorResponse) => {

      // Token expired or invalid
      if (error.status === 401) {

        authService.logout();

        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};