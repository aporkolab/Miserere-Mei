import { HttpInterceptorFn } from '@angular/common/http';

/** Sends the HttpOnly session cookie with every API request. */
export const credentialsInterceptor: HttpInterceptorFn = (request, next) =>
  next(request.clone({ withCredentials: true }));
