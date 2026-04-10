import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { jwtDecode } from 'jwt-decode';

// export const authGuardGuard: CanActivateFn = () => {

//   const router = inject(Router);
//   const token = localStorage.getItem('token');

//   if (!token) {
//     router.navigate(['/login']);
//     return false;
//   }

//   try {
//     const decoded: any = jwtDecode(token);

//     const isExpired = decoded.exp * 1000 < Date.now();

//     if (isExpired) {
//       localStorage.removeItem('token');
//       router.navigate(['/login']);
//       return false;
//     }

//     return true;

//   } catch {
//     router.navigate(['/login']);
//     return false;
//   }
// };
