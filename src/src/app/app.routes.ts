import { Routes } from '@angular/router';

import { LoginDashboard } from './features/login/login-dashboard/login-dashboard';
import { AdminDashboard } from './features/admin/admin-dashboard/admin-dashboard';
import { ReceptionDashboard } from './features/reception/reception-dashboard/reception-dashboard';
import { StaffDashboard } from './features/staff/staff-dashboard/staff-dashboard';

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
    component: AdminDashboard
  },

  {
    path: 'reception',
    component: ReceptionDashboard
  },

  {
    path: 'staff',
    component: StaffDashboard
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];