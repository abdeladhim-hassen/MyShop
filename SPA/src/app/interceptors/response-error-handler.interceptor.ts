import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServiceResponse } from '../DTOs/ServiceResponse';

@Injectable()
export class ResponseErrorHandlerInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<ServiceResponse<any>>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                // Log the error
                console.error('Error occurred while calling the backend API:', error);

                // Create the error instance with a factory function
                const response: ServiceResponse<any> = {
                    data: null,
                    success: false,
                    message: error.error.message || 'An unknown error occurred'
                };

                // Throw the error
                return throwError(() => response); // Return the ServiceResponse object
            })
        );
    }
}
