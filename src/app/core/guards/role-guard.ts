import { inject } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  UrlTree,
} from '@angular/router';

import { AuthService } from '../../services/auth.service';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
): boolean | UrlTree => {

  const authService = inject(AuthService);

  const router = inject(Router);

  const userRole = authService.getRole();

  const allowedRoles =
    route.data?.['roles'];

  // No role config
  if (!allowedRoles) {

    console.error(
      'Roles missing in route'
    );

    return router.createUrlTree([
      '/login'
    ]);
  }

  // Role allowed
  if (
    userRole &&
    allowedRoles.includes(userRole)
  ) {
    return true;
  }

  console.error(
    'Access Denied'
  );

  // Redirect safely
  return router.createUrlTree([
    '/login'
  ]);
};