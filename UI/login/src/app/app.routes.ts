import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login.component/login.component';
import { authGuardGuard } from './features/auth/guards/auth.guard-guard';

export const routes: Routes = [
    {
        path: 'register', 
        loadComponent: () => import('./features/auth/pages/register.component/register.component')
        .then(m=> m.RegisterComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login.component/login.component')
        .then(m=> m.LoginComponent)
    },
    {
        path:'dashboard',
        canActivate : [authGuardGuard],
        loadComponent: ()=> import('./shared/component/dashboard.component/dashboard.component').then(m=>m.DashboardComponent)
    },
    {path: '', redirectTo: 'login', pathMatch: 'full'}
];
