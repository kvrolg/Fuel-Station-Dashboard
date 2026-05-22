import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function errorHandler(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const snackBar = inject(MatSnackBar);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.error) {
        (console.log(req.url, 'From interceptor', error.status),
          snackBar.open('Error!', 'Dismiss', {
            duration: 3000,
            panelClass: ['snackbar-error'],
            horizontalPosition: 'end',
          }));
      }
      return next(req);
    }),
  );
}
