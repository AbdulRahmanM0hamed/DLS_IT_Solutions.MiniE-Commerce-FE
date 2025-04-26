import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const authReq = req.clone({
      setHeaders: {
          ...(token && { Authorization: `Bearer ${token}` }),
      'Accept-Language': 'ar'
      }
    });
    return next(authReq);
  }
  return next(req);
};
