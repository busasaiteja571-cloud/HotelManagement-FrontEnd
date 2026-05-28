import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthService } from '../../services/auth';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);

  const router = inject(Router);

  // Check token exists
  if (authService.isLoggedIn()) {

    return true;
  }

  // Redirect to login
  router.navigate(['/login']);

  return false;
};