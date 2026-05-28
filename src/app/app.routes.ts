import { Routes } from '@angular/router';

import { LoginDashboard } from './features/login/login-dashboard/login-dashboard';
import { AdminDashboard } from './features/admin/admin-dashboard/admin-dashboard';
import { ReceptionDashboard } from './features/reception/reception-dashboard/reception-dashboard';
import { StaffDashboard } from './features/staff/staff-dashboard/staff-dashboard';
import { CustomerDashboard } from './features/customer/customer-dashboard/customer-dashboard';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginDashboard
  },

  {
    path: 'admin',
    component: AdminDashboard,
    canActivate : [authGuard,roleGuard],
    data : {
        roles : ['ADMIN'],
    }
  },

  {
    path: 'reception',
    component: ReceptionDashboard,
    canActivate : [authGuard,roleGuard],
    data : {
        roles : ['RECEPTION'],
    }
  },

  {
    path: 'staff',
    component: StaffDashboard,
    canActivate : [authGuard,roleGuard],
    data : {
        roles : ['STAFF'],
    },
  },

  {
    path: 'customer',
    component: CustomerDashboard,
    canActivate : [authGuard,roleGuard],
    data : {
        roles : ['CUSTOMER'],
    }
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];