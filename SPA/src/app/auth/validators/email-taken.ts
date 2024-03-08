import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmailTaken implements AsyncValidator {
  constructor(private auth: AuthService) {}

  validate = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;

    return this.auth.checkEmailExists(email).pipe(
      map(exists => (exists ? { EmailTaken: true } : null)),
    );
  }
}
